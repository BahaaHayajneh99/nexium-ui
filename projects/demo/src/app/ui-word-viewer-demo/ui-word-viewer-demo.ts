import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxWordViewer, NxWordBlock } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-word-viewer-demo',
  imports: [NxWordViewer, DemoSection],
  templateUrl: './ui-word-viewer-demo.html',
  styleUrl: './ui-word-viewer-demo.scss',
})
export class UiWordViewerDemo {
  importCode = `import { NxWordViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  blocks: NxWordBlock[] = [
    { type: 'heading1', runs: [{ text: 'Q3 Product Roadmap' }] },
    { type: 'paragraph', runs: [{ text: 'This document outlines the ' }, { text: 'priority', bold: true }, { text: ' initiatives for the next quarter.' }] },
    { type: 'heading2', runs: [{ text: 'Goals' }] },
    { type: 'bullet', runs: [{ text: 'Ship the new onboarding flow by week 6' }] },
    { type: 'bullet', runs: [{ text: 'Reduce p95 API latency below ' }, { text: '200ms', bold: true }] },
    { type: 'bullet', runs: [{ text: 'Launch the PRO component library ', italic: true }, { text: '(this week!)', bold: true, italic: true }] },
    { type: 'heading2', runs: [{ text: 'Timeline' }] },
    { type: 'numbered', runs: [{ text: 'Weeks 1-2: Design review' }] },
    { type: 'numbered', runs: [{ text: 'Weeks 3-5: Implementation' }] },
    { type: 'numbered', runs: [{ text: 'Week 6: ', underline: true }, { text: 'Launch', bold: true, underline: true }] },
  ];

  basicCode = `<nx-word-viewer title="roadmap.docx" [blocks]="blocks"></nx-word-viewer>`;

  basicTs = `blocks: NxWordBlock[] = [
  { type: 'heading1', runs: [{ text: 'Q3 Product Roadmap' }] },
  { type: 'paragraph', runs: [{ text: 'This document outlines the ' }, { text: 'priority', bold: true }, { text: ' initiatives.' }] },
  { type: 'bullet', runs: [{ text: 'Ship the new onboarding flow by week 6' }] },
  // ...more blocks - convert a real .docx with a library like mammoth.js first
];`;
}
