import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-hero-sections-demo',
  imports: [UiButton, DemoSection],
  templateUrl: './blocks-hero-sections-demo.html',
})
export class BlocksHeroSectionsDemo {
  public commonService = inject(CommonService);
  centeredCode = `<div class="hero">
    <span class="eyebrow">Introducing ${this.commonService.appName}</span>
    <h2>Build interfaces without fighting your UI library</h2>
    <p>
        A standalone Angular component set with no CDK dependency, built on tokens
        you can actually read and override.
    </p>
    <div class="actions">
        <nx-button variant="primary" size="large">Get Started</nx-button>
        <nx-button variant="secondary" size="large">View on GitHub</nx-button>
    </div>
</div>`;

  splitCode = `<div class="hero-split">
    <div>
        <span class="eyebrow">For Angular teams</span>
        <h2>Ship consistent UI without a design team</h2>
        <p>
            Every component reads from the same color, spacing and typography
            tokens, so your app looks intentional by default.
        </p>
        <div class="actions">
            <nx-button variant="primary">Get Started</nx-button>
            <nx-button variant="text">Learn more</nx-button>
        </div>
    </div>
    <div class="hero-media">
        <!-- image / illustration -->
    </div>
</div>`;
}
