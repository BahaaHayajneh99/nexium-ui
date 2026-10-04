import { Component, Input } from '@angular/core';
import { NxStatisticDeltaDirection } from '../../data-display/ui-statistic';
import { NxSparkline } from '../../charts/ui-sparkline';

/** A metric card with an inline trend sparkline alongside the value. */
@Component({
  selector: 'nx-sparkline-card',
  standalone: true,
  imports: [NxSparkline],
  templateUrl: './ui-sparkline-card.html',
  styleUrl: './ui-sparkline-card.scss',
})
export class NxSparklineCard {
  @Input() label = '';
  @Input() value: string | number = '';
  @Input() delta = '';
  @Input() direction: NxStatisticDeltaDirection = 'neutral';
  @Input() data: number[] = [];
  @Input() color = 'var(--shell-primary)';
}
