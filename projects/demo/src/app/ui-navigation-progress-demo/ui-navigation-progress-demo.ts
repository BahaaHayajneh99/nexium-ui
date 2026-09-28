import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxNavigationProgress } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-navigation-progress-demo',
  imports: [NxNavigationProgress, DemoSection],
  templateUrl: './ui-navigation-progress-demo.html',
  styleUrl: './ui-navigation-progress-demo.scss',
})
export class UiNavigationProgressDemo {
  importCode = `import { NxNavigationProgress } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-navigation-progress #progress></nx-navigation-progress>

<button (click)="progress.start()">Start</button>
<button (click)="progress.complete()">Complete</button>`;

  basicTs = `// The bar is driven imperatively via a template reference variable -
// call start() when a route change begins, complete() when it finishes.
// Progress trickles toward 90% while running so it never looks stuck.`;

  setCode = `<nx-navigation-progress #upload></nx-navigation-progress>

<button (click)="upload.start()">Start upload</button>
<button (click)="upload.set(50)">Set 50%</button>
<button (click)="upload.complete()">Finish upload</button>`;

  setTs = `// set(percent) jumps the bar to an exact value (0-100) - useful when you
// can track real progress, e.g. from an upload's progress event.`;
}
