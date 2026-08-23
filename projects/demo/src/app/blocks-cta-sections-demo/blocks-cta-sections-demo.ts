import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-cta-sections-demo',
  imports: [NxButton, DemoSection],
  templateUrl: './blocks-cta-sections-demo.html',
})
export class BlocksCtaSectionsDemo {
  public commonService = inject(CommonService);
  plainCode = `<div class="cta">
    <h2>Ready to build with ${this.commonService.appName}?</h2>
    <p>Install the packages you need and start composing screens today.</p>
    <div class="actions">
        <nx-button variant="primary" size="large">Get Started</nx-button>
        <nx-button variant="secondary" size="large">Read the Docs</nx-button>
    </div>
</div>`;

  coloredCode = `<div class="cta cta-colored">
    <h2>Start your free trial today</h2>
    <p>No credit card required. Cancel anytime.</p>
    <nx-button variant="light" size="large">Sign Up Free</nx-button>
</div>`;
}
