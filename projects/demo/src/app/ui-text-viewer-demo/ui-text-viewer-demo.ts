import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTextViewer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

const SAMPLE_LOG = `[2026-10-01 09:02:14] INFO  Starting server on port 4300
[2026-10-01 09:02:14] INFO  Connected to database
[2026-10-01 09:02:15] INFO  Cache warmed in 812ms
[2026-10-01 09:04:51] WARN  Slow query detected: SELECT * FROM orders (1.2s)
[2026-10-01 09:04:51] INFO  Request GET /api/orders 200 1214ms
[2026-10-01 09:06:03] ERROR Failed to send email: connection timeout
[2026-10-01 09:06:03] INFO  Retry scheduled in 30s
[2026-10-01 09:06:33] INFO  Email sent successfully
[2026-10-01 09:11:20] INFO  Request POST /api/login 200 84ms
[2026-10-01 09:11:45] WARN  Rate limit approaching for client 10.0.4.21`;

@Component({
  selector: 'app-ui-text-viewer-demo',
  imports: [NxTextViewer, DemoSection],
  templateUrl: './ui-text-viewer-demo.html',
  styleUrl: './ui-text-viewer-demo.scss',
})
export class UiTextViewerDemo {
  importCode = `import { NxTextViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  content = SAMPLE_LOG;

  basicCode = `<nx-text-viewer [content]="content" filename="server.log"></nx-text-viewer>`;

  basicTs = `content = \`[2026-10-01 09:02:14] INFO  Starting server on port 4300
[2026-10-01 09:04:51] WARN  Slow query detected: SELECT * FROM orders (1.2s)
[2026-10-01 09:06:03] ERROR Failed to send email: connection timeout\`;`;
}
