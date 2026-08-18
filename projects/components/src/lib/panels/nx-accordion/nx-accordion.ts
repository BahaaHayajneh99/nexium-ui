import { booleanAttribute, Component, Input, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nx-accordion',
  imports: [NgClass],
  templateUrl: './nx-accordion.html',
  styleUrl: './nx-accordion.scss',
  encapsulation:ViewEncapsulation.None
})
export class NxAccordionComponent {


  @Input({ transform: booleanAttribute })
  multiple = false;


  @Input()
  variant:
    | 'default'
    | 'flat' = 'default';



  get accordionClasses(): string[] {

    return [

      `nx-accordion-${this.variant}`,

      this.multiple ? 'multiple' : ''

    ];

  }
}
