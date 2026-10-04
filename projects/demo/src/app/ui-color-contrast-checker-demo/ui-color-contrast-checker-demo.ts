import { Component } from '@angular/core';
import { NxColorContrastChecker } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-color-contrast-checker-demo',
  imports: [NxColorContrastChecker, DemoSection],
  templateUrl: './ui-color-contrast-checker-demo.html',
  styleUrl: './ui-color-contrast-checker-demo.scss',
})
export class UiColorContrastCheckerDemo {
  importCode = `import { NxColorContrastChecker } from 'nexium-ui';`;

  basicCode = `<nx-color-contrast-checker foreground="#000000" background="#ffffff"></nx-color-contrast-checker>`;
  basicTs = `// Drag either color swatch - the ratio and the AA/AAA pass/fail badges
// for both normal and large text update live.`;

  lowContrastCode = `<nx-color-contrast-checker foreground="#a0a0a0" background="#ffffff"></nx-color-contrast-checker>`;
  lowContrastTs = `// A ratio below 4.5:1 fails AA for normal text, even though the pair might
// still look "readable enough" at a glance - useful for catching this early.`;

  customTextCode = `<nx-color-contrast-checker
    foreground="#1d4ed8"
    background="#eff6ff"
    previewText="Submit application">
</nx-color-contrast-checker>`;

  customTextTs = `// previewText lets you preview the exact copy you plan to ship,
// e.g. a real button label instead of the default pangram.`;
}
