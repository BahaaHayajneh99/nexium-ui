import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiNavbar, UiButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-navbar-demo',
  imports: [UiNavbar, UiButton, DemoSection],
  templateUrl: './ui-navbar-demo.html',
})
export class UiNavbarDemo {
  public commonService = inject(CommonService);
  basicCode = `<nx-navbar>
    <span nx-navbar-brand>${this.commonService.appName}</span>
    <ng-container nx-navbar-links>
        <a href="#">Product</a>
        <a href="#">Docs</a>
        <a href="#">Pricing</a>
    </ng-container>
    <nx-button nx-navbar-actions variant="primary" size="small">Sign Up</nx-button>
</nx-navbar>`;
}
