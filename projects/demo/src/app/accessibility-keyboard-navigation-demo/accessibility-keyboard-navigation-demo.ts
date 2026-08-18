import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-accessibility-keyboard-navigation-demo',
  templateUrl: './accessibility-keyboard-navigation-demo.html',
})
export class AccessibilityKeyboardNavigationDemo {
  public commonService = inject(CommonService);
  shortcuts = [
    { keys: 'Tab / Shift+Tab', desc: 'Move focus forward / backward through interactive elements' },
    { keys: 'Enter / Space', desc: 'Activate a button, toggle a checkbox/switch, select a menu item' },
    { keys: 'Arrow keys', desc: 'Move within a composite widget - menu, tabs, radio group, calendar grid' },
    { keys: 'Escape', desc: 'Close the topmost open overlay - popover, dropdown, drawer, command palette' },
    { keys: 'Ctrl/Cmd + K', desc: 'Open the command palette (when wired up) or the site search' },
  ];
}
