/**
 * ── Callback AI — account deletion ───────────────────────────────────────
 *
 * A Vercel Serverless Function. Callback is otherwise an offline app with no
 * backend; this endpoint exists because two parts of deleting an account cannot
 * be done from inside an app, and must not be attempted there:
 *
 *   1. **Apple requires token revocation.** An app that offers Sign in with
 *      Apple must call Apple's REST API to revoke the user's tokens when the
 *      account is deleted (Guideline 5.1.1(v) plus Apple's own Sign in with
 *      Apple requirements). Doing that means signing a client secret with the
 *      team's private `.p8` key — a key that would be extractable from any
 *      shipped binary, so it lives here as an environment variable instead.
 *
 *   2. **The RevenueCat customer record has to go.** That needs the RevenueCat
 *      *secret* (`sk_`) key, which for the same reason may never ship in an app.
 *
 * ── The re-authentication step, and why it is not laziness ────────────────
 *
 * Apple's revoke endpoint wants a refresh token, and a refresh token can only be
 * obtained by exchanging an authorization code. Codes are single-use and expire
 * in about five minutes, so the code from the original sign-in is long dead by
 * the time somebody decides to delete their account.
 *
 * There are two ways out. Store every user's refresh token at sign-in — which
 * means running a database of long-lived Apple credentials for an app that
 * otherwise stores nothing about anyone. Or ask for a fresh authorization code
 * at the moment of deletion, use it once, and keep nothing. The app does the
 * second: it presents the Sign in with Apple sheet again as part of the delete
 * flow. One extra tap, and no credential store to be breached.
 *
 * ── Configuration ────────────────────────────────────────────────────────
 *
 * Set these in the Vercel project (Settings → Environment Variables):
 *
 *   APPLE_SIGNIN_KEY        Contents of the Sign in with Apple .p8 private key,
 *                           newlines and all. This is a **Sign in with Apple**
 *                           key from the developer portal (Keys → +, tick "Sign
 *                           in with Apple") — not the App Store Connect API key
 *                           and not the In-App Purchase key.
 *   APPLE_SIGNIN_KEY_ID     The 10-character Key ID of that key.
 *   APPLE_TEAM_ID           FLKHTX6898 (Nocte Ventures Ltd).
 *   APPLE_CLIENT_ID         com.nocteventures.callback
 *   REVENUECAT_SECRET_KEY   The Callback RevenueCat project's sk_ key.
 *
 * With none of them set the endpoint answers 503 `not_configured`, and the app
 * reports that the local sign-out succeeded but the server side did not — which
 * is honest, and better than a silent success.
 */

import { createSign } from 'node:crypto';

const APPLE_TOKEN = 'https://appleid.apple.com/auth/token';
const APPLE_REVOKE = 'https://appleid.apple.com/auth/revoke';
const RC_API = 'https://api.revenuecat.com/v1/subscribers';

const base64url = (input) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Apple's client secret is an ES256 JWT signed with the team's `.p8`, with the
 * team as issuer and Apple as audience. Six months is Apple's maximum lifetime;
 * this one lives for five minutes because it is used once, immediately.
 */
function appleClientSecret({ key, keyId, teamId, clientId }) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'ES256', kid: keyId, typ: 'JWT' }));
  const payload = base64url(
    JSON.stringify({
      iss: teamId,
      iat: now,
      exp: now + 300,
      aud: 'https://appleid.apple.com',
      sub: clientId,
    }),
  );
  const signer = createSign('SHA256');
  signer.update(`${header}.${payload}`);
  // Node signs ECDSA as DER by default; JWS wants the raw r‖s pair. Asking for
  // 'ieee-p1363' returns exactly that, which saves unpacking the DER envelope by
  // hand — and getting that unpacking wrong produces a signature Apple rejects
  // with nothing more useful than `invalid_client`.
  const raw = signer.sign({ key, dsaEncoding: 'ieee-p1363' });
  return `${header}.${payload}.${base64url(raw)}`;
}

/**
 * Exchange the fresh authorization code, prove who it belongs to, then revoke.
 *
 * Returns Apple's `sub` for the user, taken from the `id_token` that comes back
 * with the exchange. That value is the ONLY thing in this request that proves
 * ownership: the caller-supplied `appUserId` is just a string and cannot be
 * trusted. The caller must compare the two before deleting anything.
 */
async function revokeApple(authorizationCode, config) {
  const clientSecret = appleClientSecret(config);

  const tokenResponse = await fetch(APPLE_TOKEN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      grant_type: 'authorization_code',
    }),
  });
  const token = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok) {
    throw new Error(`Apple refused the authorization code (${token.error ?? tokenResponse.status})`);
  }

  // Revoking the refresh token invalidates the whole grant. Apple accepts an
  // access token here too, but the refresh token is the one that outlives the
  // session, so it is the one that matters.
  const target = token.refresh_token ?? token.access_token;
  if (!target) throw new Error('Apple returned no token to revoke');

  const revokeResponse = await fetch(APPLE_REVOKE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: clientSecret,
      token: target,
      token_type_hint: token.refresh_token ? 'refresh_token' : 'access_token',
    }),
  });
  if (!revokeResponse.ok) {
    const detail = await revokeResponse.text().catch(() => '');
    throw new Error(`Apple refused the revocation (${revokeResponse.status} ${detail.slice(0, 120)})`);
  }

  // The subject from Apple's own id_token. Read without signature verification
  // only because it arrived directly from Apple's token endpoint over TLS in the
  // call above — there is no untrusted hop in between.
  const sub = subjectFromIdToken(token.id_token);
  if (!sub) throw new Error('Apple returned no id_token subject to verify ownership against');
  return sub;
}

