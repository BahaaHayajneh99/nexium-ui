import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxFileUpload } from '../../uploads/ui-file-upload';
import { NxStepper, NxStep } from '../../navigation/ui-stepper';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxImportField {
  key: string;
  label: string;
  required?: boolean;
}

export interface NxImportConfirmedEvent {
  mapping: Record<string, string | null>;
  /** Every parsed row (not just the previewed subset) - the consumer persists these. */
  rows: Record<string, string>[];
}

interface NxImportParsedData {
  headers: string[];
  rows: Record<string, string>[];
}

const WIZARD_STEPS: NxStep[] = [
  { label: 'Upload' },
  { label: 'Map columns' },
  { label: 'Review' },
  { label: 'Done' },
];

const PREVIEW_ROW_COUNT = 5;

/**
 * A 4-step wizard for importing tabular data (e.g. "import contacts from CSV"):
 * upload a file, map its detected columns onto a target schema, review a preview
 * with validation problems flagged, then confirm. This library ships no CSV/Excel
 * parser - the consumer supplies `parseFile` to turn a `File` into headers/rows.
 */
@Component({
  selector: 'nx-data-import-wizard',
  standalone: true,
  imports: [NxProLocked, NxFileUpload, NxStepper, NxIcon],
  templateUrl: './ui-data-import-wizard.html',
  styleUrl: './ui-data-import-wizard.scss',
})
export class NxDataImportWizard {
  protected readonly licensed = nxProLicenseGranted();

  @Input() targetFields: NxImportField[] = [];
  /**
   * Parses a `File` into a header row + record rows. This library has no CSV/Excel
   * parsing dependency, so the consumer provides the real implementation (e.g. with
   * a CSV-parsing library of their choice). If left unset, the upload step shows an
   * inline "No parseFile function was provided" message instead of calling it blindly.
   */
  @Input() parseFile: (file: File) => Promise<NxImportParsedData> = null!;

  @Output() importConfirmed = new EventEmitter<NxImportConfirmedEvent>();
  @Output() cancelled = new EventEmitter<void>();

  protected readonly steps = WIZARD_STEPS;
  /** 1-based step number: 1 Upload, 2 Map columns, 3 Review, 4 Done. */
  protected readonly currentStep = signal(1);
  protected readonly maxStepReached = signal(1);
  protected readonly stepperIndex = computed(() => this.currentStep() - 1);

  protected readonly parsing = signal(false);
  protected readonly parseError = signal<string | null>(null);
  protected readonly selectedFileName = signal<string | null>(null);

  protected readonly headers = signal<string[]>([]);
  protected readonly rows = signal<Record<string, string>[]>([]);

  protected mapping: Record<string, string | null> = {};

  onFilesSelected(files: File[]): void {
    const file = files[0];
    if (!file) {
      return;
    }

    this.selectedFileName.set(file.name);

    if (!this.parseFile) {
      this.parseError.set(
        'No parseFile function was provided. Pass a `parseFile` input - this library has no built-in CSV/Excel parser.',
      );
      return;
    }

    this.parseError.set(null);
    this.parsing.set(true);
    this.parseFile(file)
      .then(({ headers, rows }) => {
        this.headers.set(headers);
        this.rows.set(rows);
        this.mapping = this.buildInitialMapping(headers);
        this.advanceTo(2);
      })
      .catch((error: unknown) => {
        this.parseError.set(error instanceof Error ? error.message : 'Failed to parse the selected file.');
      })
      .finally(() => this.parsing.set(false));
  }

  private buildInitialMapping(headers: string[]): Record<string, string | null> {
    const mapping: Record<string, string | null> = {};
    for (const field of this.targetFields) {
      const match = headers.find(
        (header) => header.toLowerCase() === field.label.toLowerCase() || header.toLowerCase() === field.key.toLowerCase(),
      );
      mapping[field.key] = match ?? null;
    }
    return mapping;
  }

  onMappingSelect(fieldKey: string, event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.mapping = { ...this.mapping, [fieldKey]: value || null };
  }

  onStepperNav(index: number): void {
    const step = index + 1;
    // Only allow jumping to a step already reached - stops the user skipping ahead
    // of an upload/mapping that hasn't happened yet.
    if (step <= this.maxStepReached()) {
      this.currentStep.set(step);
    }
  }

  goToMapping(): void {
    this.advanceTo(2);
  }

  goToReview(): void {
    this.advanceTo(3);
  }

  backToUpload(): void {
    this.currentStep.set(1);
  }

  backToMapping(): void {
    this.currentStep.set(2);
  }

  private advanceTo(step: number): void {
    this.currentStep.set(step);
    if (step > this.maxStepReached()) {
      this.maxStepReached.set(step);
    }
  }

  get previewRows(): Record<string, string>[] {
    return this.rows().slice(0, PREVIEW_ROW_COUNT);
  }

  cellValue(row: Record<string, string>, fieldKey: string): string | null {
    const sourceHeader = this.mapping[fieldKey];
    if (!sourceHeader) {
      return null;
    }
    const value = row[sourceHeader];
    return value != null && value !== '' ? value : null;
  }

  isMissingRequired(row: Record<string, string>, field: NxImportField): boolean {
    return !!field.required && this.cellValue(row, field.key) == null;
  }

  rowHasProblem(row: Record<string, string>): boolean {
    return this.targetFields.some((field) => this.isMissingRequired(row, field));
  }

  get invalidRowCount(): number {
    return this.rows().filter((row) => this.rowHasProblem(row)).length;
  }

  confirmImport(): void {
    this.importConfirmed.emit({ mapping: this.mapping, rows: this.rows() });
    this.advanceTo(4);
  }

  cancel(): void {
    this.cancelled.emit();
  }

  startOver(): void {
    this.currentStep.set(1);
    this.maxStepReached.set(1);
    this.selectedFileName.set(null);
    this.headers.set([]);
    this.rows.set([]);
    this.mapping = {};
    this.parseError.set(null);
  }
}
