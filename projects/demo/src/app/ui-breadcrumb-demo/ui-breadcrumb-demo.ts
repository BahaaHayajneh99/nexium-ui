import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxBreadcrumb, NxBreadcrumbItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-breadcrumb-demo',
  imports: [NxBreadcrumb, DemoSection],
  templateUrl: './ui-breadcrumb-demo.html',
  styleUrl: './ui-breadcrumb-demo.scss',
})
export class UiBreadcrumbDemo {
  importCode = `import { NxBreadcrumb, NxBreadcrumbItem } from 'nexium-ui';`;

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
