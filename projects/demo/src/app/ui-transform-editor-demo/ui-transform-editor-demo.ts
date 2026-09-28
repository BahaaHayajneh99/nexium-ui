import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTransformEditor, NxTransformValue } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-transform-editor-demo',
  imports: [NxTransformEditor, DemoSection],
  templateUrl: './ui-transform-editor-demo.html',
  styleUrl: './ui-transform-editor-demo.scss',
})
export class UiTransformEditorDemo {
  importCode = `import { NxTransformEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  transform: NxTransformValue = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scale: 1,
    skewX: 0,
    skewY: 0,
  };

  onTransformChange(value: NxTransformValue): void {
    this.transform = value;
  }

  basicCode = `<nx-transform-editor [value]="transform" (valueChange)="onTransformChange($event)"></nx-transform-editor>`;

  basicTs = `transform: NxTransformValue = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  scale: 1,
  skewX: 0,
  skewY: 0,
};

onTransformChange(value: NxTransformValue): void {
  this.transform = value;
}`;

  preset: NxTransformValue = {
    translateX: 20,
    translateY: -10,
    rotate: 15,
    scale: 1.15,
    skewX: -5,
    skewY: 0,
  };

  onPresetChange(value: NxTransformValue): void {
    this.preset = value;
  }

  presetCode = `<nx-transform-editor [value]="preset" (valueChange)="onPresetChange($event)"></nx-transform-editor>`;

  presetTs = `preset: NxTransformValue = {
  translateX: 20,
  translateY: -10,
  rotate: 15,
  scale: 1.15,
  skewX: -5,
  skewY: 0,
};

onPresetChange(value: NxTransformValue): void {
  this.preset = value;
}`;

  get cssOutput(): string {
    const v = this.transform;
    return `transform: translate(${v.translateX}px, ${v.translateY}px) rotate(${v.rotate}deg) scale(${v.scale}) skew(${v.skewX}deg, ${v.skewY}deg);`;
  }

  outputCode = `<code>{{ cssOutput }}</code>`;

  outputTs = `get cssOutput(): string {
  const v = this.transform;
  return \`transform: translate(\${v.translateX}px, \${v.translateY}px) rotate(\${v.rotate}deg) scale(\${v.scale}) skew(\${v.skewX}deg, \${v.skewY}deg);\`;
}`;
}
