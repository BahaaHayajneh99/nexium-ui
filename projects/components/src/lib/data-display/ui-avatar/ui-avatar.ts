import { booleanAttribute, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type NxAvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
export type NxAvatarShape = 'circle' | 'square' | 'rounded';
export type NxAvatarVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';
export type NxAvatarStatus = 'online' | 'offline' | 'busy' | 'away';

@Component({
  selector: 'nx-avatar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-avatar.html',
  styleUrl: './ui-avatar.scss',
})
export class NxAvatar {
  @Input()
  src?: string;

  @Input()
  alt = '';

  @Input()
  name = '';

  @Input()
  size: NxAvatarSize = 'medium';

  @Input()
  shape: NxAvatarShape = 'circle';

  @Input()
  variant: NxAvatarVariant = 'primary';

  @Input()
  status?: NxAvatarStatus;

  @Input({ transform: booleanAttribute })
  bordered = false;

  imageFailed = false;

  onImageError(): void {
    this.imageFailed = true;
  }

  get showImage(): boolean {
    return !!this.src && !this.imageFailed;
  }

  get initials(): string {
    if (!this.name) {
      return '';
    }

    const parts = this.name.trim().split(/\s+/).slice(0, 2);
    return parts.map((part) => part.charAt(0).toUpperCase()).join('');
  }

  get avatarClasses() {
    return {
      [this.size]: true,
      [this.shape]: true,
      [this.variant]: !this.showImage,
      bordered: this.bordered,
    };
  }
}
