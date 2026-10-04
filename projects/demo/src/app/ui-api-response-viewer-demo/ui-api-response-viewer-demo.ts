import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxApiResponseViewer, NxApiResponse } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-api-response-viewer-demo',
  imports: [NxApiResponseViewer, DemoSection],
  templateUrl: './ui-api-response-viewer-demo.html',
  styleUrl: './ui-api-response-viewer-demo.scss',
})
export class UiApiResponseViewerDemo {
  importCode = `import { NxApiResponseViewer, NxApiResponse } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  successResponse: NxApiResponse = {
    status: 200,
    statusText: 'OK',
    durationMs: 84,
    headers: {
      'content-type': 'application/json',
      'x-request-id': 'req_8f2a1c3e',
      'cache-control': 'no-store',
    },
    body: {
      id: 42,
      name: 'Ada Lovelace',
      email: 'ada@nexaui.dev',
      roles: ['admin', 'billing'],
    },
  };

  successCode = `<nx-api-response-viewer [response]="successResponse"></nx-api-response-viewer>`;

  successTs = `successResponse: NxApiResponse = {
  status: 200,
  statusText: 'OK',
  durationMs: 84,
  headers: {
    'content-type': 'application/json',
    'x-request-id': 'req_8f2a1c3e',
    'cache-control': 'no-store',
  },
  body: {
    id: 42,
    name: 'Ada Lovelace',
    email: 'ada@nexaui.dev',
    roles: ['admin', 'billing'],
  },
};`;

  errorResponse: NxApiResponse = {
    status: 500,
    statusText: 'Internal Server Error',
    durationMs: 1240,
    headers: {
      'content-type': 'application/json',
      'x-request-id': 'req_1b90dd77',
    },
    body: {
      error: 'InternalServerError',
      message: 'Unhandled exception while processing payment.',
    },
  };

  errorCode = `<nx-api-response-viewer [response]="errorResponse"></nx-api-response-viewer>`;

  errorTs = `errorResponse: NxApiResponse = {
  status: 500,
  statusText: 'Internal Server Error',
  durationMs: 1240,
  headers: {
    'content-type': 'application/json',
    'x-request-id': 'req_1b90dd77',
  },
  body: {
    error: 'InternalServerError',
    message: 'Unhandled exception while processing payment.',
  },
};`;
}
