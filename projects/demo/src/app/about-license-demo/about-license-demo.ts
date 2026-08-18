import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-about-license-demo',
  templateUrl: './about-license-demo.html',
})
export class AboutLicenseDemo {
  public commonService = inject(CommonService);
  readonly year = new Date().getFullYear();
}
