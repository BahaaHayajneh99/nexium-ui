import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-design-system-overview-demo',
  templateUrl: './design-system-overview-demo.html',
  styleUrl: './design-system-overview-demo.scss',
})
export class DesignSystemOverviewDemo {
  public commonService = inject(CommonService);
}
