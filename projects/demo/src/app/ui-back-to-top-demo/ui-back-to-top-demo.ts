import { Component } from '@angular/core';
import { NxBackToTop } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-back-to-top-demo',
  imports: [NxBackToTop, DemoSection],
  templateUrl: './ui-back-to-top-demo.html',
  styleUrl: './ui-back-to-top-demo.scss',
})
export class UiBackToTopDemo {
  importCode = `import { NxBackToTop } from 'nexium-ui';`;

  defaultCode = `<nx-back-to-top></nx-back-to-top>`;
  thresholdCode = `<nx-back-to-top [threshold]="800"></nx-back-to-top>`;
  positionCode = `<nx-back-to-top position="bottom-left"></nx-back-to-top>`;
  scrollUpCode = `<nx-back-to-top [showOnScrollUpOnly]="true"></nx-back-to-top>`;

  // Filler content so the demo page itself is tall enough to actually scroll -
  // the button reacts to the real `window` scroll position, exactly as it
  // would in a consuming app, so it needs real page height to demonstrate.
  fillerParagraphs = Array.from({ length: 14 }, (_, i) => i);

  // Shorter filler used inside the bounded preview boxes further down, just to
  // give those boxes their own scrollbar for reference.
  boxFillerParagraphs = Array.from({ length: 10 }, (_, i) => i);
}
