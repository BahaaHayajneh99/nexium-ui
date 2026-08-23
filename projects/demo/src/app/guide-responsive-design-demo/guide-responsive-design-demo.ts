import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-guide-responsive-design-demo',
  imports: [DemoSection],
  templateUrl: './guide-responsive-design-demo.html',
})
export class GuideResponsiveDesignDemo {
  public commonService = inject(CommonService);
  mediaQueryCode = `/* mobile-first: base styles target the smallest screen,
   then override upward at each breakpoint */
.card {
  padding: 8px;
}

@media (min-width: 768px) {
  .card {
    padding: 24px;
  }
}`;
}
