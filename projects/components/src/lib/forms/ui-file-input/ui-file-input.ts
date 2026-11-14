import { Component, EventEmitter, Input, Output, booleanAttribute, numberAttribute, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A single (non-drag-and-drop) file input styled like the library's other form fields, with
 * client-side validation and inline error messages. Picking files validates each one against
 * `accept` (extension/mime check), `maxSizeMb`, and the combined count against `maxFiles`; the
 * accepted list and specific rejection reasons are both shown inline. `filesChange` always carries
 * only the currently-valid file list; `validChange` reflects whether the field as a whole currently
 * satisfies `isRequired` and has no pending errors.
 */
@Component({
  selector: 'nx-file-input',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-file-input.html',
  styleUrl: './ui-file-input.scss',
})
export class NxFileInput {
  protected readonly licensed = nxProLicenseGranted();

  @Input() label = '';
  @Input() accept = '*';
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input({ transform: numberAttribute }) maxSizeMb = 5;
  @Input({ transform: numberAttribute }) maxFiles = 5;
  @Input({ transform: booleanAttribute }) isRequired = false;

  @Output() filesChange = new EventEmitter<File[]>();
  @Output() validChange = new EventEmitter<boolean>();

  protected readonly acceptedFiles = signal<File[]>([]);
  protected readonly errors = signal<string[]>([]);

  private matchesAccept(file: File): boolean {
    const patterns = this.accept
      .split(',')
      .map((p) => p.trim().toLowerCase())
      .filter(Boolean);
    if (patterns.length === 0 || patterns.includes('*')) {
      return true;
    }
    const name = file.name.toLowerCase();
    const type = (file.type || '').toLowerCase();
    return patterns.some((pattern) => {
      if (pattern.startsWith('.')) {
        return name.endsWith(pattern);
      }
      if (pattern.endsWith('/*')) {
        return type.startsWith(pattern.slice(0, -1));
      }
      return type === pattern;
    });
  }

  private validateFile(file: File): string | null {
    if (!this.matchesAccept(file)) {
      return `${file.name} is not an accepted file type`;
    }
    if (file.size > this.maxSizeMb * 1024 * 1024) {
      return `${file.name} exceeds ${this.maxSizeMb}MB`;
    }
    return null;
  }

  private isFieldValid(): boolean {
    if (this.errors().length > 0) {
      return false;
    }
    if (this.isRequired && this.acceptedFiles().length === 0) {
      return false;
    }
    return true;
  }

  private emitState(): void {
    this.filesChange.emit(this.acceptedFiles());
    this.validChange.emit(this.isFieldValid());
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selected = Array.from(input.files ?? []);
    // Reset so picking the exact same file again still fires a change event.
    input.value = '';
    if (selected.length === 0) {
      return;
    }

    const accepted = [...this.acceptedFiles()];
    const newErrors: string[] = [];

    for (const file of selected) {
      if (accepted.length >= this.maxFiles) {
        newErrors.push(`${file.name} was not added - maximum of ${this.maxFiles} file${this.maxFiles === 1 ? '' : 's'} reached`);
        continue;
      }
      const error = this.validateFile(file);
      if (error) {
        newErrors.push(error);
        continue;
      }
      accepted.push(file);
    }

    this.acceptedFiles.set(accepted);
    this.errors.set(newErrors);
    this.emitState();
  }

  removeFile(file: File): void {
    this.acceptedFiles.update((files) => files.filter((f) => f !== file));
    this.emitState();
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
