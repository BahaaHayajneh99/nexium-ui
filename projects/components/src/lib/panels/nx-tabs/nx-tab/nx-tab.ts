import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { NxTabLabelDirective } from './nx-tab-label';

@Component({
  selector: 'nx-tab',
  template: `
    <ng-template #content>

        <ng-content></ng-content>

    </ng-template>
  `
})
export class NxTabComponent {


  @Input()
  label!: string;


  @Input()
  disabled = false;


  @Input()
  icon?: string;


  @Input()
  badge?: string;


  @ContentChild(NxTabLabelDirective)
  labelTemplate?: NxTabLabelDirective;


  @ViewChild('content', { static: true })
  template!: TemplateRef<any>;

}