/** The `sub` claim from a JWT, base64url-decoded. */
function subjectFromIdToken(idToken) {
  if (typeof idToken !== 'string') return null;
  const parts = idToken.split('.');
  if (parts.length < 2) return null;
  let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  try {
    return JSON.parse(Buffer.from(b64, 'base64').toString('utf8')).sub ?? null;
  } catch {
    return null;
  }
}

/**
 * Delete the RevenueCat customer.
 *
 * A 404 counts as success: somebody who never opened the paywall has no
 * customer record, and "there was nothing to delete" is the outcome the caller
 * wanted. Purchases themselves are Apple's records and are not ours to remove —
 * an active subscription keeps billing until it is cancelled with Apple, which
 * is why the app says so on the confirmation sheet.
 */
async function deleteRevenueCatCustomer(appUserId, secretKey) {
  const response = await fetch(`${RC_API}/${encodeURIComponent(appUserId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${secretKey}` },
  });
  if (!response.ok && response.status !== 404) {
    const detail = await response.text().catch(() => '');
    throw new Error(`RevenueCat refused the deletion (${response.status} ${detail.slice(0, 120)})`);
  }
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.setHeader('Allow', 'POST, OPTIONS');
    return response.status(204).end();
  }
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST, OPTIONS');
    return response.status(405).json({ error: 'method_not_allowed' });
  }

  const body = typeof request.body === 'string' ? safeParse(request.body) : request.body ?? {};
  const provider = typeof body.provider === 'string' ? body.provider : '';
  const appUserId = typeof body.appUserId === 'string' ? body.appUserId.slice(0, 256) : '';
  const authorizationCode =
    typeof body.authorizationCode === 'string' ? body.authorizationCode.slice(0, 2048) : '';

  if (!appUserId || !['apple', 'google'].includes(provider)) {
    return response.status(400).json({ error: 'bad_request' });
  }

  // ⚠️ This prefix test proves NOTHING about ownership — it only checks that the
  // string is shaped the way the app writes it. An earlier version of this file
  // treated it as an authorisation check, which meant a request of
  // {"provider":"google","appUserId":"google:<victim>"} deleted a stranger's
  // subscription record with no credential at all. Ownership is established
  // below, by Apple, and nothing destructive happens before it is.
  if (!appUserId.startsWith(`${provider}:`)) {
    return response.status(400).json({ error: 'identifier_mismatch' });
  }

  // Google sign-in is not shipped in the app yet, and there is no verification
  // path for it here: proving a Google identity would need an id_token validated
  // against Google's JWKS. Until that exists this branch has no legitimate
  // traffic, so it is refused outright rather than left as an unauthenticated
  // route to a destructive operation.
  if (provider === 'google') {
    return response.status(501).json({
      error: 'provider_unsupported',
      message:
        'Google account deletion is not available yet. Please contact hello@nocteventures.com and we will remove the account.',
    });
  }

  const rcKey = process.env.REVENUECAT_SECRET_KEY;
  const appleConfig = {
    key: process.env.APPLE_SIGNIN_KEY,
    keyId: process.env.APPLE_SIGNIN_KEY_ID,
    teamId: process.env.APPLE_TEAM_ID,
    clientId: process.env.APPLE_CLIENT_ID || 'com.nocteventures.callback',
  };
  const appleReady = Boolean(appleConfig.key && appleConfig.keyId && appleConfig.teamId);

  if (!appleReady) {
    return response.status(503).json({
      error: 'not_configured',
      message:
        'Account deletion is not configured on the server yet. You are signed out on this device; please contact hello@nocteventures.com so we can finish removing the account.',
    });
  }
  if (!authorizationCode) {
    return response.status(400).json({
      error: 'authorization_required',
      message: 'A fresh Sign in with Apple authorization code is required to delete an account.',
    });
  }

  const done = [];
  const failed = [];

  // Step 1: prove ownership. Apple exchanges the single-use code and tells us
  // which subject it belongs to. If that disagrees with the identifier the
  // caller claimed, this is somebody trying to delete an account that is not
  // theirs — stop, and delete nothing.
  let verifiedSubject;
  try {
    verifiedSubject = await revokeApple(authorizationCode, appleConfig);
    done.push('apple_token_revoked');
  } catch (error) {
    return response.status(401).json({ error: 'verification_failed', message: error.message });
  }

  if (appUserId !== `apple:${verifiedSubject}`) {
    // The Apple credential is valid but belongs to a different person. The token
    // has already been revoked, which is correct — it was theirs — but nothing
    // else may happen.
    return response.status(403).json({
      error: 'identifier_mismatch',
      message: 'That sign-in does not match the account being deleted.',
    });
  }

  // Step 2: only now, with ownership proven, touch the subscription record.
  if (rcKey) {
    try {
      await deleteRevenueCatCustomer(appUserId, rcKey);
      done.push('subscription_record_deleted');
    } catch (error) {
      failed.push(error.message);
    }
  }

  if (failed.length) {
    // Report a partial result honestly. The app has already wiped the device
    // side, so the person is signed out either way — what they must not be told
    // is that everything is gone when some of it is not.
    return response.status(502).json({
      error: 'partially_deleted',
      done,
      message: `Some of the deletion did not complete: ${failed.join('; ')}. Please contact hello@nocteventures.com.`,
    });
  }

  return response.status(200).json({ ok: true, done });
}

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
};
