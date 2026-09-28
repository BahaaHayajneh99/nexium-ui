import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { NxRequestBuilder, NxHttpRequestValue } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-request-builder-demo',
  imports: [NxRequestBuilder, DemoSection, CommonModule],
  templateUrl: './ui-request-builder-demo.html',
  styleUrl: './ui-request-builder-demo.scss',
})
export class UiRequestBuilderDemo {
  importCode = `import { NxRequestBuilder, NxHttpRequestValue } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  requestValue = signal<NxHttpRequestValue>({
    method: 'POST',
    url: 'https://api.example.com/users',
    headers: [{ key: 'Authorization', value: 'Bearer <token>' }],
    body: '{\n  "name": "Ada Lovelace"\n}',
  });

  lastSentRequest = signal<NxHttpRequestValue | null>(null);

  basicCode = `<nx-request-builder
    [value]="requestValue"
    (valueChange)="requestValue = $event"
    (send)="onSend($event)">
</nx-request-builder>

@if (lastSentRequest) {
  <pre>{{ lastSentRequest | json }}</pre>
}`;

  basicTs = `requestValue: NxHttpRequestValue = {
  method: 'POST',
  url: 'https://api.example.com/users',
  headers: [{ key: 'Authorization', value: 'Bearer <token>' }],
  body: '{\\n  "name": "Ada Lovelace"\\n}',
};

lastSentRequest: NxHttpRequestValue | null = null;

onSend(request: NxHttpRequestValue): void {
  this.lastSentRequest = request;
}`;

  onSend(request: NxHttpRequestValue): void {
    this.lastSentRequest.set(request);
  }
}
