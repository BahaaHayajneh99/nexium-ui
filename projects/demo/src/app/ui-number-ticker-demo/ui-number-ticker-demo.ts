import { Component } from '@angular/core';
import { NxNumberTicker } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-number-ticker-demo',
  imports: [NxNumberTicker, DemoSection],
  templateUrl: './ui-number-ticker-demo.html',
  styleUrl: './ui-number-ticker-demo.scss',
})
export class UiNumberTickerDemo {
  importCode = `import { NxNumberTicker } from 'nexium-ui';`;

  basicCode = `<nx-number-ticker [value]="revenue"></nx-number-ticker>
<button (click)="randomizeRevenue()">Randomize</button>`;

  formattedCode = `<nx-number-ticker [value]="price" prefix="$" [decimals]="2"></nx-number-ticker>
<nx-number-ticker [value]="completion" suffix="%" [easing]="'linear'"></nx-number-ticker>`;

  bigNumberCode = `<nx-number-ticker [value]="downloads" [duration]="1500" separator=","></nx-number-ticker>
<button (click)="bumpDownloads()">+ New download</button>`;

  revenue = 48290;
  price = 19.99;
  completion = 42;
  downloads = 1204567;

  randomizeRevenue(): void {
    this.revenue = Math.round(Math.random() * 90000) + 1000;
  }

  bumpDownloads(): void {
    this.downloads += Math.round(Math.random() * 500) + 1;
  }
}
