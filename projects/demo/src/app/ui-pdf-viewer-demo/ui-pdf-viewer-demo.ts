import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPdfViewer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

/** Builds a tiny, valid single-page PDF in-memory (correct xref offsets) so this demo has no external network dependency. */
function buildSamplePdf(): string {
  const objects: string[] = [];
  const streamText = [
    'BT /F1 22 Tf 72 700 Td (Hello from the NexiumUI PDF Viewer) Tj ET',
    'BT /F1 12 Tf 72 670 Td (This sample PDF was generated entirely client-side - no network request.) Tj ET',
  ].join('\n');

  objects.push('<< /Type /Catalog /Pages 2 0 R >>');
  objects.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  objects.push('<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>');
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  objects.push(`<< /Length ${streamText.length} >>\nstream\n${streamText}\nendstream`);

  let content = '%PDF-1.4\n';
  const offsets: number[] = [];
  objects.forEach((body, i) => {
    offsets.push(content.length);
    content += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefOffset = content.length;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    xref += `${String(offset).padStart(10, '0')} 00000 n \n`;
  }
  content += xref;
  content += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return content;
}

@Component({
  selector: 'app-ui-pdf-viewer-demo',
  imports: [NxPdfViewer, DemoSection],
  templateUrl: './ui-pdf-viewer-demo.html',
  styleUrl: './ui-pdf-viewer-demo.scss',
})
export class UiPdfViewerDemo {
  importCode = `import { NxPdfViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  pdfUrl = URL.createObjectURL(new Blob([buildSamplePdf()], { type: 'application/pdf' }));

  basicCode = `<nx-pdf-viewer [src]="pdfUrl" title="sample.pdf"></nx-pdf-viewer>`;

  basicTs = `// src is any URL your app serves - from your own backend, cloud storage, etc.
pdfUrl = '/assets/sample.pdf';`;
}
