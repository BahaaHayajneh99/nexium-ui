import { Component } from '@angular/core';

@Component({
  selector: 'app-guide-rtl-support-demo',
  templateUrl: './guide-rtl-support-demo.html',
  styleUrl: './guide-rtl-support-demo.scss',
})
export class GuideRtlSupportDemo {
  rtl = false;

  toggle(): void {
    this.rtl = !this.rtl;
  }
}
