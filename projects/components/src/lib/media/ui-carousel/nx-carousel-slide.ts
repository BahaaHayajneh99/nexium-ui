import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nxCarouselSlide]',
  standalone: true,
})
export class NxCarouselSlideDirective {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
