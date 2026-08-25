import { Component } from '@angular/core';
import { NxCopyToClipboard, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-copy-to-clipboard-demo',
  imports: [NxCopyToClipboard, NxButton, DemoSection],
  templateUrl: './directive-copy-to-clipboard-demo.html',
})
export class DirectiveCopyToClipboardDemo {
  importCode = `import { NxCopyToClipboard } from 'nexium-ui';`;

  apiKey = 'nx_live_51H8x2KQm9vTf3jL0aZp';
  copied = false;

  code = `<code>{{ apiKey }}</code>
<nx-button [nxCopyToClipboard]="apiKey" (nxCopied)="onCopied()">
    Copy
</nx-button>`;

  onCopied(): void {
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);
  }
}
