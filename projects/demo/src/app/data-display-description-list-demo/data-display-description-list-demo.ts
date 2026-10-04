import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxDescriptionList, NxDescriptionItem } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-data-display-description-list-demo',
  standalone: true,
  imports: [NxDescriptionList, DemoSection],
  templateUrl: './data-display-description-list-demo.html',
  styleUrl: './data-display-description-list-demo.scss',
})
export class DataDisplayDescriptionListDemo {
  importCode = `import { NxDescriptionList } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  productDetails: NxDescriptionItem[] = [
    { term: 'Product', definition: `${this.commonService.appName} Component Library` },
    { term: 'Version', definition: '0.1.8' },
    { term: 'License', definition: 'MIT' },
    { term: 'Package', definition: 'nexium-ui' },
  ];

  basicCode = `<nx-description-list [items]="productDetails"></nx-description-list>`;

  basicTs = `items: NxDescriptionItem[] = [
  { term: 'Product', definition: 'NexiumUI Component Library' },
  { term: 'Version', definition: '0.1.8' },
  { term: 'License', definition: 'MIT' },
  { term: 'Package', definition: 'nexium-ui' },
];`;

  specDetails: NxDescriptionItem[] = [
    { term: 'CPU', definition: '8-core, 3.2GHz' },
    { term: 'Memory', definition: '32GB DDR5' },
    { term: 'Storage', definition: '1TB NVMe SSD' },
    { term: 'Notes', definition: 'Configuration shipped to the EU warehouse only - lead time is 2-3 weeks for other regions.', span: 2 },
  ];

  columnsCode = `<nx-description-list [items]="specDetails" [columns]="2"></nx-description-list>`;

  columnsTs = `items: NxDescriptionItem[] = [
  { term: 'CPU', definition: '8-core, 3.2GHz' },
  { term: 'Memory', definition: '32GB DDR5' },
  { term: 'Storage', definition: '1TB NVMe SSD' },
  // 'span' makes one item's row stretch across multiple columns, e.g. a trailing note
  { term: 'Notes', definition: 'Shipped to the EU warehouse only.', span: 2 },
];`;
}
