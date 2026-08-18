import { Component } from '@angular/core';

@Component({
  selector: 'app-accessibility-testing-demo',
  templateUrl: './accessibility-testing-demo.html',
})
export class AccessibilityTestingDemo {
  manualChecklist = [
    'Unplug the mouse - can you reach and operate every control with Tab, Shift+Tab, Enter, Space and arrow keys?',
    'Is the currently focused element always visible (a clear focus ring), never suppressed with outline: none?',
    'Turn on a screen reader (VoiceOver: Cmd+F5) and navigate the page by heading and by form control - does everything announce sensibly?',
    'Zoom the page to 200% - does content reflow instead of clipping or overlapping?',
    'Run the Color Contrast page against your actual brand colors, not just the defaults.',
    'Open a modal/drawer/dialog - does focus move inside it, stay trapped there, and return to the trigger on close?',
  ];

  automatedTools = [
    { name: 'axe DevTools', desc: 'Browser extension - flags contrast, missing labels, invalid ARIA on the live page.' },
    { name: 'Lighthouse (Chrome DevTools)', desc: 'Built into Chrome - the Accessibility audit catches a good baseline automatically.' },
    { name: '@axe-core/playwright or jest-axe', desc: 'Run the same axe rules in CI so a regression fails a build, not a user.' },
  ];
}
