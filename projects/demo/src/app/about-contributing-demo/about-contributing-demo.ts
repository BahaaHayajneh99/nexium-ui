import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-about-contributing-demo',
  templateUrl: './about-contributing-demo.html',
})
export class AboutContributingDemo {
  public commonService = inject(CommonService);
  setupCode = `git clone <this-repo>
cd`+ this.commonService.appName +`
npm install
ng build components
ng build core
ng serve demo`;

  testCode = `ng test components
ng lint`;

  branchCode = `git checkout -b fix/short-description
# make your change
git commit -m "fix: short description of the fix"
git push origin fix/short-description`;
}
