import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NX_ICONS } from './nx-icons';

export type NxIconVariant = 'svg' | 'icon';

@Component({
  selector: 'nx-icon',
  standalone: true,
  templateUrl: './ui-icon.html',
  styleUrl: './ui-icon.scss',
})
export class UiIcon {
  @Input({ required: true })
  icon = '';

  @Input()
  variant: NxIconVariant = 'icon';

  @Input()
  size: number | string = 24;

  @Input()
  color?: string;

  @HostBinding('style.color')
  get hostColor(): string | null {
    return this.color ?? null;
  }

  constructor(private readonly sanitizer: DomSanitizer) {}

  get sizeValue(): string {
    return typeof this.size === 'number' ? `${this.size}px` : this.size;
  }

  get svgMarkup(): SafeHtml {
    const raw = NX_ICONS[this.icon] ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(raw);
  }
}
