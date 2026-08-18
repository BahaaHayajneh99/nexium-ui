import { Component, Input, booleanAttribute } from '@angular/core';
import { NgClass} from '@angular/common';

@Component({
  selector: 'nx-spinner',
  imports: [NgClass],
  templateUrl: './ui-spinner.html',
  styleUrl: './ui-spinner.scss',
})
export class NxSpinnerComponent {
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
  center = false;


  @Input({ transform: booleanAttribute })
  overlay = false;

  get spinnerClasses() {

    return {

      [this.variant]: true,

      [this.size]: true

    };

  }



  get spinnerContainerClasses() {

    return {

      'center': this.center,

      'overlay': this.overlay

    };

  }
}
