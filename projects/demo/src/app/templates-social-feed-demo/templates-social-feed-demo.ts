import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxAvatar, NxTextarea, NxButton, NxIcon, NxTag } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface SocialPost {
  name: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  shares: number;
  hasMedia: boolean;
}

interface SuggestedPerson {
  name: string;
  bio: string;
}

@Component({
  selector: 'app-templates-social-feed-demo',
  imports: [NxCard, NxCardContent, NxAvatar, NxTextarea, NxButton, NxIcon, NxTag, DemoSection],
  templateUrl: './templates-social-feed-demo.html',
})
export class TemplatesSocialFeedDemo {
  currentUser = 'Jamie Rivera';

  posts: SocialPost[] = [
    {
      name: 'Leah Novak',
      time: '12m ago',
      text: 'Just shipped our new onboarding flow - feedback welcome!',
      likes: 42,
      comments: 8,
      shares: 3,
      hasMedia: true,
    },
    {
      name: 'Theo Park',
      time: '1h ago',
      text: 'Hot take: dark mode should be the default, not the afterthought.',
      likes: 118,
      comments: 34,
      shares: 12,
      hasMedia: false,
    },
    {
      name: 'Amara Diallo',
      time: '3h ago',
      text: 'Three months into learning Angular and standalone components finally clicked today.',
      likes: 67,
      comments: 15,
      shares: 5,
      hasMedia: false,
    },
  ];

  suggestedPeople: SuggestedPerson[] = [
    { name: 'Noah Bennett', bio: 'Frontend engineer - design systems' },
    { name: 'Isabela Cruz', bio: 'Product manager - fintech' },
    { name: 'Felix Grant', bio: 'Writes about remote work' },
    { name: 'Ren Okafor', bio: 'Indie hacker, building in public' },
  ];

  trendingTopics = ['#AngularTips', '#DesignSystems', '#RemoteWork', '#BuildInPublic'];

  composerCode = `<div class="content-flex">
    <nx-avatar [name]="currentUser" size="medium"></nx-avatar>
    <nx-textarea placeholder="What's on your mind?" [rows]="2"></nx-textarea>
</div>
<nx-button variant="primary">Post</nx-button>`;

  feedCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div class="content-flex">
            <nx-avatar [name]="post.name" size="medium"></nx-avatar>
            <div>
                <div class="template-profile-name">{{ post.name }}</div>
                <span class="template-stat-label">{{ post.time }}</span>
            </div>
        </div>
        <p>{{ post.text }}</p>
        <nx-button variant="ghost">
            <nx-icon icon="nx-heart" variant="svg" [size]="16"></nx-icon> {{ post.likes }}
        </nx-button>
        <nx-button variant="ghost">
            <nx-icon icon="nx-message" variant="svg" [size]="16"></nx-icon> {{ post.comments }}
        </nx-button>
        <nx-button variant="ghost">
            <nx-icon icon="nx-share" variant="svg" [size]="16"></nx-icon> {{ post.shares }}
        </nx-button>
    </nx-card-content>
</nx-card>`;

  suggestionsCode = `<div class="content-flex">
    <nx-avatar [name]="person.name" size="small"></nx-avatar>
    <div>
        <div class="template-profile-name">{{ person.name }}</div>
        <span class="template-stat-label">{{ person.bio }}</span>
    </div>
    <nx-button variant="secondary" size="small">Follow</nx-button>
</div>`;
}
