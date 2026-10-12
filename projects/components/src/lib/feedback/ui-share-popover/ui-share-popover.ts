import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxPopover } from '../ui-popover';
import { NxIcon } from '../../data-display/ui-icon';
import { NxCopyToClipboard } from '../../directives/nx-copy-to-clipboard';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxShareChannel = 'x' | 'linkedin' | 'email' | 'whatsapp';

interface NxShareChannelDef {
  key: NxShareChannel;
  label: string;
  icon: string;
  shareUrl(url: string, text: string): string;
}

/** Real, documented share-intent URL formats for each supported channel. */
const NX_SHARE_CHANNELS: NxShareChannelDef[] = [
  {
    key: 'x',
    label: 'X (Twitter)',
    icon: 'nx-x-twitter',
    shareUrl: (url, text) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}${text ? `&text=${encodeURIComponent(text)}` : ''}`,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    icon: 'nx-linkedin',
    shareUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    key: 'email',
    label: 'Email',
    icon: 'nx-mail',
    shareUrl: (url, text) => `mailto:?subject=${encodeURIComponent(text || 'Check this out')}&body=${encodeURIComponent(url)}`,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    icon: 'nx-whatsapp',
    shareUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(text ? `${text} ${url}` : url)}`,
  },
];

/**
 * A share popover: a read-only copy-the-link row with a "Copy" button, plus a
 * row of social/channel icon buttons that each open the right share-intent
 * URL in a new tab. Composes `nx-popover` directly for the trigger and
 * positioning, and `nxCopyToClipboard` for the copy row - this component only
 * supplies the share-specific content.
 */
@Component({
  selector: 'nx-share-popover',
  standalone: true,
  imports: [NxPopover, NxIcon, NxCopyToClipboard, NxProLocked],
  templateUrl: './ui-share-popover.html',
  styleUrl: './ui-share-popover.scss',
})
export class NxSharePopover {
  protected readonly licensed = nxProLicenseGranted();

  @Input({ required: true }) url = '';
  /** Optional pre-filled share text/title - used by channels whose share-intent URL supports one. */
  @Input() text = '';
  /** Subset of channel keys to show. Defaults to all supported channels. */
  @Input() channels: NxShareChannel[] = NX_SHARE_CHANNELS.map((channel) => channel.key);
  @Input() position: 'left' | 'right' = 'right';

  /** Fires with the copied URL whenever the "Copy" button successfully copies the link. */
  @Output() copied = new EventEmitter<string>();

  /** Briefly flips the Copy button to a "Copied" checkmark state. */
  copiedJustNow = false;

  get visibleChannels(): NxShareChannelDef[] {
    return NX_SHARE_CHANNELS.filter((channel) => this.channels.includes(channel.key));
  }

  shareHref(channel: NxShareChannelDef): string {
    return channel.shareUrl(this.url, this.text);
  }

  onCopied(value: string): void {
    this.copied.emit(value);
    this.copiedJustNow = true;
    setTimeout(() => (this.copiedJustNow = false), 2000);
  }
}
