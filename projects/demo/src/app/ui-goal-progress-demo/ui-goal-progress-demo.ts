import { Component } from '@angular/core';
import { NxGoalProgress } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-goal-progress-demo',
  imports: [NxGoalProgress, DemoSection],
  templateUrl: './ui-goal-progress-demo.html',
  styleUrl: './ui-goal-progress-demo.scss',
})
export class UiGoalProgressDemo {
  importCode = `import { NxGoalProgress } from 'nexium-ui';`;

  barCode = `<nx-goal-progress label="Monthly Signups" [value]="720" [goal]="1000"></nx-goal-progress>`;

  barTs = `// variant defaults to 'bar' - a linear track with a label/percent header above it.`;

  ringCode = `<nx-goal-progress label="Storage" [value]="68" [goal]="100" variant="ring"></nx-goal-progress>`;

  ringTs = `// variant="ring" renders the same percent as an SVG circular gauge, with the percent and label centered inside it.`;

  gridCode = `<nx-goal-progress label="Onboarding" [value]="7" [goal]="10" variant="ring"></nx-goal-progress>
<nx-goal-progress label="Q3 Revenue" [value]="82000" [goal]="100000" variant="ring"></nx-goal-progress>
<nx-goal-progress label="Tickets Closed" [value]="45" [goal]="60" variant="ring"></nx-goal-progress>`;

  gridTs = `// value/goal are just numbers - percent is clamped between 0 and 100 regardless of scale.`;
}
