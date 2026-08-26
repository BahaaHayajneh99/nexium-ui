import { Component, inject } from '@angular/core';
import { NX_EMOJI_CATEGORIES, NxEmoji } from '../../../../../dist/components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

interface EmojiEntry {
  key: string;
  name: string;
  category: string;
}

@Component({
  selector: 'app-emoji-demo',
  imports: [NxEmoji, DemoSection],
  templateUrl: './emoji-demo.html',
  styleUrl: './emoji-demo.scss',
})
export class EmojiDemo {
  public commonService = inject(CommonService);
  copiedKey: string | null = null;
  searchQuery = '';

  importCode = `import { NxEmoji } from 'nexium-ui';`;

  usageCode = `<nx-emoji emoji="fire"></nx-emoji>
<nx-emoji emoji="red-heart" [size]="32"></nx-emoji>`;

  emojis: EmojiEntry[] = NX_EMOJI_CATEGORIES.flatMap((group) =>
    group.keys.map((key) => ({
      key,
      name: key.replace(/-/g, ' '),
      category: group.category,
    })),
  );

  get filteredEmojis(): EmojiEntry[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return this.emojis;
    }
    return this.emojis.filter(
      (item) => item.key.includes(query) || item.category.toLowerCase().includes(query),
    );
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  copyEmoji(item: EmojiEntry): void {
    this.copiedKey = item.key;
    setTimeout(() => {
      if (this.copiedKey === item.key) {
        this.copiedKey = null;
      }
    }, 2000);

    navigator.clipboard.writeText(item.key).catch(() => this.copyWithFallback(item.key));
  }

  private copyWithFallback(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
