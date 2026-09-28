import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxShadowEditor, NxShadowValue } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-shadow-editor-demo',
  imports: [NxShadowEditor, DemoSection],
  templateUrl: './ui-shadow-editor-demo.html',
  styleUrl: './ui-shadow-editor-demo.scss',
})
export class UiShadowEditorDemo {
  importCode = `import { NxShadowEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  shadow: NxShadowValue = { x: 0, y: 4, blur: 12, spread: 0, color: 'rgba(0, 0, 0, 0.25)', inset: false };

  basicCode = `<nx-shadow-editor
    [value]="shadow"
    (valueChange)="onShadowChange($event)">
</nx-shadow-editor>`;

  basicTs = `shadow: NxShadowValue = { x: 0, y: 4, blur: 12, spread: 0, color: 'rgba(0, 0, 0, 0.25)', inset: false };

onShadowChange(value: NxShadowValue): void {
  this.shadow = value;
}`;

  onShadowChange(value: NxShadowValue): void {
    this.shadow = value;
  }

  insetShadow: NxShadowValue = { x: 0, y: 2, blur: 6, spread: 0, color: 'rgba(0, 0, 0, 0.35)', inset: true };

  insetCode = `<nx-shadow-editor
    [value]="insetShadow"
    (valueChange)="onInsetShadowChange($event)">
</nx-shadow-editor>`;

  insetTs = `insetShadow: NxShadowValue = { x: 0, y: 2, blur: 6, spread: 0, color: 'rgba(0, 0, 0, 0.35)', inset: true };`;

  onInsetShadowChange(value: NxShadowValue): void {
    this.insetShadow = value;
  }
}
