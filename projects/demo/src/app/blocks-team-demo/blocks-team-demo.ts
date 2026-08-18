import { Component } from '@angular/core';
import { UiAvatar, UiCard, UiCardContent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-blocks-team-demo',
  imports: [UiAvatar, UiCard, UiCardContent, DemoSection],
  templateUrl: './blocks-team-demo.html',
})
export class BlocksTeamDemo {
  team = [
    { name: 'Ada Lovelace', role: 'Founder & Engineer' },
    { name: 'Grace Hopper', role: 'Head of Product' },
    { name: 'Alan Turing', role: 'Lead Designer' },
    { name: 'Margaret Hamilton', role: 'Engineering Manager' },
  ];

  code = `<div class="grid-3">
    @for (member of team; track member.name) {
        <nx-card variant="outlined">
            <nx-card-content style="text-align: center;">
                <nx-avatar [name]="member.name" size="large"></nx-avatar>
                <div class="profile-name">{{ member.name }}</div>
                <div class="profile-role">{{ member.role }}</div>
            </nx-card-content>
        </nx-card>
    }
</div>`;

  tsCode = `team = [
  { name: 'Ada Lovelace', role: 'Founder & Engineer' },
  { name: 'Grace Hopper', role: 'Head of Product' },
  { name: 'Alan Turing', role: 'Lead Designer' },
  { name: 'Margaret Hamilton', role: 'Engineering Manager' },
];`;
}
