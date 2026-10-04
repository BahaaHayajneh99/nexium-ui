import { Component, Input, booleanAttribute } from '@angular/core';

export type NxLayoutPreviewTemplate = 'sidebar-left' | 'sidebar-right' | 'header-content' | 'holy-grail' | 'blank';

/** A small wireframe thumbnail of a layout template - header/sidebar/content boxes - for a "choose a layout" picker. */
@Component({
  selector: 'nx-layout-preview',
  standalone: true,
  imports: [],
  templateUrl: './ui-layout-preview.html',
  styleUrl: './ui-layout-preview.scss',
})
export class NxLayoutPreview {
  @Input() template: NxLayoutPreviewTemplate = 'sidebar-left';
  @Input() label = '';
  @Input({ transform: booleanAttribute }) selected = false;
}
