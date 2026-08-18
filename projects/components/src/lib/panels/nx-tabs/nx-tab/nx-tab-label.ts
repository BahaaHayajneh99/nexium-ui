import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nxTabLabel]'
})
export class NxTabLabelDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
