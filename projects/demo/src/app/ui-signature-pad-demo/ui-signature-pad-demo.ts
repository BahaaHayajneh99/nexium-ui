import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSignaturePad } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-signature-pad-demo',
  imports: [NxSignaturePad, DemoSection],
  templateUrl: './ui-signature-pad-demo.html',
  styleUrl: './ui-signature-pad-demo.scss',
})
export class UiSignaturePadDemo {
  importCode = `import { NxSignaturePad } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  liveDataUrl = signal<string | null>(null);

  onSignatureChange(dataUrl: string): void {
    this.liveDataUrl.set(dataUrl);
  }

  basicCode = `<nx-signature-pad></nx-signature-pad>`;
  basicTs = `// Draw with mouse, touch, or pen - Pointer Events unify them all.
// Undo removes just the last stroke; Clear wipes the whole pad.`;

  exportCode = `<nx-signature-pad
    strokeColor="#1b2559"
    [strokeWidth]="3"
    backgroundColor="#f4f6fb"
    (signatureChange)="onSignatureChange($event)">
</nx-signature-pad>`;
  exportTs = `onSignatureChange(dataUrl: string) {
  // Fires after every completed stroke with a 'data:image/png;base64,...' export.
  this.liveDataUrl = dataUrl;
}

// You can also pull the image out on demand via a template reference:
// @ViewChild(NxSignaturePad) pad!: NxSignaturePad;
// const png = this.pad.getDataUrl();`;
}
