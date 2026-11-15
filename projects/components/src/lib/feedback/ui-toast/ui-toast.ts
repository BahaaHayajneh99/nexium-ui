import { Component, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NxToastMessage, NxToastPosition, NxToastService } from './toast.service';

@Component({
  selector: 'nx-toast-container',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './ui-toast.html',
  styleUrl: './ui-toast.scss',
})
export class NxToastContainer {
  private toastService = inject(NxToastService);
  toasts = this.toastService.toasts;

  readonly positions: NxToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  toastsFor(position: NxToastPosition): NxToastMessage[] {
    return this.toasts().filter((toast) => toast.position === position);
  }

  trackByPosition(index: number, position: NxToastPosition): NxToastPosition {
    return position;
  }

  trackByToastId(index: number, toast: NxToastMessage): number {
    return toast.id;
  }

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
