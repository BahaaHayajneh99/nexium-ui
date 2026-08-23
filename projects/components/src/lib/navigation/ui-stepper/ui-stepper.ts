import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

export interface NxStep {
  label: string;
}

@Component({
  selector: 'nx-stepper',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ui-stepper.html',
  styleUrl: './ui-stepper.scss',
})
export class NxStepper {
  @Input() steps: NxStep[] = [];
  @Input() activeIndex = 0;

  @Output() activeIndexChange = new EventEmitter<number>();

  goToStep(index: number): void {
    this.activeIndex = index;
    this.activeIndexChange.emit(index);
  }
}
