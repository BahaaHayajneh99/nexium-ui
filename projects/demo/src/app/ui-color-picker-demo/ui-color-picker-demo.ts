import { Component } from '@angular/core';
import { UiColorPicker } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-color-picker-demo',
  imports: [UiColorPicker, DemoSection],
  templateUrl: './ui-color-picker-demo.html',
})
export class UiColorPickerDemo {
  brandColor = '#3498db';

  basicCode = `<nx-color-picker label="Brand color" [(value)]="brandColor"></nx-color-picker>`;

  basicTs = `brandColor = '#3498db';`;

  customPresetColor = '#4a3aa7';

  customPresets = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#4a3aa7'];

  customPresetsCode = `<nx-color-picker
    label="Chart series color"
    [presets]="customPresets"
    [(value)]="customPresetColor">
</nx-color-picker>`;

  customPresetsTs = `customPresetColor = '#4a3aa7';
customPresets = ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#4a3aa7'];`;

  invalidColor = '';

  invalidCode = `<nx-color-picker label="Required color" [invalid]="true"></nx-color-picker>`;

  disabledCode = `<nx-color-picker label="Disabled color" [disabled]="true" value="#adb5bd"></nx-color-picker>`;
}
