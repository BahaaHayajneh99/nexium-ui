import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCronBuilder, NxCronValue } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-cron-builder-demo',
  imports: [NxCronBuilder, DemoSection],
  templateUrl: './ui-cron-builder-demo.html',
  styleUrl: './ui-cron-builder-demo.scss',
})
export class UiCronBuilderDemo {
  importCode = `import { NxCronBuilder, NxCronValue } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  cronValue = signal<NxCronValue>({
    minute: '0',
    hour: '9',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
  });

  basicCode = `<nx-cron-builder [value]="cronValue" (valueChange)="cronValue = $event"></nx-cron-builder>`;

  basicTs = `cronValue: NxCronValue = {
  minute: '0',
  hour: '9',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
};

// -> expression "0 9 * * *", description "Runs daily at 09:00"`;
}
