import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';

@Component({
  selector: 'nx-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './ui-file-upload.html',
  styleUrl: './ui-file-upload.scss',
})
export class NxFileUpload {
  @Input() accept = '*';
  @Input({ transform: booleanAttribute }) multiple = false;
  @Input() label = 'Drag & drop files here, or click to browse';

  @Output() filesSelected = new EventEmitter<File[]>();

  files: File[] = [];
  isDragging = false;

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
    this.files = this.files.filter((_, i) => i !== index);
    this.filesSelected.emit(this.files);
  }

  private addFiles(fileList: FileList): void {
    const newFiles = Array.from(fileList);
    this.files = this.multiple ? [...this.files, ...newFiles] : newFiles;
    this.filesSelected.emit(this.files);
  }
}
