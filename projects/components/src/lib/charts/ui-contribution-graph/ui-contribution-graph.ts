import { Component, Input, computed, numberAttribute, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxContributionDay {
  /** ISO date string, e.g. "2026-03-14". */
  date: string;
  count: number;
}

export interface NxContributionCell {
  date: string;
  count: number;
  /** 0 = no activity, 1-4 = increasing intensity. -1 marks a padding cell (outside the data range,
   * e.g. a future day in the final partial week) that should render empty and non-interactive. */
  level: number;
  dayOfWeek: number;
}

export interface NxContributionWeek {
  cells: NxContributionCell[];
  /** Month label to render above this week column, or null for every other week in that month. */
  month: string | null;
}

const DEFAULT_COLOR_SCALE = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const DAY_LABELS: { row: number; text: string }[] = [
  { row: 1, text: 'Mon' },
  { row: 3, text: 'Wed' },
  { row: 5, text: 'Fri' },
];

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Buckets a count into one of 5 intensity levels, relative to the busiest day in the data set. */
function levelFor(count: number, maxCount: number): number {
  if (count <= 0) return 0;
  const ratio = count / maxCount;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

/**
 * A GitHub-style activity heatmap calendar: one small square per day, grouped into week columns,
 * colored by a 5-level intensity bucket derived from `count`. Hovering a square shows the exact
 * date and count via a native tooltip.
 */
@Component({
  selector: 'nx-contribution-graph',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-contribution-graph.html',
  styleUrl: './ui-contribution-graph.scss',
})
export class NxContributionGraph {
  protected readonly licensed = nxProLicenseGranted();

  readonly dayLabels = DAY_LABELS;

  // Backed by signals (not plain fields) so the `computed()`s below - which read data/weeks/
  // colorScale - actually re-run when the parent rebinds new values, instead of permanently
  // caching whatever they first saw on initial render.
  private readonly dataSignal = signal<NxContributionDay[]>([]);
  @Input()
  get data(): NxContributionDay[] {
    return this.dataSignal();
  }
  set data(value: NxContributionDay[]) {
    this.dataSignal.set(value ?? []);
  }

  private readonly weeksSignal = signal(53);
  @Input({ transform: numberAttribute })
  get weeks(): number {
    return this.weeksSignal();
  }
  set weeks(value: number) {
    this.weeksSignal.set(value > 0 ? value : 53);
  }

  private readonly colorScaleSignal = signal<string[]>(DEFAULT_COLOR_SCALE);
  @Input()
  get colorScale(): string[] {
    return this.colorScaleSignal();
  }
  set colorScale(value: string[]) {
    this.colorScaleSignal.set(value?.length === 5 ? value : DEFAULT_COLOR_SCALE);
  }

  readonly gridTemplateColumns = computed(
    () => `repeat(${this.weeksSignal()}, var(--nx-contribution-cell-size, 11px))`,
  );

  readonly weeksGrid = computed<NxContributionWeek[]>(() => {
    const data = this.dataSignal();
    const totalWeeks = this.weeksSignal();
    const countByDate = new Map(data.map((d) => [d.date, d.count]));

    const referenceIso = data.length
      ? data.reduce((latest, d) => (d.date > latest ? d.date : latest), data[0].date)
      : toIsoDate(new Date());
    const reference = startOfDay(new Date(`${referenceIso}T00:00:00`));

    // Align the final column to end on a Saturday so every column is a full Sun->Sat week.
    const endDate = addDays(reference, 6 - reference.getDay());
    const startDate = addDays(endDate, -(totalWeeks * 7 - 1));

    const maxCount = Math.max(1, ...data.map((d) => d.count));

    const weeks: NxContributionWeek[] = [];
    let lastLabeledMonth = -1;

    for (let w = 0; w < totalWeeks; w++) {
      const cells: NxContributionCell[] = [];
      let monthLabel: string | null = null;

      for (let d = 0; d < 7; d++) {
        const date = addDays(startDate, w * 7 + d);
        const iso = toIsoDate(date);
        const count = countByDate.get(iso) ?? 0;
        const isFuture = date.getTime() > reference.getTime();

        cells.push({
          date: iso,
          count,
          level: isFuture ? -1 : levelFor(count, maxCount),
          dayOfWeek: date.getDay(),
        });

        // Label the week that contains the 1st-7th of a (not-yet-labeled) month, same heuristic
        // GitHub's own graph uses so the label lines up near the start of that month's column.
        if (date.getDate() <= 7 && date.getMonth() !== lastLabeledMonth) {
          lastLabeledMonth = date.getMonth();
          monthLabel = MONTH_LABELS[date.getMonth()];
        }
      }

      weeks.push({ cells, month: monthLabel });
    }

    return weeks;
  });

  readonly allCells = computed(() => this.weeksGrid().flatMap((week) => week.cells));

  colorForLevel(level: number): string {
    if (level <= 0) {
      return this.colorScaleSignal()[0];
    }
    return this.colorScaleSignal()[level];
  }

  tooltipFor(cell: NxContributionCell): string | null {
    if (cell.level < 0) {
      return null;
    }
    const noun = cell.count === 1 ? 'contribution' : 'contributions';
    return `${cell.date}: ${cell.count} ${noun}`;
  }
}
