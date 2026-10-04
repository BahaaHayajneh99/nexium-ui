import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPdfAnnotator, NxPdfAnnotation } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

/** Builds a tiny, valid single-page PDF in-memory (correct xref offsets) so this demo has no external network dependency - same technique as the PDF Viewer demo's buildSamplePdf(). */
function buildSamplePdf(): string {
  const objects: string[] = [];
  const streamText = [
    'BT /F1 22 Tf 72 700 Td (Quarterly Report - Draft) Tj ET',
    'BT /F1 12 Tf 72 670 Td (This sample PDF was generated entirely client-side - no network request.) Tj ET',
    'BT /F1 12 Tf 72 648 Td (Mark it up with the toolbar above: highlight, rectangle, freehand draw, or text notes.) Tj ET',
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
  selector: 'app-ui-pdf-annotator-demo',
  imports: [NxPdfAnnotator, DemoSection],
  templateUrl: './ui-pdf-annotator-demo.html',
  styleUrl: './ui-pdf-annotator-demo.scss',
})
export class UiPdfAnnotatorDemo {
  importCode = `import { NxPdfAnnotator } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  pdfUrl = URL.createObjectURL(new Blob([buildSamplePdf()], { type: 'application/pdf' }));

  prefilledAnnotations: NxPdfAnnotation[] = [
    {
      id: 'demo-highlight-1',
      tool: 'highlight',
      page: 1,
      points: [
        { x: 0.1, y: 0.11 },
        { x: 0.62, y: 0.16 },
      ],
      color: '#f1c40f',
    },
    {
      id: 'demo-rect-1',
      tool: 'rectangle',
      page: 1,
      points: [
        { x: 0.1, y: 0.28 },
        { x: 0.55, y: 0.42 },
      ],
      color: '#e74c3c',
    },
    {
      id: 'demo-text-1',
      tool: 'text',
      page: 1,
      points: [{ x: 0.12, y: 0.55 }],
      text: 'Reviewed - looks good',
      color: '#2ecc71',
    },
  ];

  emptyAnnotations: NxPdfAnnotation[] = [];

  basicCode = `<nx-pdf-annotator
  [src]="pdfUrl"
  title="sample.pdf"
  [(annotations)]="annotations">
</nx-pdf-annotator>`;

  basicTs = `// annotations: position + tool + color (+ text), NOT embedded into the PDF's bytes - this is
// a separate overlay layer rendered on top of the native PDF frame.
annotations: NxPdfAnnotation[] = [
  { id: '1', tool: 'highlight', page: 1, points: [{x:0.1,y:0.11},{x:0.62,y:0.16}], color: '#f1c40f' },
];`;

  emptyCode = `<nx-pdf-annotator [src]="pdfUrl" title="sample.pdf" [(annotations)]="annotations"></nx-pdf-annotator>`;
}
