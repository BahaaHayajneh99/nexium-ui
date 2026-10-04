import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDocumentViewer, NxWordBlock } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-document-viewer-demo',
  imports: [NxDocumentViewer, DemoSection],
  templateUrl: './ui-document-viewer-demo.html',
  styleUrl: './ui-document-viewer-demo.scss',
})
export class UiDocumentViewerDemo {
  importCode = `import { NxDocumentViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  pdfCode = `<nx-document-viewer filename="company-handbook.pdf" [src]="pdfUrl"></nx-document-viewer>`;
  pdfTs = `// filename ends in ".pdf" -> auto-detected as 'pdf' -> delegates to NxPdfViewer internally.`;

  wordBlocks: NxWordBlock[] = [
    { type: 'heading1', runs: [{ text: 'Onboarding Guide' }] },
    { type: 'paragraph', runs: [{ text: 'Welcome to the team! This document ' }, { text: 'has no file extension', bold: true }, { text: ' at all.' }] },
    { type: 'bullet', runs: [{ text: 'Detected as Word because wordBlocks is the only populated data input.' }] },
  ];
  wordCode = `<nx-document-viewer filename="onboarding" [wordBlocks]="wordBlocks"></nx-document-viewer>`;
  wordTs = `wordBlocks: NxWordBlock[] = [
  { type: 'heading1', runs: [{ text: 'Onboarding Guide' }] },
  { type: 'paragraph', runs: [{ text: 'Welcome to the team! This document has no file extension.' }] },
];

// "onboarding" has no recognizable extension -> falls back to detecting from populated
// data inputs -> wordBlocks is populated -> renders NxWordViewer.`;

  markdownSource = `# Release Notes\n\n## v2.3.0\n- Added dark mode\n- Fixed a crash on startup\n\n> Upgrade recommended for all users.`;
  markdownCode = `<nx-document-viewer filename="release-notes.md" [markdownSource]="markdownSource"></nx-document-viewer>`;
  markdownTs = `markdownSource = \`# Release Notes\\n\\n## v2.3.0\\n- Added dark mode\\n- Fixed a crash on startup\`;

// filename ends in ".md" -> auto-detected as 'markdown' -> delegates to NxMarkdownViewer.`;

  missingCode = `<nx-document-viewer filename="quarterly-report.docx"></nx-document-viewer>`;
  missingTs = `// ".docx" is detected as type 'word', but no wordBlocks were supplied -
// shows the "No preview available" empty state instead of crashing or rendering blank.`;
}
