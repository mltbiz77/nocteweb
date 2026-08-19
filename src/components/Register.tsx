import { Label, StatusMark } from './site';
import { APPS, productPath, type AppData } from '@/data/apps';

/**
 * The register of holdings.
 *
 * A parent company's front page should show what it owns, so the products
 * are a ruled table rather than a grid of cards: index, mark, name, what it
 * is, platform, status. It scans like a balance sheet, which is the point.
 */

const Row = ({ app, index }: { app: AppData; index: number }) => (
  <li>
    <a
      href={productPath(app)}
      className="group grid grid-cols-[2.25rem_1fr] items-baseline gap-x-4 gap-y-2 border-b border-rule py-6 transition-colors hover:bg-paper-sunk/70 lg:grid-cols-[3.5rem_minmax(0,15rem)_minmax(0,1fr)_9.5rem_7.5rem] lg:gap-x-8 lg:py-5"
    >
      <Label className="tabular self-center">{String(index + 1).padStart(2, '0')}</Label>

      <div className="flex items-center gap-3 self-center">
        <img
          src={app.icon}
          alt=""
          aria-hidden="true"
          className="h-8 w-8 shrink-0 rounded-[22%] border border-rule-soft"
          draggable={false}
        />
        <span className="font-sans text-[1.0625rem] font-medium tracking-[-0.01em] text-ink">
          {app.name}
        </span>
      </div>

      <p className="col-start-2 font-text text-[0.95rem] leading-[1.55] text-ink-muted lg:col-start-3 lg:self-center">
        {app.short}
      </p>

      <span className="col-start-2 font-mono text-[11px] tracking-[0.08em] text-ink-faint lg:col-start-4 lg:self-center">
        {app.platforms.join(' · ')}
      </span>

      <span className="col-start-2 flex items-center justify-between gap-4 lg:col-start-5 lg:self-center">
        <StatusMark status={app.status} accent={app.accent} />
        <span
          aria-hidden="true"
          className="font-mono text-ink-faint transition-transform group-hover:translate-x-1 group-hover:text-ink"
        >
          &rarr;
        </span>
      </span>
    </a>
  </li>
);

export const Register = ({ apps = APPS }: { apps?: AppData[] }) => (
  <div>
    {/* Column headers only make sense once the row is actually a row. */}
    <div className="hidden border-b border-rule pb-2.5 lg:grid lg:grid-cols-[3.5rem_minmax(0,15rem)_minmax(0,1fr)_9.5rem_7.5rem] lg:gap-x-8">
      <Label>No.</Label>
      <Label>Product</Label>
      <Label>What it is</Label>
      <Label>Platform</Label>
      <Label>Status</Label>
    </div>

    <ul>
      {apps.map((app, index) => (
        <Row key={app.slug} app={app} index={index} />
      ))}

      {/* The portfolio is deliberately unfinished; say so in the register
          itself rather than in a dashed placeholder card. */}
      <li>
        <div className="grid grid-cols-[2.25rem_1fr] gap-x-4 border-b border-rule py-6 lg:grid-cols-[3.5rem_minmax(0,15rem)_minmax(0,1fr)] lg:gap-x-8">
          <Label className="tabular self-center text-ink-faint/60">
            {String(apps.length + 1).padStart(2, '0')}
          </Label>
          <span className="self-center font-sans text-[1.0625rem] font-medium tracking-[-0.01em] text-ink-faint">
            Open
          </span>
          <p className="col-start-2 font-text text-[0.95rem] leading-[1.55] text-ink-muted lg:col-start-3 lg:self-center">
            More in build, and we buy products worth owning.{' '}
            <a href="/contact/" className="link text-ink">
              Tell us about yours
            </a>
            .
          </p>
        </div>
      </li>
    </ul>
  </div>
);
