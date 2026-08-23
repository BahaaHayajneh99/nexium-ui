import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-introduction-demo',
  templateUrl: './guide-introduction-demo.html',
})
export class GuideIntroductionDemo {
  public commonService = inject(CommonService);
}
