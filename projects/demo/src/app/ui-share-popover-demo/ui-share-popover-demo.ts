import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSharePopover } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-share-popover-demo',
  imports: [NxSharePopover, DemoSection],
  templateUrl: './ui-share-popover-demo.html',
  styleUrl: './ui-share-popover-demo.scss',
})
export class UiSharePopoverDemo {
  importCode = `import { NxSharePopover } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  lastCopied = signal('');

  onCopied(url: string): void {
    this.lastCopied.set(url);
  }

  basicCode = `<nx-share-popover url="https://nexium-ui.dev" text="Check out NexiumUI"></nx-share-popover>`;

  basicTs = `onCopied(url: string): void {
  // event fires once the link is successfully copied to the clipboard
}`;

  subsetCode = `<nx-share-popover
    url="https://nexium-ui.dev/docs/ui-share-popover"
    text="Sharing this doc page"
    [channels]="['email', 'whatsapp']"
    position="left">
</nx-share-popover>`;

  singleChannelCode = `<nx-share-popover
    url="https://nexium-ui.dev/pricing"
    [channels]="['x', 'linkedin']">
</nx-share-popover>`;
}
