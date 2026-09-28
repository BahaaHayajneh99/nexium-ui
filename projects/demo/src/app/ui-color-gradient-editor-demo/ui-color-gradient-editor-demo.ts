import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxColorGradientEditor, NxGradientStop, NxGradientType } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-color-gradient-editor-demo',
  imports: [NxColorGradientEditor, DemoSection],
  templateUrl: './ui-color-gradient-editor-demo.html',
  styleUrl: './ui-color-gradient-editor-demo.scss',
})
export class UiColorGradientEditorDemo {
  importCode = `import { NxColorGradientEditor } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  stops: NxGradientStop[] = [
    { color: '#3b82f6', offset: 0 },
    { color: '#8b5cf6', offset: 100 },
  ];
  type: NxGradientType = 'linear';
  angle = 90;

  basicCode = `<nx-color-gradient-editor
    [type]="type"
    [angle]="angle"
    [stops]="stops"
    (typeChange)="onTypeChange($event)"
    (angleChange)="onAngleChange($event)"
    (stopsChange)="onStopsChange($event)">
</nx-color-gradient-editor>`;

  basicTs = `stops: NxGradientStop[] = [
  { color: '#3b82f6', offset: 0 },
  { color: '#8b5cf6', offset: 100 },
];
type: NxGradientType = 'linear';
angle = 90;

onStopsChange(stops: NxGradientStop[]): void {
  this.stops = stops;
}

onTypeChange(type: NxGradientType): void {
  this.type = type;
}

onAngleChange(angle: number): void {
  this.angle = angle;
}`;

  onStopsChange(stops: NxGradientStop[]): void {
    this.stops = stops;
  }

  onTypeChange(type: NxGradientType): void {
    this.type = type;
  }

  onAngleChange(angle: number): void {
    this.angle = angle;
  }

  presetStops: NxGradientStop[] = [
    { color: '#f97316', offset: 0 },
    { color: '#facc15', offset: 45 },
    { color: '#22c55e', offset: 100 },
  ];
  presetType: NxGradientType = 'radial';
  presetAngle = 45;

  presetCode = `<!-- Starting from a 3-stop preset - drag a handle to reposition it,
     double-click the track to add a stop, or use the controls below the track. -->
<nx-color-gradient-editor
    [type]="presetType"
    [angle]="presetAngle"
    [stops]="presetStops"
    (typeChange)="presetType = $event"
    (angleChange)="presetAngle = $event"
    (stopsChange)="presetStops = $event">
</nx-color-gradient-editor>`;

  onPresetStopsChange(stops: NxGradientStop[]): void {
    this.presetStops = stops;
  }

  onPresetTypeChange(type: NxGradientType): void {
    this.presetType = type;
  }

  onPresetAngleChange(angle: number): void {
    this.presetAngle = angle;
  }

  presetTs = `presetStops: NxGradientStop[] = [
  { color: '#f97316', offset: 0 },
  { color: '#facc15', offset: 45 },
  { color: '#22c55e', offset: 100 },
];
presetType: NxGradientType = 'radial';
presetAngle = 45;`;
}
