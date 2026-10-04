import { Component } from '@angular/core';
import { NxInView } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface RevealBlock {
  id: number;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-directive-in-view-demo',
  imports: [NxInView, DemoSection],
  templateUrl: './directive-in-view-demo.html',
})
export class DirectiveInViewDemo {
  importCode = `import { NxInView } from 'nexium-ui';`;

  blocks: RevealBlock[] = [
    { id: 1, label: 'Block 1', visible: false },
    { id: 2, label: 'Block 2', visible: false },
    { id: 3, label: 'Block 3', visible: false },
    { id: 4, label: 'Block 4', visible: false },
  ];

  code = `<div class="scroll-container">
    @for (block of blocks; track block.id) {
        <div
            nxInView
            [nxInViewOnce]="true"
            [nxInViewThreshold]="0.3"
            (nxInViewChange)="onVisible(block, $event)"
            [class.visible]="block.visible">
            {{ block.label }}
        </div>
    }
</div>`;

  ts = `blocks: RevealBlock[] = [
  { id: 1, label: 'Block 1', visible: false },
  { id: 2, label: 'Block 2', visible: false },
  // ...
];

onVisible(block: RevealBlock, inView: boolean): void {
  if (inView) {
    // nxInViewOnce means the observer stops after this, so this only ever runs once per block
    block.visible = true;
  }
}`;

  onVisible(block: RevealBlock, inView: boolean): void {
    if (inView) {
      block.visible = true;
    }
  }
}
