import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPropertyDef, NxPropertyEditor, NxPropertyEditorChangeEvent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-property-editor-demo',
  imports: [NxPropertyEditor, DemoSection],
  templateUrl: './ui-property-editor-demo.html',
  styleUrl: './ui-property-editor-demo.scss',
})
export class UiPropertyEditorDemo {
  importCode = `import { NxPropertyEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  properties: NxPropertyDef[] = [
    { key: 'width', label: 'Width', type: 'number', unit: 'px' },
    { key: 'height', label: 'Height', type: 'number', unit: 'px' },
    { key: 'color', label: 'Color', type: 'color' },
    { key: 'radius', label: 'Radius', type: 'number', unit: 'px' },
    { key: 'padding', label: 'Padding', type: 'number', unit: 'px' },
    {
      key: 'responsive',
      label: 'Responsive',
      type: 'boolean',
    },
    {
      key: 'align',
      label: 'Align',
      type: 'select',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
  ];

  values: Record<string, unknown> = {
    width: 240,
    height: 120,
    color: '#3b82f6',
    radius: 8,
    padding: 16,
    responsive: true,
    align: 'center',
  };

  onValuesChange(values: Record<string, unknown>): void {
    this.values = values;
  }

  lastChange: NxPropertyEditorChangeEvent | null = null;

  onPropertyChange(event: NxPropertyEditorChangeEvent): void {
    this.lastChange = event;
  }

  basicCode = `<nx-property-editor
    [properties]="properties"
    [values]="values"
    (valuesChange)="onValuesChange($event)">
</nx-property-editor>`;

  basicTs = `properties: NxPropertyDef[] = [
  { key: 'width', label: 'Width', type: 'number', unit: 'px' },
  { key: 'height', label: 'Height', type: 'number', unit: 'px' },
  { key: 'color', label: 'Color', type: 'color' },
  { key: 'radius', label: 'Radius', type: 'number', unit: 'px' },
  { key: 'padding', label: 'Padding', type: 'number', unit: 'px' },
  { key: 'responsive', label: 'Responsive', type: 'boolean' },
  {
    key: 'align',
    label: 'Align',
    type: 'select',
    options: [
      { label: 'Left', value: 'left' },
      { label: 'Center', value: 'center' },
      { label: 'Right', value: 'right' },
    ],
  },
];

values: Record<string, unknown> = {
  width: 240,
  height: 120,
  color: '#3b82f6',
  radius: 8,
  padding: 16,
  responsive: true,
  align: 'center',
};

onValuesChange(values: Record<string, unknown>): void {
  this.values = values;
}`;

  changeCode = `<nx-property-editor
    [properties]="properties"
    [values]="values"
    (propertyChange)="onPropertyChange($event)">
</nx-property-editor>
<code>{{ lastChangeText }}</code>`;

  changeTs = `lastChange: NxPropertyEditorChangeEvent | null = null;

onPropertyChange(event: NxPropertyEditorChangeEvent): void {
  // event is { key: string; value: unknown }
  this.lastChange = event;
}`;

  get lastChangeText(): string {
    return this.lastChange ? `${this.lastChange.key} -> ${JSON.stringify(this.lastChange.value)}` : 'Change a field to see the event here.';
  }

  get previewWidth(): number {
    return Number(this.values['width']) || 0;
  }

  get previewHeight(): number {
    return Number(this.values['height']) || 0;
  }

  get previewColor(): string {
    return String(this.values['color'] ?? '#3b82f6');
  }

  get previewRadius(): number {
    return Number(this.values['radius']) || 0;
  }

  get previewPadding(): number {
    return Number(this.values['padding']) || 0;
  }

  get previewAlign(): string {
    const align = this.values['align'];
    return align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';
  }

  previewCode = `<div
    class="preview-box"
    [style.width.px]="previewWidth"
    [style.height.px]="previewHeight"
    [style.background]="previewColor"
    [style.border-radius.px]="previewRadius"
    [style.padding.px]="previewPadding"
    [style.justify-content]="previewAlign">
    Preview
</div>`;

  previewTs = `get previewWidth(): number {
  return Number(this.values['width']) || 0;
}

get previewColor(): string {
  return String(this.values['color'] ?? '#3b82f6');
}

get previewAlign(): string {
  const align = this.values['align'];
  return align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center';
}
// ...previewHeight/previewRadius/previewPadding follow the same pattern`;
}
