import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxPropertyType = 'text' | 'number' | 'color' | 'boolean' | 'select';

export interface NxPropertySelectOption {
  label: string;
  value: string;
}

export interface NxPropertyDef {
  key: string;
  label: string;
  type: NxPropertyType;
  unit?: string;
  options?: NxPropertySelectOption[];
}

export interface NxPropertyEditorChangeEvent {
  key: string;
  value: unknown;
}

/** A Figma/VS-Code-style properties panel: label/control rows driven by a typed property schema. */
@Component({
  selector: 'nx-property-editor',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-property-editor.html',
  styleUrl: './ui-property-editor.scss',
})
export class NxPropertyEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() properties: NxPropertyDef[] = [];
  @Input() values: Record<string, unknown> = {};

  @Output() valuesChange = new EventEmitter<Record<string, unknown>>();
  @Output() propertyChange = new EventEmitter<NxPropertyEditorChangeEvent>();

  setValue(key: string, value: unknown): void {
    const next = { ...this.values, [key]: value };
    this.values = next;
    this.valuesChange.emit(next);
    this.propertyChange.emit({ key, value });
  }
}
