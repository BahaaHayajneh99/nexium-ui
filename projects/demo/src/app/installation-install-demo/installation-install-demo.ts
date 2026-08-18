import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-installation-install-demo',
  templateUrl: './installation-install-demo.html',
})
export class InstallationInstallDemo {
  public commonService = inject(CommonService);
  npmCode = `npm install @nexium/components @nexium/core`;

  onlyWhatYouNeedCode = `# Most projects only need this one
npm install @nexium/components

# @nexium/core is only required if you use its low-level utilities directly`;

  monorepoCode = `# Working inside this workspace instead of the published packages?
git clone <this-repo>
cd ${this.commonService.appName}
npm install
ng build components
ng build core`;
}
