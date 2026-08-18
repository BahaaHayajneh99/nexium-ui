import { Component, EventEmitter, HostListener, Input, Output, booleanAttribute } from '@angular/core';

export interface NxCommandItem {
  id: string | number;
  label: string;
  shortcut?: string;
  group?: string;
}

@Component({
  selector: 'nx-command-palette',
  standalone: true,
  imports: [],
  templateUrl: './ui-command-palette.html',
  styleUrl: './ui-command-palette.scss',
})
export class UiCommandPalette {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() commands: NxCommandItem[] = [];
  @Input() placeholder = 'Type a command or search...';

  @Output() openChange = new EventEmitter<boolean>();
  @Output() execute = new EventEmitter<NxCommandItem>();

  query = '';
  activeIndex = 0;

  get filtered(): NxCommandItem[] {
    const query = this.query.toLowerCase().trim();
    if (!query) {
      return this.commands;
    }
    return this.commands.filter((c) => c.label.toLowerCase().includes(query));
  }

  isFirstInGroup(index: number): boolean {
    const list = this.filtered;
    return index === 0 || list[index].group !== list[index - 1].group;
  }

  onQueryChange(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
    this.activeIndex = 0;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.open) {
      return;
    }

    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, this.filtered.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = this.filtered[this.activeIndex];
      if (item) {
        this.select(item);
      }
    }
  }

  select(item: NxCommandItem): void {
    this.execute.emit(item);
    this.close();
  }

  onBackdropClick(): void {
    this.close();
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.query = '';
    this.activeIndex = 0;
  }
}
