import { Component } from '@angular/core';
import { UiCard, UiCardContent, UiStatistic } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-statistics-demo',
  imports: [UiCard, UiCardContent, UiStatistic, DemoSection],
  templateUrl: './blocks-statistics-demo.html',
})
export class BlocksStatisticsDemo {
  stats = [
    { label: 'Total Downloads', value: '1.2M', delta: '+18.2%' },
    { label: 'Weekly Active Repos', value: '9,430', delta: '+6.7%' },
    { label: 'Avg. Bundle Size', value: '42kb', delta: '-3.1%' },
    { label: 'GitHub Stars', value: '5,912', delta: '+240' },
    { label: 'Open Issues', value: '37', delta: '-5', upIsGood: false },
    { label: 'Contributors', value: '86', delta: '+9' },
  ];

  code = `<div class="stats-grid">
    @for (stat of stats; track stat.label) {
        <nx-card variant="outlined">
            <nx-card-content>
                <nx-statistic
                    [label]="stat.label"
                    [value]="stat.value"
                    [delta]="stat.delta"
                    [upIsGood]="stat.upIsGood ?? true">
                </nx-statistic>
            </nx-card-content>
        </nx-card>
    }
</div>`;

  tsCode = `stats = [
  { label: 'Total Downloads', value: '1.2M', delta: '+18.2%' },
  { label: 'Weekly Active Repos', value: '9,430', delta: '+6.7%' },
  { label: 'Avg. Bundle Size', value: '42kb', delta: '-3.1%' },
  { label: 'GitHub Stars', value: '5,912', delta: '+240' },
  { label: 'Open Issues', value: '37', delta: '-5', upIsGood: false },
  { label: 'Contributors', value: '86', delta: '+9' },
];`;
}
