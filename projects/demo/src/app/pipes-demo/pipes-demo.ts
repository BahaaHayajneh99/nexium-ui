import { Component, inject } from '@angular/core';
import { NxDateFormatPipe, NxTruncatePipe, NxFileSizePipe } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pipes-demo',
  imports: [DemoSection, NxDateFormatPipe, NxTruncatePipe, NxFileSizePipe],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.scss',
})
export class PipesDemo {
  public commonService = inject(CommonService);

  now = new Date();

  longText = 'NexiumUI ships a small set of standalone pipes so common formatting jobs do not need a library or hand-rolled helper.';

  shortText = 'Hello world';

  fileSizes = [512, 2048, 1536000, 3200000000];

  importCode = `import { NxDateFormatPipe, NxTruncatePipe, NxFileSizePipe } from 'nexium-ui';`;

  dateFormatCode = `<p>{{ now | nxDateFormat }}</p>
<p>{{ now | nxDateFormat:'dd/MM/yyyy' }}</p>
<p>{{ now | nxDateFormat:'yyyy-MM-dd HH:mm:ss' }}</p>`;

  truncateCode = `<p>{{ longText | nxTruncate:40 }}</p>
<p>{{ longText | nxTruncate:20:'...' }}</p>
<p>{{ shortText | nxTruncate:40 }}</p>`;

  fileSizeCode = `<p>{{ 512 | nxFileSize }}</p>
<p>{{ 1536000 | nxFileSize }}</p>
<p>{{ 3200000000 | nxFileSize:2 }}</p>`;
}
