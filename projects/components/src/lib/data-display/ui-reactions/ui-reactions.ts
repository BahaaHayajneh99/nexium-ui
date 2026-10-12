import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { NxEmoji } from '../ui-emoji';
import { NxIcon } from '../ui-icon';
import { NxTooltip } from '../../feedback/ui-tooltip';
import { NxClickOutside } from '../../directives/nx-click-outside';

/** A single emoji reaction shown on a piece of content (message, comment, post, etc.). */
export interface NxReaction {
  /** Kebab-case emoji name matching `NxEmoji`'s registry, e.g. `fire`, `red-heart`. */
  emoji: string;
  /** Total number of people who reacted with this emoji. */
  count: number;
  /** Whether the current user is among the reactors for this emoji. */
  reactedByMe: boolean;
  /** Optional display names of reactors, shown in a tooltip on hover. */
  reactors?: string[];
}

/** Emitted when the current user toggles a reaction on or off. */
export interface NxReactionToggleEvent {
  /** The kebab-case emoji name that was toggled. */
  emoji: string;
  /** The new state for the current user - true if they just added it, false if they removed it. */
  reacted: boolean;
}

/**
 * A small curated set of common quick-reaction emoji offered by the "add reaction"
 * picker - not the full `NX_EMOJIS` registry, just the handful people reach for most
 * (thumbs up/down, heart, laugh, surprise, celebrate, rocket, eyes, clap, fire).
 * All of these exist in `NX_EMOJIS` - see `ui-emoji/nx-emojis.ts`.
 */
export const NX_QUICK_REACTION_EMOJIS: string[] = [
  'thumbs-up',
  'thumbs-down',
  'red-heart',
  'face-with-tears-of-joy',
  'astonished-face',
  'party-popper',
  'rocket',
  'eyes',
  'clapping-hands',
  'fire',
];

/**
 * An emoji-reaction bar for a piece of content - a row of emoji + counts shown
 * under a chat message, comment or post (Slack/GitHub-style). Purely presentational
 * and `@Input()`-driven: clicking a pill or picking a new emoji never mutates state
 * internally, it only emits `reactionToggled` so the host can persist the change
 * and pass updated `reactions` back down.
 */
@Component({
  selector: 'nx-reactions',
  standalone: true,
  imports: [NxEmoji, NxIcon, NxTooltip, NxClickOutside],
  templateUrl: './ui-reactions.html',
  styleUrl: './ui-reactions.scss',
})
export class NxReactions {
  /** The reactions currently on this content, one entry per emoji that has at least one reactor. */
  @Input() reactions: NxReaction[] = [];

  /** The quick-pick emoji offered by the "add reaction" picker. Defaults to `NX_QUICK_REACTION_EMOJIS`. */
  @Input() quickEmojis: string[] = NX_QUICK_REACTION_EMOJIS;

  /** Disables all interaction - pills and the add-reaction button become inert. */
  @Input({ transform: booleanAttribute })
  disabled = false;

  /** Whether to show the "+" add-reaction affordance. */
  @Input({ transform: booleanAttribute })
  showAddButton = true;

  /** Size (px or CSS length) of each emoji glyph, passed through to `nx-emoji`. */
  @Input()
  emojiSize: number | string = 16;

  /** Fires whenever the current user toggles a reaction - on an existing pill, or via the picker. */
  @Output()
  reactionToggled = new EventEmitter<NxReactionToggleEvent>();

  pickerOpen = false;

  togglePicker(): void {
    if (this.disabled) {
      return;
    }
    this.pickerOpen = !this.pickerOpen;
  }

  closePicker(): void {
    this.pickerOpen = false;
  }

  /** Toggles the current user's own reaction for an existing pill. */
  toggleReaction(reaction: NxReaction): void {
    if (this.disabled) {
      return;
    }
    this.reactionToggled.emit({ emoji: reaction.emoji, reacted: !reaction.reactedByMe });
  }

  /** Picks an emoji from the "add reaction" picker - toggles it if it's already a pill, otherwise starts a brand-new reaction. */
  pickEmoji(emoji: string): void {
    this.closePicker();
    if (this.disabled) {
      return;
    }
    const existing = this.reactions.find((reaction) => reaction.emoji === emoji);
    this.reactionToggled.emit({ emoji, reacted: existing ? !existing.reactedByMe : true });
  }

  /** Whether the current user has already reacted with this quick-pick emoji (highlights it in the picker). */
  isReactedQuick(emoji: string): boolean {
    return this.reactions.some((reaction) => reaction.emoji === emoji && reaction.reactedByMe);
  }

  /** Builds the hover tooltip text listing who reacted, or '' (no tooltip) when reactor names weren't provided. */
  tooltipFor(reaction: NxReaction): string {
    if (!reaction.reactors?.length) {
      return '';
    }
    return reaction.reactors.join(', ');
  }

  trackByEmoji(_index: number, reaction: NxReaction): string {
    return reaction.emoji;
  }
}
