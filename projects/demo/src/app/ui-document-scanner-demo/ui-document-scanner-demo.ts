import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDocumentScanner } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-document-scanner-demo',
  imports: [NxDocumentScanner, DemoSection],
  templateUrl: './ui-document-scanner-demo.html',
  styleUrl: './ui-document-scanner-demo.scss',
})
export class UiDocumentScannerDemo {
  importCode = `import { NxDocumentScanner } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-document-scanner (scanned)="onScanned($event)"></nx-document-scanner>`;

  basicTs = `onScanned(dataUrl: string): void {
  // dataUrl is a PNG data URL of the cropped + enhanced page.
  this.lastScan = dataUrl;
}`;

  resultCode = `<img [src]="lastScan" alt="Scanned document" />`;

  lastScan: string | null = null;

  onScanned(dataUrl: string): void {
    this.lastScan = dataUrl;
  }
}
