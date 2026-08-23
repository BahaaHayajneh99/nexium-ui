import { Component } from '@angular/core';
import { NxIcon } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Feature {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-blocks-feature-sections-demo',
  imports: [NxIcon, DemoSection],
  templateUrl: './blocks-feature-sections-demo.html',
})
export class BlocksFeatureSectionsDemo {
  features: Feature[] = [
    { icon: 'nx-grid', title: 'Standalone components', text: 'Every component is standalone - no NgModule to wire up, import what you use.' },
    { icon: 'nx-sun', title: 'Light & dark theming', text: 'Built on CSS custom properties, so switching themes needs no per-component work.' },
    { icon: 'nx-globe', title: 'RTL ready', text: 'Logical CSS properties mean setting dir="rtl" mirrors layout automatically.' },
    { icon: 'nx-settings', title: 'Token-driven', text: 'Colors, spacing, radius and type all come from one variables.scss file.' },
    { icon: 'nx-check-circle', title: 'Accessible by default', text: 'Native form elements and focus-visible outlines instead of custom widgets.' },
    { icon: 'nx-rocket', title: 'No CDK dependency', text: 'Every behaviour - overlays, focus trapping, positioning - is hand-rolled.' },
  ];

  previewCode = `<div class="features-grid">
    <div class="feature">
        <div class="feature-icon">
            <nx-icon icon="nx-grid" variant="svg" [size]="20"></nx-icon>
        </div>
        <div class="feature-title">Standalone components</div>
        <p>Every component is standalone - no NgModule to wire up, import what you use.</p>
    </div>
    <!-- repeat per feature -->
</div>`;
}
