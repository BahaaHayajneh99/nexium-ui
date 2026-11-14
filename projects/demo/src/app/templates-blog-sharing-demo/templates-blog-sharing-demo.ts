import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxAvatar, NxTag, NxIcon, NxButton } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  comments: number;
}

interface PostComment {
  name: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-templates-blog-sharing-demo',
  imports: [NxCard, NxCardContent, NxAvatar, NxTag, NxIcon, NxButton, DemoSection],
  templateUrl: './templates-blog-sharing-demo.html',
})
export class TemplatesBlogSharingDemo {
  posts: BlogPost[] = [
    {
      title: 'Designing with Design Tokens',
      excerpt: 'How a small set of CSS variables can keep an entire product consistent across themes.',
      author: 'Maya Chen',
      date: 'Oct 3, 2026',
      category: 'Design',
      likes: 128,
      comments: 24,
    },
    {
      title: 'Five Lessons from Scaling a Component Library',
      excerpt: 'What we learned shipping standalone Angular components to dozens of product teams.',
      author: 'Daniel Osei',
      date: 'Sep 21, 2026',
      category: 'Engineering',
      likes: 86,
      comments: 12,
    },
    {
      title: 'Why Accessibility Should Ship First, Not Last',
      excerpt: 'Treating keyboard navigation and screen readers as a feature, not an afterthought.',
      author: 'Priya Rao',
      date: 'Sep 9, 2026',
      category: 'Accessibility',
      likes: 203,
      comments: 41,
    },
  ];

  author = {
    name: 'Maya Chen',
    bio: 'Product designer writing about design systems, accessibility, and the occasional side project.',
  };

  comments: PostComment[] = [
    { name: 'Jordan Blake', text: 'This finally convinced me to migrate our tokens off hardcoded hex values. Great breakdown.', time: '2 hours ago' },
    { name: 'Sofia Martins', text: 'Would love a follow-up on dark mode tokens specifically.', time: '5 hours ago' },
    { name: 'Ewan Clarke', text: 'Saved this for our next design review, thank you!', time: '1 day ago' },
  ];

  feedCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div class="block-hero-media">Cover image</div>
        <div class="template-profile-name">{{ post.title }}</div>
        <p>{{ post.excerpt }}</p>
        <div class="content-flex">
            <nx-avatar [name]="post.author" size="small"></nx-avatar>
            <span>{{ post.author }}</span>
            <span class="template-stat-label">{{ post.date }}</span>
        </div>
        <div class="content-flex">
            <nx-tag variant="outline">{{ post.category }}</nx-tag>
            <nx-icon icon="nx-heart" variant="svg" [size]="16"></nx-icon> {{ post.likes }}
            <nx-icon icon="nx-message" variant="svg" [size]="16"></nx-icon> {{ post.comments }}
        </div>
    </nx-card-content>
</nx-card>`;

  profileCode = `<div class="template-profile-header">
    <nx-avatar [name]="author.name" size="large"></nx-avatar>
    <div>
        <div class="template-profile-name">{{ author.name }}</div>
        <p>{{ author.bio }}</p>
    </div>
</div>
<nx-button variant="primary">Follow</nx-button>`;
}
