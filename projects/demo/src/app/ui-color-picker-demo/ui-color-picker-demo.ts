import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxColorPicker } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-color-picker-demo',
  imports: [NxColorPicker, FormsModule, ReactiveFormsModule, DemoSection],
  templateUrl: './ui-color-picker-demo.html',
})
export class UiColorPickerDemo {
  importCode = `import { NxColorPicker } from 'nexium-ui';`;

  private fb = new FormBuilder();

  brandColor = '#3498db';

  brandColorForm = this.fb.group({ brandColor: ['#3498db'] });

  reactiveCode = `<div [formGroup]="brandColorForm">
    <nx-color-picker label="Brand color" formControlName="brandColor"></nx-color-picker>
</div>`;

  reactiveTs = `brandColorForm = this.fb.group({ brandColor: ['#3498db'] });`;

  templateCode = `<nx-color-picker label="Brand color" [(ngModel)]="brandColor"></nx-color-picker>`;

  templateTs = `brandColor = '#3498db';`;

  customPresetColor = '#4a3aa7';

  customPresets = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#4a3aa7'];

  customPresetsCode = `<nx-color-picker
    label="Chart series color"
    [presets]="customPresets"
    [(ngModel)]="customPresetColor">
</nx-color-picker>`;

  customPresetsTs = `customPresetColor = '#4a3aa7';
customPresets = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#4a3aa7'];`;

  invalidColor = '';

  invalidCode = `<nx-color-picker label="Required color" [invalid]="true"></nx-color-picker>`;

  disabledCode = `<nx-color-picker label="Disabled color" [disabled]="true" value="#adb5bd"></nx-color-picker>`;
}
