import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
} from '@angular/core';

export type NxTagVariant = 'solid' | 'outline';

@Component({
  selector: 'nx-tag',
  standalone: true,
  imports: [],
  templateUrl: './ui-tag.html',
  styleUrl: './ui-tag.scss',
})
export class UiTag implements OnChanges, AfterViewInit {
  /** Any valid CSS color (hex, rgb(), a named color, or a CSS custom property) - not limited to a fixed variant palette. */
  @Input() color = 'var(--shell-text-muted)';
  @Input() variant: NxTagVariant = 'solid';
  @Input({ transform: booleanAttribute }) closable = false;
  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() closed = new EventEmitter<void>();

  @ViewChild('swatch', { static: true }) private swatchRef!: ElementRef<HTMLElement>;

  /** Auto-computed (WCAG relative luminance) black/white text so a `solid` tag stays readable for any background color. */
  computedTextColor = '#ffffff';

  ngAfterViewInit(): void {
    this.updateContrastColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['color'] || changes['variant']) {
      queueMicrotask(() => this.updateContrastColor());
    }
  }

  onClose(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.closed.emit();
    }
  }

  private updateContrastColor(): void {
    if (!this.swatchRef || this.variant === 'outline') {
      return;
    }

    const resolved = getComputedStyle(this.swatchRef.nativeElement).backgroundColor;
    const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(resolved);
    if (!match) {
      return;
    }

    const [r, g, b] = [match[1], match[2], match[3]].map((channel) => {
      const value = Number(channel) / 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    this.computedTextColor = luminance > 0.5 ? '#1a1a1a' : '#ffffff';
  }
}
