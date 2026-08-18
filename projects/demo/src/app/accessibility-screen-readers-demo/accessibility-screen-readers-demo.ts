import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-accessibility-screen-readers-demo',
  templateUrl: './accessibility-screen-readers-demo.html',
})
export class AccessibilityScreenReadersDemo {
  public commonService = inject(CommonService);
  tested = [
    { name: 'NVDA', platform: 'Windows + Firefox/Chrome' },
    { name: 'VoiceOver', platform: 'macOS/iOS + Safari' },
    { name: 'JAWS', platform: 'Windows + Chrome' },
  ];
}
