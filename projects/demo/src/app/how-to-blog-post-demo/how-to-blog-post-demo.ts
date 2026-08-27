import { Component } from '@angular/core';
import { NxAvatar, NxTag, NxCard, NxCardContent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-how-to-blog-post-demo',
  imports: [NxAvatar, NxTag, NxCard, NxCardContent, DemoSection],
  templateUrl: './how-to-blog-post-demo.html',
  styleUrl: './how-to-blog-post-demo.scss',
})
export class HowToBlogPostDemo {
  author = 'Ada Lovelace';
  publishedOn = 'Aug 12, 2026';
  readTime = '6 min read';
  tags = ['Angular', 'Design Systems', 'UI'];

  code = `<article>
    <header>
        <div class="post-byline">
            <nx-avatar [name]="author" size="medium"></nx-avatar>
            <div>
                <div class="template-profile-name">{{ author }}</div>
                <div class="template-stat-label">{{ publishedOn }} - {{ readTime }}</div>
            </div>
        </div>

        <h2>Building a Design System with Reusable Components</h2>

        <div class="post-tags">
            @for (tag of tags; track tag) {
                <nx-tag variant="outline">{{ tag }}</nx-tag>
            }
        </div>
    </header>

    <nx-card variant="flat">
        <nx-card-content>
            <p>A design system lives or dies by how consistently its components are used...</p>
        </nx-card-content>
    </nx-card>
</article>`;

  tsCode = `author = 'Ada Lovelace';
publishedOn = 'Aug 12, 2026';
readTime = '6 min read';
tags = ['Angular', 'Design Systems', 'UI'];`;
}
