import { Component, EventEmitter, Input, Output, numberAttribute, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxFileSizePipe } from '../../pipes/nx-file-size.pipe';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A single attached file plus its rough, locally-estimated token cost. */
export interface NxAiFileAttachment {
  file: File;
  estimatedTokens: number;
}

/**
 * A chat-attachment-style upload control: a drop zone / "Attach files" button that accepts files
 * via click-to-browse or drag-and-drop. Added files render as compact chips (file-type icon,
 * filename, size, and an estimated token-count badge) so an end user can see roughly how much of
 * an AI model's context budget their attachments will consume. `maxFiles` is enforced by simply
 * dropping files past the limit and flashing a brief inline note - no error is thrown.
 */
@Component({
  selector: 'nx-ai-file-upload',
  standalone: true,
  imports: [NxIcon, NxFileSizePipe, NxProLocked],
  templateUrl: './ui-ai-file-upload.html',
  styleUrl: './ui-ai-file-upload.scss',
})
export class NxAiFileUpload {
  protected readonly licensed = nxProLicenseGranted();

  @Input() accept = '*';
  @Input({ transform: numberAttribute }) maxFiles = 5;

  @Output() filesChange = new EventEmitter<File[]>();

  protected readonly attachments = signal<NxAiFileAttachment[]>([]);
  protected readonly isDragging = signal(false);
  protected readonly limitNoteVisible = signal(false);

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (event.dataTransfer?.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(input.files);
    }
    input.value = '';
  }

  removeFile(index: number): void {
    this.attachments.update((current) => current.filter((_, i) => i !== index));
    this.emitFiles();
  }

  protected iconFor(file: File): string {
    if (file.type.startsWith('image/')) return 'nx-image';
    if (file.type.startsWith('video/')) return 'nx-video';
    if (file.type.startsWith('audio/')) return 'nx-music';
    return 'nx-file';
  }

  private addFiles(fileList: FileList): void {
    const incoming = Array.from(fileList);
    if (incoming.length === 0) return;

    const current = this.attachments();
    const room = Math.max(0, this.maxFiles - current.length);

    if (room === 0) {
      this.flashLimitNote();
      return;
    }

    const accepted = incoming.slice(0, room);
    if (accepted.length < incoming.length) {
      this.flashLimitNote();
    }

    const additions: NxAiFileAttachment[] = accepted.map((file) => ({
      file,
      // Rough "bytes per token" heuristic - good enough for a budget estimate, not precise.
      estimatedTokens: Math.ceil(file.size / 4),
    }));

    this.attachments.set([...current, ...additions]);
    this.emitFiles();
  }

  private flashLimitNote(): void {
    this.limitNoteVisible.set(true);
    setTimeout(() => this.limitNoteVisible.set(false), 2500);
  }

  private emitFiles(): void {
    this.filesChange.emit(this.attachments().map((attachment) => attachment.file));
  }
}
