import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxAvatar, NxAvatarStatus } from '../ui-avatar';

export type NxAvatarGroupSize = 'small' | 'medium' | 'large';

export interface NxAvatarGroupUser {
  name: string;
  src?: string;
  status?: NxAvatarStatus;
}

@Component({
  selector: 'nx-avatar-group',
  standalone: true,
  imports: [NxAvatar],
  templateUrl: './ui-avatar-group.html',
  styleUrl: './ui-avatar-group.scss',
})
export class NxAvatarGroup {
  @Input()
  users: NxAvatarGroupUser[] = [];

  @Input()
  max = 5;

  @Input()
  size: NxAvatarGroupSize = 'medium';

  @Output()
  overflowClick = new EventEmitter<void>();

  get visibleUsers(): NxAvatarGroupUser[] {
    return this.users.slice(0, this.max);
  }

  get overflowCount(): number {
    return this.users.length > this.max ? this.users.length - this.max : 0;
  }

  onOverflowClick(): void {
    this.overflowClick.emit();
  }
}
