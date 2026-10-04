import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxThemeTokens {
  primaryColor: string;
  radius: number;
  fontFamily: string;
}

/** Edits a small set of theme tokens (primary color, radius, font) against a self-contained live preview panel. */
@Component({
  selector: 'nx-theme-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-theme-editor.html',
  styleUrl: './ui-theme-editor.scss',
})
export class NxThemeEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: NxThemeTokens = { primaryColor: '#3b82f6', radius: 8, fontFamily: 'Inter, sans-serif' };

  @Output() valueChange = new EventEmitter<NxThemeTokens>();

  readonly fontOptions = ['Inter, sans-serif', 'Georgia, serif', 'JetBrains Mono, monospace', 'Arial, sans-serif'];

  update(patch: Partial<NxThemeTokens>): void {
    this.value = { ...this.value, ...patch };
    this.valueChange.emit(this.value);
  }
}
