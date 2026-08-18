import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-installation-requirements-demo',
  templateUrl: './installation-requirements-demo.html',
})
export class InstallationRequirementsDemo {
  public commonService = inject(CommonService);
  requirements = [
    { name: 'Node.js', value: '18.19+ or 20.9+' },
    { name: 'Angular', value: '17+ (standalone components, built and tested against 21)' },
    { name: 'TypeScript', value: '5.4+' },
    { name: 'Package manager', value: 'npm, pnpm or yarn - any works, examples use npm' },
  ];

  browsers = [
    { name: 'Chrome / Edge', value: 'last 2 versions' },
    { name: 'Firefox', value: 'last 2 versions' },
    { name: 'Safari', value: '16.4+ (for color-mix() and :has() used in a few components)' },
  ];
}
