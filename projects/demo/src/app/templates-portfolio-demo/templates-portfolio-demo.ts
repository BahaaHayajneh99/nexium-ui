import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxTag, NxAvatar, NxButton, NxIcon } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Project {
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-templates-portfolio-demo',
  imports: [NxCard, NxCardContent, NxTag, NxAvatar, NxButton, NxIcon, DemoSection],
  templateUrl: './templates-portfolio-demo.html',
})
export class TemplatesPortfolioDemo {
  projects: Project[] = [
    { title: 'Nova Dashboard', description: 'A real-time analytics dashboard for subscription businesses.', tags: ['Angular', 'TypeScript', 'Charts'] },
    { title: 'Orbit Design System', description: 'A themeable component library shared across six product teams.', tags: ['Design', 'Storybook', 'SCSS'] },
    { title: 'Pulse Mobile', description: 'A cross-platform fitness tracking app with offline-first sync.', tags: ['Ionic', 'TypeScript'] },
    { title: 'Lumen CMS', description: 'A headless content platform with drag-and-drop page building.', tags: ['Angular', 'Node.js'] },
    { title: 'Atlas Maps', description: 'An interactive map visualization toolkit for logistics data.', tags: ['D3.js', 'TypeScript', 'Design'] },
  ];

  name = 'Ada Lovelace';
  title = 'Product Designer & Frontend Engineer';
  bio = 'I design and build clean, accessible interfaces - from early sketches to production-ready components. Based in Amman, working with teams worldwide.';

  testimonialQuote = `"Ada redesigned our onboarding flow and conversion jumped 22% within a month. Rare to find someone equally sharp at design and code."`;
  testimonialAuthor = 'Grace Hopper, VP Product at Initech';

  projectsCode = `<div class="nx-auto-fit-grid" style="--nx-grid-min-width: 260px;">
    @for (project of projects; track project.title) {
        <nx-card variant="outlined">
            <nx-card-content>
                <div class="block-hero-media">Cover image</div>
                <div class="template-profile-name mt-2">{{ project.title }}</div>
                <p class="template-stat-label mt-1">{{ project.description }}</p>
                <div class="mt-2" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    @for (tag of project.tags; track tag) {
                        <nx-tag variant="outline" color="var(--shell-primary)">{{ tag }}</nx-tag>
                    }
                </div>
            </nx-card-content>
        </nx-card>
    }
</div>`;

  aboutCode = `<div class="template-profile-header">
    <nx-avatar [name]="name" size="large"></nx-avatar>
    <div>
        <div class="template-profile-name">{{ name }}</div>
        <div class="template-stat-label">{{ title }}</div>
    </div>
</div>
<p class="mt-3">{{ bio }}</p>
<div class="mt-3" style="display: flex; gap: 0.75rem;">
    <nx-button variant="outline" size="small"><nx-icon icon="nx-mail" [size]="16"></nx-icon> Email</nx-button>
    <nx-button variant="outline" size="small"><nx-icon icon="nx-github" [size]="16"></nx-icon> GitHub</nx-button>
    <nx-button variant="outline" size="small"><nx-icon icon="nx-linkedin" [size]="16"></nx-icon> LinkedIn</nx-button>
</div>

<nx-card variant="outlined">
    <nx-card-content>
        <p>{{ testimonialQuote }}</p>
        <p class="template-stat-label mt-2">{{ testimonialAuthor }}</p>
    </nx-card-content>
</nx-card>`;
}
