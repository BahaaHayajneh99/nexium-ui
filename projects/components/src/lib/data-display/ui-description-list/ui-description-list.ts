import { Component, Input } from '@angular/core';

export interface NxDescriptionItem {
  term: string;
  definition: string;
  /** How many grid columns this item's definition spans, out of `columns`. Defaults to 1. */
  span?: number;
}

/** A term/definition property grid - pass `columns` to wrap into a multi-column layout instead of a single stacked list. */
@Component({
  selector: 'nx-description-list',
  standalone: true,
  imports: [],
  templateUrl: './ui-description-list.html',
  styleUrl: './ui-description-list.scss',
})
export class NxDescriptionList {
  @Input() items: NxDescriptionItem[] = [];
  @Input() columns = 1;
  @Input() bordered = true;
}
