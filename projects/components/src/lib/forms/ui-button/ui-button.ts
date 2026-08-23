import { booleanAttribute, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
export type NxButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link'
  | 'help'
  | 'text'
  | 'ghost'
  | 'transparent'
  | 'disabled'
  | 'default'
  | 'flat'
  | 'raised'
  | 'fab'
  | 'icon'
  | 'toggle'
  | 'outline' 
  | 'rounded' ;
export type NxButtonSize = 'small' | 'medium' | 'large';
@Component({
  selector: 'nx-button',
  standalone: true,
  templateUrl: './ui-button.html',
  imports: [NgClass], 
  styleUrl: './ui-button.scss',
})
export class NxButton {
  @Input()
  variant: NxButtonVariant = 'primary';


  @Input()
  size: NxButtonSize = 'medium';


  @Input({ transform: booleanAttribute })
  disabled:boolean = false;


  @Input({ transform: booleanAttribute })
  raised: boolean = false;


  @Input({ transform: booleanAttribute })
  fab: boolean = false;


  @Input({ transform: booleanAttribute })
  icon: boolean = false;


  @Input({ transform: booleanAttribute })
  fullWidth: boolean = false;

  @Input({ transform: booleanAttribute })
  rounded = false;

  get buttonClasses() {
    return {
      btn: true,
      rounded: this.rounded,
      [this.variant]: true,
      [this.disabled ? 'disabled' : '']: this.disabled,
      [this.size]: true,
      raised: this.raised,
      fab: this.fab,
      icon: this.icon,
      'full-width': this.fullWidth
    };
  }
} 
