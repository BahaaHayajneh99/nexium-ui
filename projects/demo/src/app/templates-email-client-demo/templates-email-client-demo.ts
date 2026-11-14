import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxAvatar, NxBadge, NxButton, NxIcon } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface EmailRow {
  sender: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}

@Component({
  selector: 'app-templates-email-client-demo',
  imports: [NxCard, NxCardContent, NxAvatar, NxBadge, NxButton, NxIcon, DemoSection],
  templateUrl: './templates-email-client-demo.html',
})
export class TemplatesEmailClientDemo {
  emails: EmailRow[] = [
    { sender: 'Grace Hopper', subject: 'Q3 roadmap review', preview: 'Sending over the updated slides ahead of tomorrow\'s sync...', time: '9:12 AM', unread: true },
    { sender: 'GitHub', subject: '[nexium-ui] New pull request #482', preview: 'BahaaHayajneh17 opened a pull request: Add Templates gallery...', time: '8:47 AM', unread: true },
    { sender: 'Alan Turing', subject: 'Re: Interview scheduling', preview: 'Thursday at 2pm works well on my end, see you then.', time: 'Yesterday', unread: false },
    { sender: 'Ada Lovelace', subject: 'Design review feedback', preview: 'Left a few comments on the pricing page mockups, mostly...', time: 'Yesterday', unread: true },
    { sender: 'Billing', subject: 'Your invoice is ready', preview: 'Your October invoice for the Pro plan is now available.', time: 'Mon', unread: false },
    { sender: 'Margaret Hamilton', subject: 'Onboarding checklist', preview: 'Here is the checklist we discussed for new engineers...', time: 'Mon', unread: false },
  ];

  openEmail = {
    senderName: 'Grace Hopper',
    senderEmail: 'grace.hopper@initech.com',
    subject: 'Q3 roadmap review',
    paragraphs: [
      'Hi team, sending over the updated slides ahead of tomorrow\'s sync so everyone has a chance to skim them beforehand.',
      'The main change from last quarter is that we are pulling the analytics dashboard work forward and pushing the mobile app refresh to Q4 - happy to talk through the reasoning on the call.',
      'Let me know if anything looks off before then. Thanks!',
    ],
  };

  inboxCode = `<div>
    @for (email of emails; track email.subject) {
        <div class="template-setting-row">
            <div>
                <div [style.font-weight]="email.unread ? 700 : 400">
                    @if (email.unread) {
                        <nx-badge variant="primary" dot></nx-badge>
                    }
                    {{ email.sender }} - {{ email.subject }}
                </div>
                <div class="template-stat-label">{{ email.preview }}</div>
            </div>
            <span class="template-stat-label">{{ email.time }}</span>
        </div>
    }
</div>`;

  previewCode = `<nx-card variant="outlined">
    <nx-card-content>
        <div class="template-profile-header">
            <nx-avatar [name]="openEmail.senderName" size="medium"></nx-avatar>
            <div>
                <div class="template-profile-name">{{ openEmail.senderName }}</div>
                <div class="template-stat-label">{{ openEmail.senderEmail }}</div>
            </div>
        </div>
        <h3 class="mt-3">{{ openEmail.subject }}</h3>
        @for (paragraph of openEmail.paragraphs; track paragraph) {
            <p class="mt-2">{{ paragraph }}</p>
        }
        <div class="mt-3" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <nx-button variant="primary" size="small"><nx-icon icon="nx-send" [size]="16"></nx-icon> Reply</nx-button>
            <nx-button variant="outline" size="small"><nx-icon icon="nx-share" [size]="16"></nx-icon> Forward</nx-button>
            <nx-button variant="outline" size="small"><nx-icon icon="nx-folder" [size]="16"></nx-icon> Archive</nx-button>
            <nx-button variant="outline" size="small"><nx-icon icon="nx-trash" [size]="16"></nx-icon> Delete</nx-button>
        </div>
    </nx-card-content>
</nx-card>`;
}
