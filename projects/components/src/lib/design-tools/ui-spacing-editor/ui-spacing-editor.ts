import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxBoxModelSides {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface NxSpacingValue {
  margin: NxBoxModelSides;
  padding: NxBoxModelSides;
}

/** A DevTools-style nested box-model editor for margin and padding, edited directly on the diagram. */
@Component({
  selector: 'nx-spacing-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-spacing-editor.html',
  styleUrl: './ui-spacing-editor.scss',
})
export class NxSpacingEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() value: NxSpacingValue = {
    margin: { top: 16, right: 16, bottom: 16, left: 16 },
    padding: { top: 12, right: 12, bottom: 12, left: 12 },
  };

  @Output() valueChange = new EventEmitter<NxSpacingValue>();

  setMargin(side: keyof NxBoxModelSides, amount: number): void {
    this.emit({ ...this.value, margin: { ...this.value.margin, [side]: amount } });
  }

  setPadding(side: keyof NxBoxModelSides, amount: number): void {
    this.emit({ ...this.value, padding: { ...this.value.padding, [side]: amount } });
  }

  private emit(next: NxSpacingValue): void {
    this.value = next;
    this.valueChange.emit(next);
  }
}
