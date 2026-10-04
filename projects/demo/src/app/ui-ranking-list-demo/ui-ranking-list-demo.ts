import { Component } from '@angular/core';
import { NxRankingList, NxRankingItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-ranking-list-demo',
  imports: [NxRankingList, DemoSection],
  templateUrl: './ui-ranking-list-demo.html',
  styleUrl: './ui-ranking-list-demo.scss',
})
export class UiRankingListDemo {
  importCode = `import { NxRankingList } from 'nexium-ui';`;

  items: NxRankingItem[] = [
    { id: 1, rank: 1, name: 'Amelia Chen', avatarUrl: 'https://i.pravatar.cc/40?img=1', value: '$18,420', delta: '+12%' },
    { id: 2, rank: 2, name: 'Marcus Reid', avatarUrl: 'https://i.pravatar.cc/40?img=2', value: '$16,980', delta: '+5%' },
    { id: 3, rank: 3, name: 'Sofia Alvarez', avatarUrl: 'https://i.pravatar.cc/40?img=3', value: '$15,210', delta: '-2%' },
    { id: 4, rank: 4, name: 'Daniel Osei', avatarUrl: 'https://i.pravatar.cc/40?img=4', value: '$12,860' },
    { id: 5, rank: 5, name: 'Priya Nair', avatarUrl: 'https://i.pravatar.cc/40?img=5', value: '$11,340' },
  ];

  basicCode = `<nx-ranking-list [items]="items"></nx-ranking-list>`;

  basicTs = `items: NxRankingItem[] = [
  { id: 1, rank: 1, name: 'Amelia Chen', avatarUrl: 'https://i.pravatar.cc/40?img=1', value: '$18,420', delta: '+12%' },
  { id: 2, rank: 2, name: 'Marcus Reid', avatarUrl: 'https://i.pravatar.cc/40?img=2', value: '$16,980', delta: '+5%' },
  { id: 3, rank: 3, name: 'Sofia Alvarez', avatarUrl: 'https://i.pravatar.cc/40?img=3', value: '$15,210', delta: '-2%' },
  { id: 4, rank: 4, name: 'Daniel Osei', avatarUrl: 'https://i.pravatar.cc/40?img=4', value: '$12,860' },
  { id: 5, rank: 5, name: 'Priya Nair', avatarUrl: 'https://i.pravatar.cc/40?img=5', value: '$11,340' },
];`;
}
