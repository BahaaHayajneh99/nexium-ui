import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxButton, NxCard, NxCardContent, NxIcon } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-landing-pages-demo',
  imports: [NxButton, NxCard, NxCardContent, NxIcon, DemoSection],
  templateUrl: './blocks-landing-pages-demo.html',
})
export class BlocksLandingPagesDemo {
  public commonService = inject(CommonService);
  features = [
    { icon: 'nx-check', title: 'Standalone components', desc: 'No NgModules, no CDK dependency tree - import only what you use.' },
    { icon: 'nx-sun', title: 'Themeable by default', desc: 'CSS custom properties drive every surface, border, and text color.' },
    { icon: 'nx-accessibility', title: 'Built for accessibility', desc: 'Keyboard navigation, focus management, and ARIA baked into the primitives.' },
  ];

  heroCode = `<div class="hero">
    <span class="eyebrow">Introducing ${this.commonService.appName}</span>
    <h2>The Angular component library that stays out of your way</h2>
    <p>
        Standalone components, real theming, and no hidden dependency tree - build your product's
        design system on top of ours, not around it.
    </p>
    <div class="actions">
        <nx-button variant="primary" size="large">Get Started</nx-button>
        <nx-button variant="secondary" size="large">View on GitHub</nx-button>
    </div>
</div>`;

  featuresCode = `<div class="grid-3">
    @for (feature of features; track feature.title) {
        <nx-card variant="outlined">
            <nx-card-content>
                <div class="feature-icon">
                    <nx-icon [icon]="feature.icon" variant="svg" [size]="20"></nx-icon>
                </div>
                <div class="feature-title">{{ feature.title }}</div>
                <p class="feature-text">{{ feature.desc }}</p>
            </nx-card-content>
        </nx-card>
    }
</div>`;

  ctaCode = `<div class="cta-colored">
    <h2>Ready to build?</h2>
    <p>Install ${this.commonService.appName} and start composing pages like this one in minutes.</p>
    <nx-button variant="light" size="large">Read the Docs</nx-button>
</div>`;

  tsCode = `features = [
  { icon: 'nx-check', title: 'Standalone components', desc: 'No NgModules, no CDK dependency tree - import only what you use.' },
  { icon: 'nx-sun', title: 'Themeable by default', desc: 'CSS custom properties drive every surface, border, and text color.' },
  { icon: 'nx-accessibility', title: 'Built for accessibility', desc: 'Keyboard navigation, focus management, and ARIA baked into the primitives.' },
];`;
}
