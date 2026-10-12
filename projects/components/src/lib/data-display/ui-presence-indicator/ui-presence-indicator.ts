import { Component, Input, booleanAttribute } from '@angular/core';
import {
  NxAvatar,
  NxAvatarShape,
  NxAvatarSize,
  NxAvatarVariant,
} from '../ui-avatar/ui-avatar';

/**
 * User presence/online status - the real-world states shown next to a person
 * in a chat or collaboration app (Slack/Discord/Teams style), as opposed to
 * `NxStatusIndicator`'s generic success/warning/danger/info/neutral variants.
 */
export type NxPresenceStatus = 'online' | 'away' | 'busy' | 'offline';

/**
 * `standalone` renders just the dot (+ optional label). `avatar` overlays the
 * dot in the bottom-right corner of an avatar.
 */
export type NxPresenceMode = 'standalone' | 'avatar';

const NX_PRESENCE_DEFAULT_LABELS: Record<NxPresenceStatus, string> = {
  online: 'Online',
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
};

/**
 * A user online/presence status dot - green (online), yellow/orange (away),
 * red (busy / do-not-disturb) or gray (offline). Use it standalone, or set
 * `mode="avatar"` to overlay it on an avatar: pass `avatarUrl`/`avatarName`
 * to have it render an internal `<nx-avatar>`, or project your own avatar
 * markup (an `<img>`, initials, an icon, ...) via content projection and it
 * will still position the dot in the bottom-right corner.
 */
@Component({
  selector: 'nx-presence-indicator',
  standalone: true,
  imports: [NxAvatar],
  templateUrl: './ui-presence-indicator.html',
  styleUrl: './ui-presence-indicator.scss',
})
export class NxPresenceIndicator {
  /** Presence state to display. */
  @Input() status: NxPresenceStatus = 'offline';

  /** `standalone` (just the dot) or `avatar` (overlaid on an avatar). */
  @Input() mode: NxPresenceMode = 'standalone';

  /** Custom label text; defaults to a status-derived label ("Online", "Away", ...). */
  @Input() label = '';

  /** Renders the text label next to the dot. */
  @Input({ transform: booleanAttribute }) showLabel = false;

  /** Adds a subtle animated pulse ring - typically used for `online`. */
  @Input({ transform: booleanAttribute }) pulse = false;

  // Avatar overlay mode - forwarded to the internal `<nx-avatar>` when either
  // `avatarUrl` or `avatarName` is set. Leave both empty and project your own
  // avatar markup via content projection instead.
  @Input() avatarUrl?: string;
  @Input() avatarAlt = '';
  @Input() avatarName = '';
  @Input() avatarSize: NxAvatarSize = 'medium';
  @Input() avatarShape: NxAvatarShape = 'circle';
  @Input() avatarVariant: NxAvatarVariant = 'primary';

  get displayLabel(): string {
    return this.label || NX_PRESENCE_DEFAULT_LABELS[this.status];
  }

  get hasAvatarInputs(): boolean {
    return !!this.avatarUrl || !!this.avatarName;
  }
}
