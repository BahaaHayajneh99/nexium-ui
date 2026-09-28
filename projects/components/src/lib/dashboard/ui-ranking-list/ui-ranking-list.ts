import { Component, Input } from '@angular/core';
import { NxAvatar } from '../../data-display/ui-avatar';

export interface NxRankingItem {
  id: string | number;
  rank: number;
  name: string;
  avatarUrl?: string;
  value: string | number;
  delta?: string;
}

/** A ranked list of items - rank, avatar, name, value, and an optional delta badge. */
@Component({
  selector: 'nx-ranking-list',
  standalone: true,
  imports: [NxAvatar],
  templateUrl: './ui-ranking-list.html',
  styleUrl: './ui-ranking-list.scss',
})
export class NxRankingList {
  @Input() items: NxRankingItem[] = [];
}
