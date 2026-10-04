import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxEmailTemplateBuilder, NxEmailBlock } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-email-template-builder-demo',
  imports: [NxEmailTemplateBuilder, DemoSection],
  templateUrl: './ui-email-template-builder-demo.html',
  styleUrl: './ui-email-template-builder-demo.scss',
})
export class UiEmailTemplateBuilderDemo {
  importCode = `import { NxEmailTemplateBuilder } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  blocks: NxEmailBlock[] = [
    { id: 'b1', type: 'heading', text: 'Welcome to NexiumUI', align: 'left' },
    { id: 'b2', type: 'text', text: "Thanks for signing up! We're excited to have you on board.", align: 'left' },
    { id: 'b3', type: 'button', text: 'Get started', href: 'https://example.com', align: 'left' },
  ];

  onBlocksChange(blocks: NxEmailBlock[]): void {
    this.blocks = blocks;
  }

  basicCode = `<nx-email-template-builder [blocks]="blocks" (blocksChange)="onBlocksChange($event)"></nx-email-template-builder>`;

  basicTs = `blocks: NxEmailBlock[] = [
  { id: 'b1', type: 'heading', text: 'Welcome to NexiumUI', align: 'left' },
  { id: 'b2', type: 'text', text: "Thanks for signing up!", align: 'left' },
  { id: 'b3', type: 'button', text: 'Get started', href: 'https://example.com', align: 'left' },
];

onBlocksChange(blocks: NxEmailBlock[]): void {
  this.blocks = blocks; // add/reorder/edit/remove blocks, then Export HTML for the final markup
}`;
}
