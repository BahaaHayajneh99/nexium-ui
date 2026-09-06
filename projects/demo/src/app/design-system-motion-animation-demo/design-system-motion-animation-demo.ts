import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-design-system-motion-animation-demo',
  imports: [DemoSection],
  templateUrl: './design-system-motion-animation-demo.html',
  styleUrl: './design-system-motion-animation-demo.scss',
})
export class DesignSystemMotionAnimationDemo {
  public commonService = inject(CommonService);

  fadeInCode = `@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fadeIn 200ms ease-out;
}`;

  reducedMotionCode = `@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`;

  timings = [
    { name: 'Fast', duration: '150ms', use: 'Hover states, small transitions' },
    { name: 'Base', duration: '200ms', use: 'Standard animations, interactions' },
    { name: 'Slow', duration: '300ms', use: 'Complex animations, large elements' },
    { name: 'Extra Slow', duration: '400ms', use: 'Modals, full-page transitions' },
  ];

  easings = [
    { name: 'ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)', use: 'Elements leaving view' },
    { name: 'ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)', use: 'Elements entering view' },
    { name: 'ease-in-out', value: 'cubic-bezier(0.4, 0, 0.2, 1)', use: 'Bi-directional transitions' },
    { name: 'linear', value: 'linear', use: 'Continuous rotations, progress bars' },
  ];

  principles = [
    'Purposeful: Animation should serve a purpose, not just be decorative',
    'Responsive: Animation speed should adapt to user preferences (prefers-reduced-motion)',
    'Consistent: Use the same timing and easing across similar interactions',
    'Performant: Use transforms and opacity for 60fps animations',
    'Subtle: Avoid distracting animations that interfere with content',
  ];
}
