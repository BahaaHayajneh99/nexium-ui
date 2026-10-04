import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxLogViewer, NxLogEntry } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-log-viewer-demo',
  imports: [NxLogViewer, DemoSection],
  templateUrl: './ui-log-viewer-demo.html',
  styleUrl: './ui-log-viewer-demo.scss',
})
export class UiLogViewerDemo {
  importCode = `import { NxLogViewer, NxLogEntry } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  entries: NxLogEntry[] = [
    { id: 1, level: 'info', message: 'Server started on port 4000', timestamp: '10:00:01' },
    { id: 2, level: 'debug', message: 'Loaded config from .env.production', timestamp: '10:00:01' },
    { id: 3, level: 'info', message: 'Connected to database', timestamp: '10:00:02' },
    { id: 4, level: 'warn', message: 'Slow query detected (842ms): SELECT * FROM orders', timestamp: '10:00:15' },
    { id: 5, level: 'error', message: 'Unhandled promise rejection in payment worker', timestamp: '10:00:42' },
    { id: 6, level: 'info', message: 'Processed 128 jobs from queue', timestamp: '10:01:00' },
    { id: 7, level: 'debug', message: 'Cache hit ratio: 94%', timestamp: '10:01:03' },
  ];

  basicCode = `<nx-log-viewer [entries]="entries"></nx-log-viewer>`;

  basicTs = `entries: NxLogEntry[] = [
  { id: 1, level: 'info', message: 'Server started on port 4000', timestamp: '10:00:01' },
  { id: 2, level: 'debug', message: 'Loaded config from .env.production', timestamp: '10:00:01' },
  { id: 3, level: 'info', message: 'Connected to database', timestamp: '10:00:02' },
  { id: 4, level: 'warn', message: 'Slow query detected (842ms): SELECT * FROM orders', timestamp: '10:00:15' },
  { id: 5, level: 'error', message: 'Unhandled promise rejection in payment worker', timestamp: '10:00:42' },
  { id: 6, level: 'info', message: 'Processed 128 jobs from queue', timestamp: '10:01:00' },
  { id: 7, level: 'debug', message: 'Cache hit ratio: 94%', timestamp: '10:01:03' },
];`;
}
