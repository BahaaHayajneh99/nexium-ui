import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPinnedList, NxPinnedItem, NxAvatar } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-pinned-list-demo',
  imports: [NxPinnedList, NxAvatar, DemoSection],
  templateUrl: './ui-pinned-list-demo.html',
  styleUrl: './ui-pinned-list-demo.scss',
})
export class UiPinnedListDemo {
  importCode = `import { NxPinnedList } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  mixedItems: NxPinnedItem[] = [
    { id: '1', type: 'text', title: 'Q3 retro notes', subtitle: 'Doc', icon: 'nx-file', content: 'What went well, what to improve next quarter...' },
    { id: '2', type: 'image', title: 'Homepage redesign v3', subtitle: 'Figma export', content: 'https://picsum.photos/seed/nexium1/96/96' },
    { id: '3', type: 'video', title: 'Onboarding walkthrough', subtitle: '4:32', content: 'https://picsum.photos/seed/nexium2/96/96' },
    { id: '4', type: 'link', title: 'API reference', subtitle: 'developer.nexium.example/docs', icon: 'nx-external-link' },
    { id: '5', type: 'custom', title: 'Custom', data: { name: 'Priya Nair', role: 'Lead Designer' } },
  ];

  onItemsChange(items: NxPinnedItem[]): void {
    this.mixedItems = items;
  }

  onUnpinned(item: NxPinnedItem): void {
    console.log('unpinned', item.title);
  }

  basicCode = `<nx-pinned-list
    [items]="mixedItems"
    [customTemplate]="memberTemplate"
    (itemsChange)="onItemsChange($event)">
</nx-pinned-list>

<ng-template #memberTemplate let-item>
    <nx-avatar [name]="item.data.name" size="small"></nx-avatar>
    <div>{{ item.data.name }} - {{ item.data.role }}</div>
</ng-template>`;

  basicTs = `items: NxPinnedItem[] = [
  { id: '1', type: 'text', title: 'Q3 retro notes', icon: 'nx-file', content: '...' },
  { id: '2', type: 'image', title: 'Homepage redesign v3', content: 'https://...' },
  { id: '3', type: 'video', title: 'Onboarding walkthrough', content: 'https://...' },
  { id: '4', type: 'link', title: 'API reference', subtitle: 'developer.nexium.example/docs' },
  { id: '5', type: 'custom', title: 'Custom', data: { name: 'Priya Nair', role: 'Lead Designer' } },
];

onItemsChange(items: NxPinnedItem[]): void {
  this.items = items; // reorder / unpin updates flow back here
}`;
}
