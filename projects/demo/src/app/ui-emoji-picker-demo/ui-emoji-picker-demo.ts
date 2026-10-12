import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxEmojiPicker, NxEmoji, NxPopover } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-emoji-picker-demo',
  imports: [NxEmojiPicker, NxEmoji, NxPopover, DemoSection],
  templateUrl: './ui-emoji-picker-demo.html',
  styleUrl: './ui-emoji-picker-demo.scss',
})
export class UiEmojiPickerDemo {
  public commonService = inject(CommonService);

  importCode = `import { NxEmojiPicker } from 'nexium-ui';`;

  // The last emoji picked from any of the pickers below - shown in the
  // "last selected" readout so (emojiSelected) is visibly demonstrated.
  lastSelected = '';
  reactionSelected = '';

  basicCode = `<nx-emoji-picker (emojiSelected)="onEmojiSelected($event)"></nx-emoji-picker>`;

  basicTs = `lastSelected = '';

onEmojiSelected(name: string): void {
  this.lastSelected = name;
}`;

  popoverCode = `<!-- nx-emoji-picker is just the panel content - it doesn't manage its own
     open/closed state, so it's hosted inside the existing nx-popover here,
     the way a chat composer's reaction button would use it. -->
<nx-popover>
  <button nx-popover-trigger class="demo-btn">😊 React</button>
  <nx-emoji-picker (emojiSelected)="onReactionSelected($event)"></nx-emoji-picker>
</nx-popover>`;

  flatCode = `<nx-emoji-picker [showCategories]="false" (emojiSelected)="onEmojiSelected($event)"></nx-emoji-picker>`;

  onEmojiSelected(name: string): void {
    this.lastSelected = name;
  }

  onReactionSelected(name: string): void {
    this.reactionSelected = name;
  }
}
