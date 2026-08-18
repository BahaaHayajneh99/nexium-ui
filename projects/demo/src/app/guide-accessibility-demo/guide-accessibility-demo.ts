import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-guide-accessibility-demo',
  templateUrl: './guide-accessibility-demo.html',
})
export class GuideAccessibilityDemo {
  public commonService = inject(CommonService);}
