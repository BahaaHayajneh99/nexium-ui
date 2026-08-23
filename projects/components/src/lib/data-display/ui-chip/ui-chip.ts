import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

export type NxChipVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

@Component({
  selector: 'nx-chip',
  standalone: true,
  imports: [NgClass,NgIf],
  templateUrl: './ui-chip.html',
  styleUrl: './ui-chip.scss'
})
export class NxChip {

  @Input()
 variant: NxChipVariant = 'primary';

  @Input({ transform: booleanAttribute })
 outlined = false;

  @Input({ transform: booleanAttribute })
  rounded = false;

  @Input({ transform: booleanAttribute })
  removable = false;

  @Input({ transform: booleanAttribute })
  disabled = false;

  @Input({ transform: booleanAttribute })
  selected = false;

  @Output() remove = new EventEmitter<void>();

  removeChip(event: MouseEvent) {

    event.stopPropagation();

    if (!this.disabled) {
      this.remove.emit();
    }

  }


  get chipClasses() {
    return {
      rounded: this.rounded,
      [this.variant]: true,
      [this.disabled ? 'disabled' : '']: this.disabled,
      [this.selected ? 'selected' : '']: this.selected,
      [this.outlined ? 'outlined' : '']: this.outlined
    };
  }

}