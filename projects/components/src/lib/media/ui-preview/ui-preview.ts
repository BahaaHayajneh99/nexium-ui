import { Component, Input } from '@angular/core';

@Component({
  selector: 'nx-preview',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-preview">
      @switch (type) {
        @case ('image') {
          <img class="nx-preview-media" [src]="src" [alt]="fileName" />
        }
        @case ('video') {
          <video class="nx-preview-media" [src]="src" controls></video>
        }
        @case ('audio') {
          <audio [src]="src" controls></audio>
        }
        @default {
          <div class="nx-preview-file">
            <span class="nx-preview-file-icon">📄</span>
            <span>{{ fileName }}</span>
          </div>
        }
      }
      @if (type !== 'audio' && type !== 'document' && fileName) {
        <span class="nx-preview-name">{{ fileName }}</span>
      }
    </div>
  `,
  styles: `
    .nx-preview { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
    .nx-preview-media { max-width: 240px; max-height: 180px; border-radius: 8px; border: 1px solid var(--shell-border); }
    .nx-preview-file {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border: 1px solid var(--shell-border);
      border-radius: 8px;
      background-color: var(--shell-surface-hover);
    }
    .nx-preview-file-icon { font-size: 20px; }
    .nx-preview-name { font-size: 12px; color: var(--shell-text-secondary); }
  `,
})
export class UiPreview {
  @Input() src = '';
  @Input() fileName = '';
  @Input() type: 'image' | 'video' | 'audio' | 'document' = 'document';
}
