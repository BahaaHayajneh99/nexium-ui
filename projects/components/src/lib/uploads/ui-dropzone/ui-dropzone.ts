import { Component, EventEmitter, Input, OnDestroy, Output, booleanAttribute } from '@angular/core';
import { NxFileSizePipe } from '../../pipes/nx-file-size.pipe';
import { NxIcon } from '../../data-display/ui-icon';

interface NxDropzonePreview {
  file: File;
  isImage: boolean;
  previewUrl: string | null;
}

/**
 * A richer sibling of `NxFileUpload`: a drag-and-drop zone that renders a grid of thumbnail
 * previews (images rendered inline, other file types shown with a generic file icon) instead of
 * a plain filename list. Object URLs created for image thumbnails are revoked as soon as the
 * corresponding file is removed, and on destroy, so previews never leak memory.
 */
@Component({
  selector: 'nx-dropzone',
  standalone: true,
  imports: [NxFileSizePipe, NxIcon],
  templateUrl: './ui-dropzone.html',
  styleUrl: './ui-dropzone.scss',
})
export class NxDropzone implements OnDestroy {
  @Input() accept = '*';
  @Input({ transform: booleanAttribute }) multiple = true;

  @Output() filesChange = new EventEmitter<File[]>();

  isDragging = false;
  previews: NxDropzonePreview[] = [];

  get files(): File[] {
    return this.previews.map((p) => p.file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(): void {
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
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
    const removed = this.previews[index];
    if (removed?.previewUrl) {
      URL.revokeObjectURL(removed.previewUrl);
    }
    this.previews = this.previews.filter((_, i) => i !== index);
    this.filesChange.emit(this.files);
  }

  /** Adds files to the current selection (or replaces it when `multiple` is false). Public so callers can seed/append files programmatically, not just via drag-drop or the file picker. */
  addFiles(fileList: FileList | File[]): void {
    const incoming = Array.from(fileList).map((file) => this.toPreview(file));
    if (incoming.length === 0) {
      return;
    }

    if (this.multiple) {
      this.previews = [...this.previews, ...incoming];
    } else {
      this.revokeAll(this.previews);
      this.previews = incoming.slice(0, 1);
    }

    this.filesChange.emit(this.files);
  }

  private toPreview(file: File): NxDropzonePreview {
    const isImage = file.type.startsWith('image/');
    return { file, isImage, previewUrl: isImage ? URL.createObjectURL(file) : null };
  }

  private revokeAll(previews: NxDropzonePreview[]): void {
    previews.forEach((p) => {
      if (p.previewUrl) {
        URL.revokeObjectURL(p.previewUrl);
      }
    });
  }

  ngOnDestroy(): void {
    this.revokeAll(this.previews);
  }
}
