import { Component } from '@angular/core';
import { NxInput, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-newsletter-demo',
  imports: [NxInput, NxButton, DemoSection],
  templateUrl: './blocks-newsletter-demo.html',
})
export class BlocksNewsletterDemo {
  email = '';

  code = `<div class="cta-colored">
    <h2>Stay in the loop</h2>
    <p>Get product updates and release notes delivered to your inbox. No spam, unsubscribe anytime.</p>
    <div class="actions">
        <nx-input placeholder="you@example.com" type="email" [(value)]="email"></nx-input>
        <nx-button variant="primary">Subscribe</nx-button>
    </div>
</div>`;

  tsCode = `email = '';`;
}
