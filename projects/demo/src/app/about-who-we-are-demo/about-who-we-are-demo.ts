import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-about-who-we-are-demo',
  templateUrl: './about-who-we-are-demo.html',
})
export class AboutWhoWeAreDemo {
  public commonService = inject(CommonService);}
