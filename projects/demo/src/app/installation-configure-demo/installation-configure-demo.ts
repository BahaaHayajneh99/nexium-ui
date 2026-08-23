import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-installation-configure-demo',
  imports: [DemoSection],
  templateUrl: './installation-configure-demo.html',
})
export class InstallationConfigureDemo {
  public commonService = inject(CommonService);

  angularJsonCode = `"architect": {
  "build": {
    "options": {
      "styles": [
        "node_modules/nexium-ui/styles.css",
        "src/styles.scss"
      ]
    }
  }
}`;

  globalImportCode = `@import 'nexium-ui/styles.css';`;
}
