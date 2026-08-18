import { Injectable, signal } from '@angular/core';

export type NxToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface NxToastMessage {
  id: number;
  message: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
  duration: number;
  position: NxToastPosition;
}

@Injectable({ providedIn: 'root' })
export class NxToastService {
  private nextId = 0;
  readonly toasts = signal<NxToastMessage[]>([]);

  show(
    message: string,
    variant: NxToastMessage['variant'] = 'info',
    duration = 3000,
    position: NxToastPosition = 'top-right'
  ): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, message, variant, duration, position }]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }
}
