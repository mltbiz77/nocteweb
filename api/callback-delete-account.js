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

/** Exchange the fresh authorization code for a refresh token, then revoke it. */
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
  // The identifier the app sends is namespaced by provider (see
  // IdentityService.Account.appUserID). If the two disagree, something is wrong
  // enough that deleting whatever the string happens to point at is the wrong
  // move — a mismatch could otherwise delete a different customer's record.
  if (!appUserId.startsWith(`${provider}:`)) {
    return response.status(400).json({ error: 'identifier_mismatch' });
  }

  const rcKey = process.env.REVENUECAT_SECRET_KEY;
  const appleConfig = {
    key: process.env.APPLE_SIGNIN_KEY,
    keyId: process.env.APPLE_SIGNIN_KEY_ID,
    teamId: process.env.APPLE_TEAM_ID,
    clientId: process.env.APPLE_CLIENT_ID || 'com.nocteventures.callback',
  };
  const appleReady = Boolean(appleConfig.key && appleConfig.keyId && appleConfig.teamId);

  if (!rcKey && !appleReady) {
    return response.status(503).json({
      error: 'not_configured',
      message:
        'Account deletion is not configured on the server yet. You are signed out on this device; please contact hello@nocteventures.com so we can finish removing the account.',
    });
  }

  const done = [];
  const failed = [];

  if (provider === 'apple' && appleReady) {
    if (!authorizationCode) {
      // The app is expected to re-present the Sign in with Apple sheet and send
      // the fresh code. Without one there is nothing Apple will let us revoke.
      failed.push('Apple revocation needs a fresh sign-in; none was provided.');
    } else {
      try {
        await revokeApple(authorizationCode, appleConfig);
        done.push('apple_token_revoked');
      } catch (error) {
        failed.push(error.message);
      }
    }
  }

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
