import { Component, Input, booleanAttribute } from '@angular/core';
import { NxStatistic, NxStatisticDeltaDirection } from '../../data-display/ui-statistic';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxStatisticGroupItem {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  delta?: string;
  direction?: NxStatisticDeltaDirection;
  upIsGood?: boolean;
}

/** A row of `NxStatistic` items separated by vertical dividers - the classic dashboard header stat strip. */
@Component({
  selector: 'nx-statistic-group',
  standalone: true,
  imports: [NxStatistic, NxProLocked],
  templateUrl: './ui-statistic-group.html',
  styleUrl: './ui-statistic-group.scss',
})
export class NxStatisticGroup {
  protected readonly licensed = nxProLicenseGranted();
  @Input() items: NxStatisticGroupItem[] = [];
  @Input({ transform: booleanAttribute }) bordered = true;
}
