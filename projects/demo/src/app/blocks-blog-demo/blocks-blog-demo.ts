import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBadge, NxCard, NxCardContent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-blog-demo',
  imports: [NxBadge, NxCard, NxCardContent, DemoSection],
  templateUrl: './blocks-blog-demo.html',
})
export class BlocksBlogDemo {
  public commonService = inject(CommonService);
  posts = [
    { title: 'Designing focus traps that actually work', tag: 'Accessibility', date: 'Aug 3, 2026', excerpt: 'A walkthrough of the pattern behind nx-modal, and why most focus-trap implementations get tab order wrong.' },
    { title: 'Theming with CSS custom properties', tag: 'Theming', date: 'Jul 22, 2026', excerpt: `How ${this.commonService.appName} structures its --shell-* tokens so dark mode is a data attribute, not a duplicate stylesheet.` },
    { title: 'Why we skipped a CDK dependency', tag: 'Architecture', date: 'Jul 9, 2026', excerpt: 'Standalone components, no NgModules, and no overlay engine to fight with — the reasoning behind the stack.' },
  ];

  code = `<div class="grid-3">
    @for (post of posts; track post.title) {
        <nx-card variant="outlined">
            <nx-card-content>
                <div class="hero-media" style="height: 140px;">Image placeholder</div>
                <nx-badge variant="secondary" size="small">{{ post.tag }}</nx-badge>
                <h4>{{ post.title }}</h4>
                <p class="post-date">{{ post.date }}</p>
                <p>{{ post.excerpt }}</p>
            </nx-card-content>
        </nx-card>
    }
</div>`;

  tsCode = `posts = [
  { title: 'Designing focus traps that actually work', tag: 'Accessibility', date: 'Aug 3, 2026', excerpt: '...' },
  { title: 'Theming with CSS custom properties', tag: 'Theming', date: 'Jul 22, 2026', excerpt: '...' },
  { title: 'Why we skipped a CDK dependency', tag: 'Architecture', date: 'Jul 9, 2026', excerpt: '...' },
];`;
}
