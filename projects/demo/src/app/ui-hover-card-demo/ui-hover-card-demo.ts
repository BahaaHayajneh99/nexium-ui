import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxHoverCard } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-hover-card-demo',
  imports: [NxHoverCard, DemoSection],
  templateUrl: './ui-hover-card-demo.html',
  styleUrl: './ui-hover-card-demo.scss',
})
export class UiHoverCardDemo {
  importCode = `import { NxHoverCard } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-hover-card>
    <a nx-hover-card-trigger href="javascript:void(0)">&#64;nexiumui</a>

    <div>
        <strong>NexaUI</strong>
        <p>A component library for building fast, accessible Angular apps.</p>
    </div>
</nx-hover-card>`;

  basicTs = `// No component state needed - nx-hover-card manages its own open/close timers.`;

  placementCode = `<nx-hover-card placement="top">...</nx-hover-card>
<nx-hover-card placement="right">...</nx-hover-card>`;

  placementTs = `// placement accepts 'top' | 'bottom' (default) | 'left' | 'right'.`;

  delayCode = `<nx-hover-card [openDelay]="0" [closeDelay]="500">...</nx-hover-card>`;

  delayTs = `// openDelay defaults to 400ms, closeDelay to 200ms - tune both to taste.`;
}
