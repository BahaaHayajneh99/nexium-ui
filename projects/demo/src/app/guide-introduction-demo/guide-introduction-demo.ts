import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-introduction-demo',
  templateUrl: './guide-introduction-demo.html',
})
export class GuideIntroductionDemo {
  public commonService = inject(CommonService);
  layoutCode = `projects/
  components/   # most nx-* components (data-display, forms, feedback, ...)
  core/         # shared low-level utilities
  demo/         # this showcase application`;
}
