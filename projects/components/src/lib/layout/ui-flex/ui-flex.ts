import { Component, Input, numberAttribute, booleanAttribute } from '@angular/core';

export type NxFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type NxFlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type NxFlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

const ALIGN_MAP: Record<NxFlexAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const JUSTIFY_MAP: Record<NxFlexJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

@Component({
  selector: 'nx-flex',
  standalone: true,
  imports: [],
  template: `
    <div
      class="nx-flex"
      [style.flex-direction]="direction"
      [style.align-items]="alignValue"
      [style.justify-content]="justifyValue"
      [style.flex-wrap]="wrap ? 'wrap' : 'nowrap'"
      [style.gap.px]="gap">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
    .nx-flex {
      display: flex;
      width: 100%;
    }
  `,
})
export class NxFlex {
  @Input() direction: NxFlexDirection = 'row';
  @Input() align: NxFlexAlign = 'stretch';
  @Input() justify: NxFlexJustify = 'start';
  @Input({ transform: booleanAttribute }) wrap = false;
  @Input({ transform: numberAttribute }) gap = 0;

  get alignValue(): string {
    return ALIGN_MAP[this.align];
  }

  get justifyValue(): string {
    return JUSTIFY_MAP[this.justify];
  }
}
