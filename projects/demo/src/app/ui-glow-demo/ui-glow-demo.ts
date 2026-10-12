import { Component } from '@angular/core';
import { NxGlow } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-glow-demo',
  imports: [NxGlow, DemoSection],
  templateUrl: './ui-glow-demo.html',
  styleUrl: './ui-glow-demo.scss',
})
export class UiGlowDemo {
  importCode = `import { NxGlow } from 'nexium-ui';`;

  pulseCode = `<nx-glow color="#7c3aed" intensity="medium" [pulse]="false">
    <button class="cta-button">Get Started</button>
</nx-glow>

<nx-glow color="#7c3aed" intensity="medium" [pulse]="true">
    <button class="cta-button">Get Started</button>
</nx-glow>`;

  positionCode = `<nx-glow color="#06b6d4" intensity="high" position="behind">
    <div class="hero-card">Behind</div>
</nx-glow>

<nx-glow color="#06b6d4" intensity="high" position="edge">
    <div class="hero-card">Edge</div>
</nx-glow>`;

  intensityCode = `<nx-glow color="#ec4899" intensity="low"><div class="chip">Low</div></nx-glow>
<nx-glow color="#ec4899" intensity="medium"><div class="chip">Medium</div></nx-glow>
<nx-glow color="#ec4899" intensity="high"><div class="chip">High</div></nx-glow>`;
}
