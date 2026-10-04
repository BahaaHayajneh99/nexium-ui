import { Component } from '@angular/core';
import { NxSparklineCard } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-sparkline-card-demo',
  imports: [NxSparklineCard, DemoSection],
  templateUrl: './ui-sparkline-card-demo.html',
  styleUrl: './ui-sparkline-card-demo.scss',
})
export class UiSparklineCardDemo {
  importCode = `import { NxSparklineCard } from 'nexium-ui';`;

  revenueTrend = [12, 18, 15, 22, 26, 24, 30, 34, 31, 38, 42, 48];
  signupsTrend = [40, 38, 35, 33, 30, 28, 25, 24, 22, 20, 18, 16];

  basicCode = `<nx-sparkline-card
    label="Revenue"
    value="$48,290"
    delta="+12.4%"
    direction="up"
    [data]="[12, 18, 15, 22, 26, 24, 30, 34, 31, 38, 42, 48]">
</nx-sparkline-card>`;

  basicTs = `// data is the trend array rendered as an inline sparkline next to the value; color (default var(--shell-primary)) sets the line's stroke.
revenueTrend = [12, 18, 15, 22, 26, 24, 30, 34, 31, 38, 42, 48];`;

  gridCode = `<nx-sparkline-card label="Revenue" value="$48,290" delta="+12.4%" direction="up" [data]="revenueTrend"></nx-sparkline-card>
<nx-sparkline-card label="Signups" [value]="1204" delta="-8.1%" direction="down" color="var(--shell-danger)" [data]="signupsTrend"></nx-sparkline-card>`;

  gridTs = `// direction ('up' | 'down' | 'neutral') colors the delta text; color overrides the sparkline's stroke color independently.
signupsTrend = [40, 38, 35, 33, 30, 28, 25, 24, 22, 20, 18, 16];`;
}
