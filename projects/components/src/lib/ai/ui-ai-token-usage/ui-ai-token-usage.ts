import { Component, Input, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export interface NxTokenUsageDay {
  date: string;
  tokens: number;
  costUsd?: number;
}

export interface NxTokenUsageByModel {
  model: string;
  tokens: number;
}

interface NxTokenUsageByModelShare extends NxTokenUsageByModel {
  percent: number;
}

/**
 * A usage/budget DASHBOARD widget showing HISTORICAL/aggregate token spend over time - distinct
 * from `NxTokenCounter`, which estimates tokens for the CURRENT input text only. Shows a simple
 * inline-SVG daily usage bar row, a usage-vs-limit progress bar (same warning/danger convention as
 * `NxTokenCounter`'s bar), a per-model breakdown with each model's share of total tokens, and a
 * total estimated cost (summed from `dailyUsage[].costUsd`, when provided).
 */
@Component({
  selector: 'nx-ai-token-usage',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './ui-ai-token-usage.html',
  styleUrl: './ui-ai-token-usage.scss',
})
export class NxAiTokenUsage {
  // All three @Inputs below are backed by signals (not plain fields) so the computed()s that
  // depend on them actually re-run when the parent rebinds new data, instead of permanently
  // caching whatever they first saw on initial render.
  private readonly dailyUsageSignal = signal<NxTokenUsageDay[]>([]);
  @Input()
  get dailyUsage(): NxTokenUsageDay[] {
    return this.dailyUsageSignal();
  }
  set dailyUsage(value: NxTokenUsageDay[]) {
    this.dailyUsageSignal.set(value ?? []);
  }

  private readonly byModelSignal = signal<NxTokenUsageByModel[]>([]);
  @Input()
  get byModel(): NxTokenUsageByModel[] {
    return this.byModelSignal();
  }
  set byModel(value: NxTokenUsageByModel[]) {
    this.byModelSignal.set(value ?? []);
  }

  private readonly monthlyLimitSignal = signal<number | undefined>(undefined);
  @Input()
  get monthlyLimit(): number | undefined {
    return this.monthlyLimitSignal();
  }
  set monthlyLimit(value: number | undefined) {
    this.monthlyLimitSignal.set(value);
  }

  readonly totalTokens = computed(() => this.dailyUsageSignal().reduce((sum, day) => sum + day.tokens, 0));

  readonly hasCostData = computed(() => this.dailyUsageSignal().some((day) => day.costUsd != null));

  readonly totalCostUsd = computed(() =>
    this.dailyUsageSignal().reduce((sum, day) => sum + (day.costUsd ?? 0), 0),
  );

  readonly maxDailyTokens = computed(() => Math.max(1, ...this.dailyUsageSignal().map((day) => day.tokens)));

  readonly percentOfLimit = computed(() => {
    const limit = this.monthlyLimitSignal();
    if (!limit || limit <= 0) {
      return 0;
    }
    return Math.min(100, Math.max(0, (this.totalTokens() / limit) * 100));
  });

  readonly limitState = computed<'normal' | 'warning' | 'danger'>(() => {
    const limit = this.monthlyLimitSignal();
    if (!limit || limit <= 0) {
      return 'normal';
    }
    const ratio = this.totalTokens() / limit;
    if (ratio >= 1) {
      return 'danger';
    }
    if (ratio >= 0.8) {
      return 'warning';
    }
    return 'normal';
  });

  readonly byModelShare = computed<NxTokenUsageByModelShare[]>(() => {
    const total = this.byModelSignal().reduce((sum, m) => sum + m.tokens, 0);
    return [...this.byModelSignal()]
      .sort((a, b) => b.tokens - a.tokens)
      .map((m) => ({ ...m, percent: total > 0 ? (m.tokens / total) * 100 : 0 }));
  });

  barHeightPercent(tokens: number): number {
    return Math.max(2, (tokens / this.maxDailyTokens()) * 100);
  }

  formatCost(value: number): string {
    return `$${value.toFixed(2)}`;
  }

  formatTokens(value: number): string {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`;
  }
}
