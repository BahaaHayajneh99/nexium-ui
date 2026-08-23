import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-installation-install-demo',
  imports: [DemoSection],
  templateUrl: './installation-install-demo.html',
})
export class InstallationInstallDemo {
  public commonService = inject(CommonService);

  npmCode = `npm install nexium-ui`;
}
