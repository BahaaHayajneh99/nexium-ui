import { Component, Input, numberAttribute } from '@angular/core';

export type NxStackDirection = 'vertical' | 'horizontal';
export type NxStackAlign = 'start' | 'center' | 'end' | 'stretch';

const ALIGN_MAP: Record<NxStackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

@Component({
  selector: 'nx-stack',
  standalone: true,
  imports: [],
  template: `
    <div
      class="nx-stack"
      [style.flex-direction]="direction === 'vertical' ? 'column' : 'row'"
      [style.align-items]="alignValue"
      [style.gap.px]="gap">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
    .nx-stack {
      display: flex;
      width: 100%;
    }
  `,
})
export class UiStack {
  @Input() direction: NxStackDirection = 'vertical';
  @Input() align: NxStackAlign = 'stretch';
  @Input({ transform: numberAttribute }) gap = 12;

  get alignValue(): string {
    return ALIGN_MAP[this.align];
  }
}
