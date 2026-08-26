import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxSlider } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-slider-demo',
  imports: [NxSlider, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-slider-demo.html',
  styleUrl: './ui-slider-demo.scss',
})
export class UiSliderDemo {
  importCode = `import { NxSlider } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  private fb = new FormBuilder();

  volume = 50;
  rangeVolume = 10;

  volumeForm = this.fb.group({ volume: [50] });

  reactiveCode = `<div [formGroup]="volumeForm">
    <nx-slider label="Volume" formControlName="volume"></nx-slider>
</div>`;

  reactiveTs = `volumeForm = this.fb.group({ volume: [50] });`;

  templateCode = `<nx-slider label="Volume" [(ngModel)]="volume"></nx-slider>`;

  templateTs = `volume = 50;`;

  rangeCode = `<nx-slider label="Custom Range" [min]="0" [max]="10" [step]="1" [(ngModel)]="rangeVolume">
</nx-slider>`;

  rangeTs = `rangeVolume = 10;`;
}
