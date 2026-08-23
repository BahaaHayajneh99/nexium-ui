import { Component } from '@angular/core';
import { NxModal, NxButton } from 'components';

@Component({
  selector: 'app-accessibility-focus-management-demo',
  imports: [NxModal, NxButton],
  templateUrl: './accessibility-focus-management-demo.html',
})
export class AccessibilityFocusManagementDemo {
  modalOpen = false;
}
