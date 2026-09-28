import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSpacingEditor, NxSpacingValue } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-spacing-editor-demo',
  imports: [NxSpacingEditor, DemoSection],
  templateUrl: './ui-spacing-editor-demo.html',
  styleUrl: './ui-spacing-editor-demo.scss',
})
export class UiSpacingEditorDemo {
  importCode = `import { NxSpacingEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  spacing: NxSpacingValue = {
    margin: { top: 16, right: 16, bottom: 16, left: 16 },
    padding: { top: 12, right: 12, bottom: 12, left: 12 },
  };

  onSpacingChange(value: NxSpacingValue): void {
    this.spacing = value;
  }

  basicCode = `<nx-spacing-editor [value]="spacing" (valueChange)="onSpacingChange($event)"></nx-spacing-editor>`;

  basicTs = `spacing: NxSpacingValue = {
  margin: { top: 16, right: 16, bottom: 16, left: 16 },
  padding: { top: 12, right: 12, bottom: 12, left: 12 },
};

onSpacingChange(value: NxSpacingValue): void {
  this.spacing = value;
}`;

  cardSpacing: NxSpacingValue = {
    margin: { top: 24, right: 0, bottom: 24, left: 0 },
    padding: { top: 20, right: 20, bottom: 20, left: 20 },
  };

  onCardSpacingChange(value: NxSpacingValue): void {
    this.cardSpacing = value;
  }

  asymmetricCode = `<nx-spacing-editor [value]="cardSpacing" (valueChange)="onCardSpacingChange($event)"></nx-spacing-editor>`;

  asymmetricTs = `cardSpacing: NxSpacingValue = {
  margin: { top: 24, right: 0, bottom: 24, left: 0 },
  padding: { top: 20, right: 20, bottom: 20, left: 20 },
};

onCardSpacingChange(value: NxSpacingValue): void {
  this.cardSpacing = value;
}`;

  get marginSummary(): string {
    const m = this.spacing.margin;
    return `${m.top}px ${m.right}px ${m.bottom}px ${m.left}px`;
  }

  get paddingSummary(): string {
    const p = this.spacing.padding;
    return `${p.top}px ${p.right}px ${p.bottom}px ${p.left}px`;
  }

  summaryCode = `<code>margin: {{ marginSummary }}</code>
<code>padding: {{ paddingSummary }}</code>`;

  summaryTs = `get marginSummary(): string {
  const m = this.spacing.margin;
  return \`\${m.top}px \${m.right}px \${m.bottom}px \${m.left}px\`;
}

get paddingSummary(): string {
  const p = this.spacing.padding;
  return \`\${p.top}px \${p.right}px \${p.bottom}px \${p.left}px\`;
}`;
}
