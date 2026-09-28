import { Component, Input } from '@angular/core';
import { NxAvatar } from '../../data-display/ui-avatar';
import { NxRankingItem } from '../ui-ranking-list';

const MEDAL_CLASS: Record<number, string> = { 1: 'gold', 2: 'silver', 3: 'bronze' };

/** A leaderboard variant of `NxRankingList`, with medal styling for the top 3 ranks. */
@Component({
  selector: 'nx-leaderboard',
  standalone: true,
  imports: [NxAvatar],
  templateUrl: './ui-leaderboard.html',
  styleUrl: './ui-leaderboard.scss',
})
export class NxLeaderboard {
  @Input() items: NxRankingItem[] = [];

  medalClass(rank: number): string {
    return MEDAL_CLASS[rank] ?? '';
  }
}
