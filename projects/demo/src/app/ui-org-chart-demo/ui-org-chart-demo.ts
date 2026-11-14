import { Component, inject } from '@angular/core';
import { NxOrgChart, NxOrgChartNode, NxInput } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-org-chart-demo',
  imports: [NxOrgChart, NxInput, DemoSection],
  templateUrl: './ui-org-chart-demo.html',
  styleUrl: './ui-org-chart-demo.scss',
})
export class UiOrgChartDemo {
  importCode = `import { NxOrgChart } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  searchTerm = '';

  lastClicked = '';

  root: NxOrgChartNode = {
    id: 1,
    name: 'Ava Thompson',
    title: 'Chief Executive Officer',
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
    children: [
      {
        id: 2,
        name: 'Marcus Lee',
        title: 'VP Engineering',
        avatarSrc: 'https://i.pravatar.cc/150?img=12',
        children: [
          { id: 5, name: 'Priya Natarajan', title: 'Engineering Manager', avatarSrc: 'https://i.pravatar.cc/150?img=5' },
          { id: 6, name: 'Daniel Osei', title: 'Staff Engineer', avatarSrc: 'https://i.pravatar.cc/150?img=6' },
          { id: 7, name: 'Hana Kobayashi', title: 'Senior Engineer', avatarSrc: 'https://i.pravatar.cc/150?img=9' },
        ],
      },
      {
        id: 3,
        name: 'Sofia Rossi',
        title: 'VP Product',
        avatarSrc: 'https://i.pravatar.cc/150?img=20',
        children: [
          { id: 8, name: 'Liam Carter', title: 'Product Manager', avatarSrc: 'https://i.pravatar.cc/150?img=14' },
          { id: 9, name: 'Noah Bergström', title: 'Product Designer', avatarSrc: 'https://i.pravatar.cc/150?img=15' },
        ],
      },
      {
        id: 4,
        name: 'Grace Okafor',
        title: 'VP Sales',
        avatarSrc: 'https://i.pravatar.cc/150?img=25',
        children: [
          { id: 10, name: 'Ethan Mitchell', title: 'Account Executive', avatarSrc: 'https://i.pravatar.cc/150?img=33' },
          { id: 11, name: 'Mia Fernandez', title: 'Account Executive', avatarSrc: 'https://i.pravatar.cc/150?img=47' },
        ],
      },
    ],
  };

  basicCode = `<nx-input [(value)]="searchTerm" placeholder="Search people..."></nx-input>
<nx-org-chart [root]="root" [searchTerm]="searchTerm" (nodeClick)="onNodeClick($event)"></nx-org-chart>`;

  basicTs = `root: NxOrgChartNode = {
  id: 1,
  name: 'Ava Thompson',
  title: 'Chief Executive Officer',
  avatarSrc: 'https://i.pravatar.cc/150?img=1',
  children: [
    { id: 2, name: 'Marcus Lee', title: 'VP Engineering', children: [ /* ... */ ] },
    { id: 3, name: 'Sofia Rossi', title: 'VP Product', children: [ /* ... */ ] },
    { id: 4, name: 'Grace Okafor', title: 'VP Sales', children: [ /* ... */ ] },
  ],
};

onNodeClick(node: NxOrgChartNode): void {
  // searchTerm highlights matching nodes and auto-expands their ancestor chain so
  // a match is always visible, even inside a collapsed branch.
}`;

  onNodeClick(node: NxOrgChartNode): void {
    this.lastClicked = `${node.name}${node.title ? ' - ' + node.title : ''}`;
  }
}
