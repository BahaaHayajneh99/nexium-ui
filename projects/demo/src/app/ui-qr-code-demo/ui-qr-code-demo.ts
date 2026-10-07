import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxQrCode } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-qr-code-demo',
  imports: [NxQrCode, DemoSection],
  templateUrl: './ui-qr-code-demo.html',
  styleUrl: './ui-qr-code-demo.scss',
})
export class UiQrCodeDemo {
  importCode = `import { NxQrCode } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-qr-code value="https://nexium-ui.dev">
</nx-qr-code>`;

  errorCorrectionCode = `<nx-qr-code value="NexiumUI" errorCorrectionLevel="L"></nx-qr-code>
<nx-qr-code value="NexiumUI" errorCorrectionLevel="M"></nx-qr-code>
<nx-qr-code value="NexiumUI" errorCorrectionLevel="Q"></nx-qr-code>
<nx-qr-code value="NexiumUI" errorCorrectionLevel="H"></nx-qr-code>`;

  colorsCode = `<nx-qr-code
    value="https://nexium-ui.dev"
    foreground="#1b2559"
    background="#f4f6fb">
</nx-qr-code>

<nx-qr-code
    value="https://nexium-ui.dev"
    foreground="#ffffff"
    background="#0f766e">
</nx-qr-code>`;

  longTextValue =
    'NexiumUI QR Code component - the automatic version selection picks the smallest ' +
    'QR version (1-40) that still fits the data at the requested error correction ' +
    'level, so a short URL renders as a compact version 1-2 symbol while a longer ' +
    'paragraph like this one automatically scales up to a higher version with more ' +
    'modules, without the caller ever specifying a version by hand.';

  longTextCode = `<nx-qr-code
    [value]="longTextValue"
    [size]="260"
    errorCorrectionLevel="Q">
</nx-qr-code>`;

  marginCode = `<nx-qr-code value="NexiumUI" [size]="120" [margin]="1"></nx-qr-code>
<nx-qr-code value="NexiumUI" [size]="120" [margin]="4"></nx-qr-code>
<nx-qr-code value="NexiumUI" [size]="120" [margin]="8"></nx-qr-code>`;
}
