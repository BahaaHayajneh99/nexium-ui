import { Component, Input } from '@angular/core';
import { NX_EMOJIS } from './nx-emojis';

@Component({
  selector: 'nx-emoji',
  standalone: true,
  templateUrl: './ui-emoji.html',
  styleUrl: './ui-emoji.scss',
})
export class NxEmoji {
  /** The emoji's kebab-case name, e.g. `fire`, `red-heart`, `grinning-face`. */
  @Input({ required: true })
  emoji = '';

  @Input()
  size: number | string = 24;

  get sizeValue(): string {
    return typeof this.size === 'number' ? `${this.size}px` : this.size;
  }

  get glyph(): string {
    return NX_EMOJIS[this.emoji] ?? '';
  }
}
