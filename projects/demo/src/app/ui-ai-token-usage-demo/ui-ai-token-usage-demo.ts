import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAiTokenUsage, NxTokenUsageDay, NxTokenUsageByModel } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

const COST_PER_1K_TOKENS = 0.002;

function generateDailyUsage(days: number): NxTokenUsageDay[] {
  const result: NxTokenUsageDay[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Realistic-looking variation: a weekday/weekend dip plus some day-to-day noise, rather
    // than a flat or purely random line.
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const base = isWeekend ? 18000 : 42000;
    const noise = Math.round((Math.sin(i * 1.3) + 1) * 8000 + Math.random() * 6000);
    const tokens = Math.max(500, base + noise);

    result.push({
      date: date.toISOString().slice(0, 10),
      tokens,
      costUsd: Math.round((tokens / 1000) * COST_PER_1K_TOKENS * 100) / 100,
    });
  }

  return result;
}

const BY_MODEL: NxTokenUsageByModel[] = [
  { model: 'Nexium Pro', tokens: 612_000 },
  { model: 'Nexium Fast', tokens: 398_000 },
  { model: 'Nexium Vision', tokens: 94_000 },
  { model: 'Nexium Mini', tokens: 41_000 },
];

@Component({
  selector: 'app-ui-ai-token-usage-demo',
  imports: [NxAiTokenUsage, DemoSection],
  templateUrl: './ui-ai-token-usage-demo.html',
  styleUrl: './ui-ai-token-usage-demo.scss',
})
export class UiAiTokenUsageDemo {
  importCode = `import { NxAiTokenUsage } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  dailyUsage = generateDailyUsage(30);
  byModel = BY_MODEL;
  monthlyLimit = 1_200_000;

  basicCode = `<nx-ai-token-usage
    [dailyUsage]="dailyUsage"
    [byModel]="byModel"
    [monthlyLimit]="monthlyLimit">
</nx-ai-token-usage>`;

  basicTs = `// dailyUsage holds one entry per day over the billing period.
dailyUsage: NxTokenUsageDay[] = [
  { date: '2026-09-05', tokens: 42350, costUsd: 0.08 },
  { date: '2026-09-06', tokens: 18920, costUsd: 0.04 },
  // ...
];

byModel: NxTokenUsageByModel[] = [
  { model: 'Nexium Pro', tokens: 612000 },
  { model: 'Nexium Fast', tokens: 398000 },
  { model: 'Nexium Vision', tokens: 94000 },
  { model: 'Nexium Mini', tokens: 41000 },
];

monthlyLimit = 1200000; // tokens`;

  noLimitCode = `<nx-ai-token-usage [dailyUsage]="dailyUsage" [byModel]="byModel"></nx-ai-token-usage>`;
  noLimitTs = `// Omitting monthlyLimit hides the usage-vs-limit progress bar entirely - useful for
// an unmetered/internal dashboard that only needs to show historical totals.`;
}
