import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'nx-progress-bar',
  imports: [NgClass,NgStyle,NgIf],
  templateUrl: './ui-progress-bar.html',
  styleUrl: './ui-progress-bar.scss',
})
export class UiProgressBarComponent {


  @Input()
  value = 0;


  @Input()
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light' = 'primary';



  @Input()
  size:
    | 'small'
    | 'medium'
    | 'large' = 'medium';



  @Input({ transform: booleanAttribute })
  rounded = false;



  @Input({ transform: booleanAttribute })
  striped = false;



  @Input({ transform: booleanAttribute })
  animated = false;



  @Input({ transform: booleanAttribute })
  showLabel = false;



  @Input()
  label?: string;



  get progressClasses() {

    return { 
      [this.size]: true,

      'rounded': this.rounded, 
    };

  }

  get progressValueClass() {

    return {

      [this.variant]: true,
      [this.striped ? 'striped' : '']: this.striped,
      [this.animated ? 'animated' : '']: this.animated

    };

  }

}