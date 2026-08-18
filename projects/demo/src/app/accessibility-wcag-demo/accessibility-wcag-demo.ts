import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-accessibility-wcag-demo',
  templateUrl: './accessibility-wcag-demo.html',
})
export class AccessibilityWcagDemo {
  public commonService = inject(CommonService);
  levels = [
    { name: 'A', desc: `Minimum - the baseline every ${this.commonService.appName} component targets.` },
    { name: 'AA', desc: `${this.commonService.appName}'s conformance target - required for most legal accessibility standards (ADA, EN 301 549, Section 508).` },
    { name: 'AAA', desc: 'Enhanced - not targeted globally, but achievable in your own theme (e.g. higher-contrast color tokens).' },
  ];

  principles = [
    { name: 'Perceivable', desc: 'Text alternatives, sufficient color contrast, content that doesn\'t rely on color alone.' },
    { name: 'Operable', desc: 'Full keyboard access, no keyboard traps, visible focus indicators.' },
    { name: 'Understandable', desc: 'Predictable behavior, clear labels, consistent navigation.' },
    { name: 'Robust', desc: 'Valid semantic HTML and ARIA that assistive technology can parse reliably.' },
  ];
}
