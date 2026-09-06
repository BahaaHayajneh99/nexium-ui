import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-getting-started-migration-guide-demo',
  templateUrl: './getting-started-migration-guide-demo.html',
  styleUrl: './getting-started-migration-guide-demo.scss',
})
export class GettingStartedMigrationGuideDemo {
  public commonService = inject(CommonService);
}
