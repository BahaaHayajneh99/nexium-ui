import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiTimeline, NxTimelineItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-timeline-demo',
  imports: [UiTimeline, DemoSection],
  templateUrl: './ui-timeline-demo.html',
  styleUrl: './ui-timeline-demo.scss',
})
export class UiTimelineDemo {
  public commonService = inject(CommonService);
  items: NxTimelineItem[] = [
    { title: 'Order placed', time: '9:00 AM', description: 'Your order has been placed.', variant: 'primary' },
    { title: 'Order shipped', time: '11:30 AM', description: 'Your order has been shipped.', variant: 'info' },
    { title: 'Delivered', time: '3:45 PM', description: 'Your order was delivered.', variant: 'success' },
  ];

  basicCode = `<nx-timeline [items]="items">
</nx-timeline>`;

  basicTs = `items: NxTimelineItem[] = [
    { title: 'Order placed', time: '9:00 AM', description: 'Your order has been placed.', variant: 'primary' },
    { title: 'Order shipped', time: '11:30 AM', description: 'Your order has been shipped.', variant: 'info' },
    { title: 'Delivered', time: '3:45 PM', description: 'Your order was delivered.', variant: 'success' },
];`;
}
