import { Component } from '@angular/core';
import { NxMarquee, NxIcon } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-marquee-demo',
  imports: [NxMarquee, NxIcon, DemoSection],
  templateUrl: './ui-marquee-demo.html',
  styleUrl: './ui-marquee-demo.scss',
})
export class UiMarqueeDemo {
  importCode = `import { NxMarquee } from 'nexium-ui';`;

  tickerItems = [
    'Deploys ship in under 90 seconds',
    'Now with dark mode across every component',
    '99.98% uptime over the last 90 days',
    'New: keyboard-first command palette',
  ];

  logos: { icon: string; label: string }[] = [
    { icon: 'nx-github', label: 'GitHub' },
    { icon: 'nx-npm', label: 'npm' },
    { icon: 'nx-linkedin', label: 'LinkedIn' },
    { icon: 'nx-facebook', label: 'Facebook' },
    { icon: 'nx-whatsapp', label: 'WhatsApp' },
    { icon: 'nx-x-twitter', label: 'X' },
  ];

  announcements = [
    'v2.5 released',
    'New charts package',
    'Accessibility audit passed',
    'RTL support added',
    'New theming API',
  ];

  tickerCode = `<nx-marquee [speed]="80" direction="left">
    <span class="ticker-item">Deploys ship in under 90 seconds</span>
    <span class="ticker-item">Now with dark mode across every component</span>
    <!-- ...more items... -->
</nx-marquee>`;

  logoWallCode = `<nx-marquee [speed]="50" direction="left" [pauseOnHover]="true" [gap]="48">
    <nx-icon icon="nx-github" variant="svg" [size]="28"></nx-icon>
    <nx-icon icon="nx-npm" variant="svg" [size]="28"></nx-icon>
    <!-- ...more logos... -->
</nx-marquee>`;

  verticalCode = `<nx-marquee
    direction="up"
    [speed]="30"
    [pauseOnHover]="false"
    [gap]="16">
    <div class="announcement-row">v2.5 released</div>
    <div class="announcement-row">New charts package</div>
    <!-- ...more rows... -->
</nx-marquee>`;
}
