import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxHttpStatus } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-http-status-demo',
  imports: [NxHttpStatus, DemoSection],
  templateUrl: './ui-http-status-demo.html',
  styleUrl: './ui-http-status-demo.scss',
})
export class UiHttpStatusDemo {
  importCode = `import { NxHttpStatus } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-http-status [code]="200"></nx-http-status>
<nx-http-status [code]="201"></nx-http-status>
<nx-http-status [code]="301"></nx-http-status>
<nx-http-status [code]="404"></nx-http-status>
<nx-http-status [code]="500"></nx-http-status>`;

  basicTs = `// code drives the color: 2xx green, 3xx blue, 4xx amber, 5xx red.`;

  textCode = `<nx-http-status [code]="200" statusText="OK"></nx-http-status>
<nx-http-status [code]="201" statusText="Created"></nx-http-status>
<nx-http-status [code]="404" statusText="Not Found"></nx-http-status>
<nx-http-status [code]="500" statusText="Internal Server Error"></nx-http-status>`;

  endpoints = [
    { method: 'GET', path: '/api/users', code: 200, statusText: 'OK' },
    { method: 'POST', path: '/api/users', code: 201, statusText: 'Created' },
    { method: 'GET', path: '/api/users/42', code: 404, statusText: 'Not Found' },
    { method: 'POST', path: '/api/login', code: 500, statusText: 'Internal Server Error' },
  ];

  contextCode = `<div class="endpoint-row" *ngFor="let endpoint of endpoints">
    <span>{{ endpoint.method }} {{ endpoint.path }}</span>
    <nx-http-status [code]="endpoint.code" [statusText]="endpoint.statusText"></nx-http-status>
</div>`;

  contextTs = `endpoints = [
  { method: 'GET', path: '/api/users', code: 200, statusText: 'OK' },
  { method: 'POST', path: '/api/users', code: 201, statusText: 'Created' },
  { method: 'GET', path: '/api/users/42', code: 404, statusText: 'Not Found' },
  { method: 'POST', path: '/api/login', code: 500, statusText: 'Internal Server Error' },
];`;
}
