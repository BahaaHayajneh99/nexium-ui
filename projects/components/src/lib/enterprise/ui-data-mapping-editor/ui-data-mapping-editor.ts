import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxMappingField {
  key: string;
  label: string;
  required?: boolean;
}

/**
 * A two-column "match your columns" editor for mapping imported source fields (e.g. CSV headers)
 * onto a fixed set of target schema fields - each target field gets a dropdown of which source
 * field feeds it, plus a status indicator for whether every required target field is mapped.
 */
@Component({
  selector: 'nx-data-mapping-editor',
  standalone: true,
  imports: [NxProLocked, NgIf, NgFor],
  templateUrl: './ui-data-mapping-editor.html',
  styleUrl: './ui-data-mapping-editor.scss',
})
export class NxDataMappingEditor {
  protected readonly licensed = nxProLicenseGranted();

  @Input() sourceFields: NxMappingField[] = [];
  @Input() targetFields: NxMappingField[] = [];
  /** Keyed by `targetField.key` -> the chosen `sourceField.key` (or null/unset). */
  @Input() mapping: Record<string, string | null> = {};

  @Output() mappingChange = new EventEmitter<Record<string, string | null>>();

  onMapChange(targetKey: string, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const next: Record<string, string | null> = { ...this.mapping, [targetKey]: value || null };
    this.mapping = next;
    this.mappingChange.emit(next);
  }

  isMapped(targetKey: string): boolean {
    return !!this.mapping[targetKey];
  }

  get requiredFields(): NxMappingField[] {
    return this.targetFields.filter((field) => field.required);
  }

  get mappedRequiredCount(): number {
    return this.requiredFields.filter((field) => this.isMapped(field.key)).length;
  }

  get allRequiredMapped(): boolean {
    return this.requiredFields.length > 0 && this.mappedRequiredCount === this.requiredFields.length;
  }

  trackByFieldKey(index: number, field: NxMappingField): string {
    return field.key;
  }
}
