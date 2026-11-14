import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxJwtDecoder, NxJwtDecoded } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

// A realistic-looking but entirely fake/non-functional sample token (made-up header/payload,
// made-up signature) - decoded purely client-side, never sent anywhere.
const SAMPLE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiJ1c2VyXzQyIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsImVtYWlsIjoiYWRhQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwNDU2MDAwLCJleHAiOjIwNDYwMjk2MDB9.' +
  '4f2x9z7Qk0y1Vd8w3n6B5sT2cJhR9pL0aU7mE4iK1g';

@Component({
  selector: 'app-ui-jwt-decoder-demo',
  imports: [NxJwtDecoder, DemoSection],
  templateUrl: './ui-jwt-decoder-demo.html',
  styleUrl: './ui-jwt-decoder-demo.scss',
})
export class UiJwtDecoderDemo {
  importCode = `import { NxJwtDecoder } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  token = SAMPLE_TOKEN;

  lastDecoded: NxJwtDecoded | null = null;

  onDecoded(result: NxJwtDecoded | null): void {
    this.lastDecoded = result;
  }

  basicCode = `<nx-jwt-decoder
    [token]="token"
    (decoded)="onDecoded($event)">
</nx-jwt-decoder>`;

  basicTs = `token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....signature';

onDecoded(result: { header: unknown; payload: unknown } | null): void {
  // result is null when the pasted token isn't a well-formed 3-segment JWT.
}`;
}
