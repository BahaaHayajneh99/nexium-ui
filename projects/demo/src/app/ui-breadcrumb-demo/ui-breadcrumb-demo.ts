import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiBreadcrumb, NxBreadcrumbItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-breadcrumb-demo',
  imports: [UiBreadcrumb, DemoSection],
  templateUrl: './ui-breadcrumb-demo.html',
  styleUrl: './ui-breadcrumb-demo.scss',
})
export class UiBreadcrumbDemo {
  public commonService = inject(CommonService);
  items: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Components', link: '/components' },
    { label: 'Breadcrumb' },
  ];

  basicCode = `<nx-breadcrumb [items]="items">
</nx-breadcrumb>`;

  separatorCode = `<nx-breadcrumb [items]="items" separator=">">
</nx-breadcrumb>`;

  basicTs = `items: NxBreadcrumbItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Components', link: '/components' },
  { label: 'Breadcrumb' },
];`;

  separatorTs = this.basicTs;
}
