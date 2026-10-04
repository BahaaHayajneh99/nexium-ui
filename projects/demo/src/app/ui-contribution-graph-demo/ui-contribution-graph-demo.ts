import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxContributionGraph, NxContributionDay } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

function generateYear(maxPerDay: number, activeChance: number): NxContributionDay[] {
  const days: NxContributionDay[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const isActive = Math.random() < activeChance;
    const count = isActive ? Math.floor(Math.random() * maxPerDay) + 1 : 0;

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    days.push({ date: `${y}-${m}-${d}`, count });
  }

  return days;
}

@Component({
  selector: 'app-ui-contribution-graph-demo',
  imports: [NxContributionGraph, DemoSection],
  templateUrl: './ui-contribution-graph-demo.html',
  styleUrl: './ui-contribution-graph-demo.scss',
})
export class UiContributionGraphDemo {
  importCode = `import { NxContributionGraph, NxContributionDay } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // ~365 days of synthetic activity, randomized with plenty of zero-activity days, so the graph
  // renders a full, realistic-looking year rather than a uniform grid.
  activityData: NxContributionDay[] = generateYear(12, 0.65);

  basicCode = `<nx-contribution-graph [data]="activityData"></nx-contribution-graph>`;

  basicTs = `activityData: NxContributionDay[] = [
  { date: '2025-10-04', count: 0 },
  { date: '2025-10-05', count: 7 },
  { date: '2025-10-06', count: 3 },
  // ...one entry per day, generated here with a random walk
];`;

  // A shorter window with a custom (blue) color scale, proving both weeks and colorScale are
  // freely overridable.
  recentData: NxContributionDay[] = generateYear(8, 0.5).slice(-7 * 12);
  customColorScale = ['#ecf3fb', '#a9d0f5', '#5ea8ea', '#2f7fd1', '#1c5aa6'];

  customCode = `<nx-contribution-graph
    [data]="recentData"
    [weeks]="12"
    [colorScale]="customColorScale">
</nx-contribution-graph>`;

  customTs = `recentData: NxContributionDay[] = /* last 12 weeks of activity */;
customColorScale = ['#ecf3fb', '#a9d0f5', '#5ea8ea', '#2f7fd1', '#1c5aa6'];`;
}
