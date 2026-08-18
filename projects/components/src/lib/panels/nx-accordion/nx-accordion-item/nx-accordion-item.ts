import { NgClass, NgIf } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'nx-accordion-item',
  imports: [NgClass,NgIf],
  templateUrl: './nx-accordion-item.html',
  styleUrl: './nx-accordion-item.scss',
})
export class NxAccordionItemComponent {


  @Input({ transform: booleanAttribute })
  expanded = false;


  @Input({ transform: booleanAttribute })
  disabled = false;



  toggle(): void {

    if (this.disabled) {
      return;
    }


    this.expanded = !this.expanded;

  }



  get itemClasses(): string[] {

    return [

      this.expanded ? 'expanded' : '',

      this.disabled ? 'disabled' : ''

    ];

  }
}
