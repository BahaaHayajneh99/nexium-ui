import { Component } from '@angular/core';
import { NxTooltip } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-tooltip-demo',
  imports: [NxTooltip, DemoSection],
  templateUrl: './ui-tooltip-demo.html',
  styleUrl: './ui-tooltip-demo.scss',
})
export class UiTooltipDemo {
  basicCode = `<button nxTooltip="This is a tooltip">Hover me</button>`;

  positionsCode = `<button nxTooltip="Top tooltip" nxTooltipPosition="top">Top</button>
<button nxTooltip="Bottom tooltip" nxTooltipPosition="bottom">Bottom</button>
<button nxTooltip="Left tooltip" nxTooltipPosition="left">Left</button>
<button nxTooltip="Right tooltip" nxTooltipPosition="right">Right</button>`;
}
