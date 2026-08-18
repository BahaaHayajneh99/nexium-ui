import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-responsive-design-demo',
  templateUrl: './guide-responsive-design-demo.html',
})
export class GuideResponsiveDesignDemo {
  public commonService = inject(CommonService);
  mediaQueryCode = `// mobile-first: base styles target the smallest screen,
// then override upward at each breakpoint
.card {
  padding: $spacing-sm;
}

@media (min-width: 768px) {
  .card {
    padding: $spacing-lg;
  }
}`;
}
