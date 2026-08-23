import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSlider } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-slider-demo',
  imports: [NxSlider, DemoSection],
  templateUrl: './ui-slider-demo.html',
  styleUrl: './ui-slider-demo.scss',
})
export class UiSliderDemo {
  importCode = `import { NxSlider } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  volume = 50;
  rangeVolume = 10;

  basicCode = `<nx-slider label="Volume" [(value)]="volume">
</nx-slider>`;

  basicTs = `rangeVolume = 10;`;

  rangeCode = `<nx-slider label="Custom Range" [min]="0" [max]="10" [step]="1" [(value)]="rangeVolume">
</nx-slider>`;

  rangeTs = this.basicTs;
}
