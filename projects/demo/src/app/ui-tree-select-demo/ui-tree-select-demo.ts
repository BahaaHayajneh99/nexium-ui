import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTreeSelect, NxTreeSelectNode } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-tree-select-demo',
  imports: [NxTreeSelect, DemoSection],
  templateUrl: './ui-tree-select-demo.html',
  styleUrl: './ui-tree-select-demo.scss',
})
export class UiTreeSelectDemo {
  importCode = `import { NxTreeSelect, NxTreeSelectNode } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // A 3-level org chart: Company -> Department -> Team.
  orgNodes: NxTreeSelectNode[] = [
    {
      id: 'engineering',
      label: 'Engineering',
      children: [
        {
          id: 'platform',
          label: 'Platform',
          children: [
            { id: 'platform-infra', label: 'Infrastructure' },
            { id: 'platform-api', label: 'API Services' },
          ],
        },
        {
          id: 'product-eng',
          label: 'Product Engineering',
          children: [
            { id: 'product-web', label: 'Web' },
            { id: 'product-mobile', label: 'Mobile' },
          ],
        },
      ],
    },
    {
      id: 'sales',
      label: 'Sales',
      children: [
        { id: 'sales-enterprise', label: 'Enterprise' },
        { id: 'sales-smb', label: 'SMB' },
      ],
    },
    {
      id: 'people',
      label: 'People Ops',
      children: [
        { id: 'people-recruiting', label: 'Recruiting' },
        { id: 'people-hr', label: 'HR Business Partners' },
      ],
    },
  ];

  singleSelectedIds: string[] = ['platform-api'];
  multiSelectedIds: string[] = ['platform-infra', 'product-mobile'];

  singleCode = `<nx-tree-select
    [nodes]="orgNodes"
    [(selectedIds)]="singleSelectedIds"
    placeholder="Assign to a team...">
</nx-tree-select>`;

  singleTs = `orgNodes: NxTreeSelectNode[] = [
  { id: 'engineering', label: 'Engineering', children: [
      { id: 'platform', label: 'Platform', children: [
          { id: 'platform-infra', label: 'Infrastructure' },
          { id: 'platform-api', label: 'API Services' },
      ]},
      // ...
  ]},
  // ...
];

singleSelectedIds: string[] = ['platform-api'];`;

  multiCode = `<nx-tree-select
    [nodes]="orgNodes"
    [multiple]="true"
    [(selectedIds)]="multiSelectedIds"
    placeholder="Select teams...">
</nx-tree-select>`;

  multiTs = `multiSelectedIds: string[] = ['platform-infra', 'product-mobile'];`;

  onSingleChange(ids: string[]): void {
    this.singleSelectedIds = ids;
  }

  onMultiChange(ids: string[]): void {
    this.multiSelectedIds = ids;
  }
}
