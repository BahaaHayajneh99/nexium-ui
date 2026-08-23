import { Component, ElementRef, HostListener } from '@angular/core';
import { NxColorPicker, NxIcon } from 'components';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-customizer',
  imports: [NxColorPicker, NxIcon],
  templateUrl: './theme-customizer.html',
  styleUrl: './theme-customizer.scss',
})
export class ThemeCustomizer {
  open = false;

  readonly presets = [
    '#3498db', '#4a3aa7', '#1baf7a', '#e34948',
    '#eb6834', '#e87ba4', '#17a2b8', '#212529',
  ];

  constructor(readonly theme: ThemeService, private elementRef: ElementRef<HTMLElement>) {}

  toggle(): void {
    this.open = !this.open;
  }

  onColorChange(hex: string): void {
    this.theme.setPrimaryColor(hex);
  }

  reset(): void {
    this.theme.resetPrimaryColor();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
