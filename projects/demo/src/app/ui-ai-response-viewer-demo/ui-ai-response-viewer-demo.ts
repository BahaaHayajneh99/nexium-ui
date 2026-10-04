import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAiResponseViewer } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

const RESPONSE = `## Centering a div

The cleanest modern approach is **flexbox**:

\`\`\`css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
\`\`\`

That centers the child both horizontally *and* vertically, and it keeps working even if the child's size changes later. If you only need to center text within a block, \`text-align: center\` alone may be enough.`;

@Component({
  selector: 'app-ui-ai-response-viewer-demo',
  imports: [NxAiResponseViewer, DemoSection],
  templateUrl: './ui-ai-response-viewer-demo.html',
  styleUrl: './ui-ai-response-viewer-demo.scss',
})
export class UiAiResponseViewerDemo {
  importCode = `import { NxAiResponseViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  response = RESPONSE;

  lastFeedback = signal<'up' | 'down' | null>(null);
  regenerateCount = signal(0);

  onFeedback(value: 'up' | 'down'): void {
    this.lastFeedback.set(value);
  }

  onRegenerate(): void {
    this.regenerateCount.update((count) => count + 1);
  }

  basicCode = `<nx-ai-response-viewer
    [content]="response"
    (feedback)="onFeedback($event)"
    (regenerate)="onRegenerate()">
</nx-ai-response-viewer>`;

  basicTs = `response = \`## Centering a div

The cleanest modern approach is **flexbox**:

\\\`\\\`\\\`css
.container { display: flex; align-items: center; justify-content: center; }
\\\`\\\`\\\`\`;

onFeedback(value: 'up' | 'down'): void {
  // Send feedback to your analytics/telemetry here.
}

onRegenerate(): void {
  // Re-run whatever produced this response and rebind [content] with the new result.
}`;

  streamingCode = `<nx-ai-response-viewer [content]="response" [streaming]="true"></nx-ai-response-viewer>`;
  streamingTs = `// With streaming set, the content is revealed progressively, a few characters at a
// time - the same technique nx-chat-stream uses for its in-progress assistant message.`;
}
