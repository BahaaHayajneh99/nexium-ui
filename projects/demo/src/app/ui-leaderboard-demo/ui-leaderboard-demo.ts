import { Component } from '@angular/core';
import { NxLeaderboard, NxRankingItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-leaderboard-demo',
  imports: [NxLeaderboard, DemoSection],
  templateUrl: './ui-leaderboard-demo.html',
  styleUrl: './ui-leaderboard-demo.scss',
})
export class UiLeaderboardDemo {
  importCode = `import { NxLeaderboard } from 'nexium-ui';`;

  items: NxRankingItem[] = [
    { id: 1, rank: 1, name: 'Amelia Chen', avatarUrl: 'https://i.pravatar.cc/40?img=1', value: '18,420 pts' },
    { id: 2, rank: 2, name: 'Marcus Reid', avatarUrl: 'https://i.pravatar.cc/40?img=2', value: '16,980 pts' },
    { id: 3, rank: 3, name: 'Sofia Alvarez', avatarUrl: 'https://i.pravatar.cc/40?img=3', value: '15,210 pts' },
    { id: 4, rank: 4, name: 'Daniel Osei', avatarUrl: 'https://i.pravatar.cc/40?img=4', value: '12,860 pts' },
    { id: 5, rank: 5, name: 'Priya Nair', avatarUrl: 'https://i.pravatar.cc/40?img=5', value: '11,340 pts' },
    { id: 6, rank: 6, name: 'Tomas Vidal', avatarUrl: 'https://i.pravatar.cc/40?img=6', value: '9,720 pts' },
  ];

  basicCode = `<nx-leaderboard [items]="items"></nx-leaderboard>`;

  basicTs = `// ranks 1-3 automatically get gold/silver/bronze medal styling - items reuses the same NxRankingItem type as nx-ranking-list.
items: NxRankingItem[] = [
  { id: 1, rank: 1, name: 'Amelia Chen', avatarUrl: 'https://i.pravatar.cc/40?img=1', value: '18,420 pts' },
  { id: 2, rank: 2, name: 'Marcus Reid', avatarUrl: 'https://i.pravatar.cc/40?img=2', value: '16,980 pts' },
  { id: 3, rank: 3, name: 'Sofia Alvarez', avatarUrl: 'https://i.pravatar.cc/40?img=3', value: '15,210 pts' },
  { id: 4, rank: 4, name: 'Daniel Osei', avatarUrl: 'https://i.pravatar.cc/40?img=4', value: '12,860 pts' },
  { id: 5, rank: 5, name: 'Priya Nair', avatarUrl: 'https://i.pravatar.cc/40?img=5', value: '11,340 pts' },
  { id: 6, rank: 6, name: 'Tomas Vidal', avatarUrl: 'https://i.pravatar.cc/40?img=6', value: '9,720 pts' },
];`;
}
