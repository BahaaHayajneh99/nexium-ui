import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBorderEditor, NxBorderValue } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-border-editor-demo',
  imports: [NxBorderEditor, DemoSection],
  templateUrl: './ui-border-editor-demo.html',
  styleUrl: './ui-border-editor-demo.scss',
})
export class UiBorderEditorDemo {
  importCode = `import { NxBorderEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  border: NxBorderValue = {
    width: { top: 1, right: 1, bottom: 1, left: 1 },
    style: 'solid',
    color: '#3b82f6',
    radius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 },
  };

  basicCode = `<nx-border-editor
    [value]="border"
    (valueChange)="onBorderChange($event)">
</nx-border-editor>`;

  basicTs = `border: NxBorderValue = {
  width: { top: 1, right: 1, bottom: 1, left: 1 },
  style: 'solid',
  color: '#3b82f6',
  radius: { topLeft: 8, topRight: 8, bottomRight: 8, bottomLeft: 8 },
};

onBorderChange(value: NxBorderValue): void {
  this.border = value;
}`;

  onBorderChange(value: NxBorderValue): void {
    this.border = value;
  }

  mixedBorder: NxBorderValue = {
    width: { top: 2, right: 4, bottom: 2, left: 4 },
    style: 'dashed',
    color: '#ef4444',
    radius: { topLeft: 24, topRight: 0, bottomRight: 24, bottomLeft: 0 },
  };

  mixedCode = `<!-- Unlink the width/radius controls in the editor to set each side independently. -->
<nx-border-editor
    [value]="mixedBorder"
    (valueChange)="onMixedBorderChange($event)">
</nx-border-editor>`;

  mixedTs = `mixedBorder: NxBorderValue = {
  width: { top: 2, right: 4, bottom: 2, left: 4 },
  style: 'dashed',
  color: '#ef4444',
  radius: { topLeft: 24, topRight: 0, bottomRight: 24, bottomLeft: 0 },
};`;

  onMixedBorderChange(value: NxBorderValue): void {
    this.mixedBorder = value;
  }
}
