import { Component } from '@angular/core';
import { UiModal, UiButton } from 'components';

@Component({
  selector: 'app-accessibility-focus-management-demo',
  imports: [UiModal, UiButton],
  templateUrl: './accessibility-focus-management-demo.html',
})
export class AccessibilityFocusManagementDemo {
  modalOpen = false;
}
