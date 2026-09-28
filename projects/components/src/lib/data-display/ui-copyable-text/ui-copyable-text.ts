import { Component, Input, booleanAttribute, signal } from '@angular/core';

/** An inline value (an API key, a command, an id, ...) with a one-click copy button. */
@Component({
  selector: 'nx-copyable-text',
  standalone: true,
  imports: [],
  templateUrl: './ui-copyable-text.html',
  styleUrl: './ui-copyable-text.scss',
})
export class NxCopyableText {
  @Input() text = '';
  @Input() label = '';
  @Input({ transform: booleanAttribute }) mono = true;

  copied = signal(false);

  copy(): void {
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    navigator.clipboard?.writeText(this.text).catch(() => {});
  }
}
