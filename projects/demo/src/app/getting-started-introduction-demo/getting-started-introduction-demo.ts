import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-getting-started-introduction-demo',
  templateUrl: './getting-started-introduction-demo.html',
  styleUrl: './getting-started-introduction-demo.scss',
})
export class GettingStartedIntroductionDemo {
  public commonService = inject(CommonService);
}
