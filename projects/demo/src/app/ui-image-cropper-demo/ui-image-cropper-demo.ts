import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxImageCropper } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

/** Draws a small gradient scene client-side (no network image) to use as the crop source. */
function buildSampleImage(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 320;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createLinearGradient(0, 0, 480, 320);
  gradient.addColorStop(0, '#6c5ce7');
  gradient.addColorStop(1, '#00cec9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 480, 320);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.arc(140, 160, 70, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
  ctx.fillRect(260, 70, 160, 180);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('NexiumUI', 120, 300);

  return canvas.toDataURL('image/png');
}

@Component({
  selector: 'app-ui-image-cropper-demo',
  imports: [NxImageCropper, DemoSection],
  templateUrl: './ui-image-cropper-demo.html',
  styleUrl: './ui-image-cropper-demo.scss',
})
export class UiImageCropperDemo {
  importCode = `import { NxImageCropper } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  sampleImage = buildSampleImage();

  freeformResult = signal<string | null>(null);
  avatarResult = signal<string | null>(null);

  onFreeformCropped(dataUrl: string): void {
    this.freeformResult.set(dataUrl);
  }

  onAvatarCropped(dataUrl: string): void {
    this.avatarResult.set(dataUrl);
  }

  basicCode = `<nx-image-cropper [src]="sampleImage" (cropped)="onFreeformCropped($event)"></nx-image-cropper>`;
  basicTs = `// src is any image URL or data URL. Drag the rectangle to move it, drag a handle to resize,
// use the toolbar to rotate/zoom/reset, then Crop emits a PNG data URL of just that region.
onFreeformCropped(dataUrl: string) {
  this.resultImage = dataUrl;
}`;

  avatarCode = `<nx-image-cropper [src]="sampleImage" [aspectRatio]="1" (cropped)="onAvatarCropped($event)"></nx-image-cropper>`;
  avatarTs = `// aspectRatio locks the crop rectangle's proportions while resizing - 1 for a square avatar.
onAvatarCropped(dataUrl: string) {
  this.avatarImage = dataUrl;
}`;
}
