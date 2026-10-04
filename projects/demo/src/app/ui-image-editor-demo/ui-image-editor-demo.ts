import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxImageEditor } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

/** Draws a small scene client-side (no network image) to use as the editor's starting photo. */
function buildSampleImage(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 320;
  const ctx = canvas.getContext('2d')!;

  const sky = ctx.createLinearGradient(0, 0, 0, 320);
  sky.addColorStop(0, '#4b6cb7');
  sky.addColorStop(1, '#a0c4ff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 480, 320);

  ctx.fillStyle = '#ffe066';
  ctx.beginPath();
  ctx.arc(390, 70, 36, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#2f9e44';
  ctx.fillRect(0, 230, 480, 90);

  ctx.fillStyle = '#495057';
  ctx.beginPath();
  ctx.moveTo(60, 230);
  ctx.lineTo(140, 120);
  ctx.lineTo(220, 230);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#343a40';
  ctx.beginPath();
  ctx.moveTo(180, 230);
  ctx.lineTo(270, 90);
  ctx.lineTo(360, 230);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('NexiumUI', 120, 280);

  return canvas.toDataURL('image/png');
}

@Component({
  selector: 'app-ui-image-editor-demo',
  imports: [NxImageEditor, DemoSection],
  templateUrl: './ui-image-editor-demo.html',
  styleUrl: './ui-image-editor-demo.scss',
})
export class UiImageEditorDemo {
  importCode = `import { NxImageEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  sampleImage = buildSampleImage();
  secondSampleImage = buildSampleImage();

  savedResult = signal<string | null>(null);
  secondSavedResult = signal<string | null>(null);

  onSaved(dataUrl: string): void {
    this.savedResult.set(dataUrl);
  }

  onSecondSaved(dataUrl: string): void {
    this.secondSavedResult.set(dataUrl);
  }

  basicCode = `<nx-image-editor [src]="sampleImage" (saved)="onSaved($event)"></nx-image-editor>`;
  basicTs = `// src is any image URL or data URL. Switch tools in the toolbar - Crop, Resize, Rotate, Flip,
// Adjust (brightness/contrast), Filters, Draw, Text, Shapes - each one edits a real in-memory
// canvas. Undo/Redo walk back through every committed change, and Save emits a PNG data URL
// of the final result.
onSaved(dataUrl: string) {
  this.resultImage = dataUrl;
}`;

  toolsCode = `<nx-image-editor [src]="secondSampleImage" (saved)="onSecondSaved($event)"></nx-image-editor>`;
  toolsTs = `// Every tool bakes its result into the same canvas:
// - Crop/Resize/Rotate/Flip resize or redraw the canvas itself.
// - Adjust previews brightness/contrast live, "Apply" bakes the pixel math in.
// - Filters (Grayscale/Sepia/Invert) apply immediately.
// - Draw paints freehand strokes directly onto the image.
// - Text places a floating input you type into, baked on Enter/blur.
// - Shapes drag out a rectangle or ellipse outline, baked on release.
// Undo/Redo snapshot the canvas before every one of these.`;
}
