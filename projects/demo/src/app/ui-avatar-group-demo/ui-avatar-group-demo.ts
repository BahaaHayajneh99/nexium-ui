import { Component, inject } from '@angular/core';
import { NxAvatarGroup, NxAvatarGroupUser } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-avatar-group-demo',
  imports: [NxAvatarGroup, DemoSection],
  templateUrl: './ui-avatar-group-demo.html',
  styleUrl: './ui-avatar-group-demo.scss',
})
export class UiAvatarGroupDemo {
  importCode = `import { NxAvatarGroup } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicUsers: NxAvatarGroupUser[] = [
    { name: 'Ava Thompson', src: 'https://i.pravatar.cc/150?img=5', status: 'online' },
    { name: 'Liam Carter', src: 'https://i.pravatar.cc/150?img=12', status: 'busy' },
    { name: 'Noah Bennett' },
    { name: 'Mia Johnson', src: 'https://i.pravatar.cc/150?img=47', status: 'away' },
    { name: 'Olivia Reyes' },
    { name: 'Ethan Walsh', src: 'https://i.pravatar.cc/150?img=33', status: 'offline' },
    { name: 'Sophia Brooks', src: 'https://i.pravatar.cc/150?img=24' },
  ];

  overflowUsers: NxAvatarGroupUser[] = this.basicUsers;

  lastOverflowClick = '';

  basicCode = `<nx-avatar-group [users]="basicUsers" size="medium"></nx-avatar-group>`;

  basicTs = `basicUsers: NxAvatarGroupUser[] = [
  { name: 'Ava Thompson', src: 'https://i.pravatar.cc/150?img=5', status: 'online' },
  { name: 'Liam Carter', src: 'https://i.pravatar.cc/150?img=12', status: 'busy' },
  { name: 'Noah Bennett' },
  { name: 'Mia Johnson', src: 'https://i.pravatar.cc/150?img=47', status: 'away' },
  { name: 'Olivia Reyes' },
  { name: 'Ethan Walsh', src: 'https://i.pravatar.cc/150?img=33', status: 'offline' },
  { name: 'Sophia Brooks', src: 'https://i.pravatar.cc/150?img=24' },
];`;

  overflowCode = `<nx-avatar-group [users]="overflowUsers" [max]="3" (overflowClick)="onOverflowClick()"></nx-avatar-group>`;

  overflowTs = `onOverflowClick(): void {
  // Called when the "+N" chip is clicked - open a full member list, for example.
}`;

  onOverflowClick(): void {
    this.lastOverflowClick = `Overflow chip clicked - ${this.overflowUsers.length - 3} more members hidden.`;
  }
}
