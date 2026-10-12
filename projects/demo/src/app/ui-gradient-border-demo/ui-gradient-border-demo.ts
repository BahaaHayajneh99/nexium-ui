import { Component } from '@angular/core';
import { NxGradientBorder } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-gradient-border-demo',
  imports: [NxGradientBorder, DemoSection],
  templateUrl: './ui-gradient-border-demo.html',
  styleUrl: './ui-gradient-border-demo.scss',
})
export class UiGradientBorderDemo {
  importCode = `import { NxGradientBorder } from 'nexium-ui';`;

  staticCode = `<nx-gradient-border [animated]="false" [borderWidth]="2" [borderRadius]="16">
    <div class="card">
        <h4>Static ring</h4>
        <p>animated="false" keeps the gradient angle fixed.</p>
    </div>
</nx-gradient-border>`;

  animatedCode = `<nx-gradient-border [animated]="true" [speed]="4" [borderWidth]="2" [borderRadius]="16">
    <div class="card">
        <h4>Animated ring</h4>
        <p>The gradient slowly rotates around the border.</p>
    </div>
</nx-gradient-border>`;

  buttonCode = `<nx-gradient-border
    [colors]="['#f97316', '#ec4899', '#f97316']"
    [borderWidth]="3"
    [borderRadius]="999"
    [speed]="2.5">
    <button class="pill-button">Upgrade to Pro</button>
</nx-gradient-border>`;
}
