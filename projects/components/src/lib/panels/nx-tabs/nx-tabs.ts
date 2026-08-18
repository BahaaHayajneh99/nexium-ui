import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { NxTabComponent } from './nx-tab/nx-tab';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { UiIcon } from '../../data-display/ui-icon';


@Component({
  selector: 'nx-tabs',
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    UiIcon
  ],
  templateUrl: './nx-tabs.html',
  styleUrls: ['./nx-tabs.scss']
})
export class NxTabsComponent implements AfterContentInit {


  @ContentChildren(NxTabComponent)
  tabs!: QueryList<NxTabComponent>;



  @Input()
  variant: 'line' | 'filled' | 'boxed' | 'pill' = 'line';


  @Input()
  size: 'sm' | 'md' | 'lg' = 'md';


  @Input()
  orientation: 'horizontal' | 'vertical' = 'horizontal';


  @Input()
  activeIndex = 0;

  @Input() fullWidth = false;

  @Output()
  activeIndexChange = new EventEmitter<number>();



  ngAfterContentInit() {

    this.selectTab(this.activeIndex);

  }



  selectTab(index: number) {

    const tab = this.tabs.get(index);


    if (!tab || tab.disabled)
      return;


    this.activeIndex = index;

    this.activeIndexChange.emit(index);

  }

}