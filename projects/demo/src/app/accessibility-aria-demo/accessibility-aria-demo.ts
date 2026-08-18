import { Component } from '@angular/core';

@Component({
  selector: 'app-accessibility-aria-demo',
  templateUrl: './accessibility-aria-demo.html',
})
export class AccessibilityAriaDemo {
  patterns = [
    { component: 'nx-modal', pattern: 'role="dialog" aria-modal="true" aria-label' },
    { component: 'nx-dialog', pattern: 'role="alertdialog" aria-modal="true" aria-label' },
    { component: 'nx-toast', pattern: 'role="status" aria-live="polite"' },
    { component: 'nx-notification-center', pattern: 'A visually-hidden aria-live region announces the unread count' },
    { component: 'nx-checkbox', pattern: 'aria-invalid reflects the invalid input' },
    { component: 'nx-menu', pattern: 'role="menu" / role="menuitem" on each row' },
    { component: 'nx-rating', pattern: 'role="radiogroup" with aria-checked per star' },
  ];

  ruleOfThumb = `First rule of ARIA: don't use ARIA.
If a native element (<button>, <input>, <a>) gets you the semantics for
free, prefer it over a styled <div> plus a role attribute.`;
}
