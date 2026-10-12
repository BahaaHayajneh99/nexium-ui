import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxHtmlPreview } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-html-preview-demo',
  imports: [NxHtmlPreview, FormsModule, DemoSection],
  templateUrl: './ui-html-preview-demo.html',
  styleUrl: './ui-html-preview-demo.scss',
})
export class UiHtmlPreviewDemo {
  importCode = `import { NxHtmlPreview } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicHtml = `<h2 style="color:#1b2559;">Welcome aboard!</h2>
<p>This markup is rendered inside a sandboxed &lt;iframe&gt; - its CSS and DOM
can't bleed into (or clash with) the host page, and no scripts run by default.</p>
<button style="padding:8px 16px;background:#3498db;color:#fff;border:none;border-radius:6px;">
  Call to action
</button>`;
  basicCode = `<nx-html-preview [html]="html" [height]="180"></nx-html-preview>`;

  liveHtml = `<h3>Type HTML on the left...</h3>
<p style="color:#555;">...and watch it render live on the right. Try adding a
<code>&lt;script&gt;</code> tag - it won't execute unless <code>allowScripts</code> is set.</p>`;
  liveCode = `<textarea [(ngModel)]="html"></textarea>
<nx-html-preview [html]="html" [height]="220"></nx-html-preview>`;
  liveTs = `html = 'Type HTML here...';`;

  scriptHtml = `<p id="out">Script has not run yet.</p>
<script>
  document.getElementById('out').textContent = 'Script executed inside the sandboxed frame.';
</script>`;
  scriptCode = `<nx-html-preview [html]="html" [allowScripts]="true" [height]="100"></nx-html-preview>`;

  emptyCode = `<nx-html-preview [height]="120"></nx-html-preview>`;

  autoResizeHtml = `<h3>Auto-resize</h3>
<p>With <code>autoResize</code> on, the frame grows to fit this content instead
of scrolling or clipping it - add more lines on the left and watch the frame grow.</p>`;
  autoResizeCode = `<nx-html-preview [html]="html" [autoResize]="true"></nx-html-preview>`;
}
