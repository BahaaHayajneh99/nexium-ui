import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

export type NxFabPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface NxFabAction {
  icon: string;
  label: string;
}

/**
 * A circular, fixed-position floating action button. With no `actions`, a click just emits
 * `clicked`. With `actions` set, it becomes a "speed dial": clicking toggles open a vertical
 * stack of secondary action buttons (each revealing its label on hover), and picking one emits
 * `actionSelected` and closes the stack back up.
 */
@Component({
  selector: 'nx-fab',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-fab.html',
  styleUrl: './ui-fab.scss',
})
export class NxFab {
  @Input() position: NxFabPosition = 'bottom-right';
  @Input() icon = 'nx-plus';
  @Input() actions: NxFabAction[] = [];

  @Output() clicked = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<NxFabAction>();

  readonly open = signal(false);

  get hasActions(): boolean {
    return this.actions.length > 0;
  }

  onMainClick(): void {
    if (this.hasActions) {
      this.open.update((isOpen) => !isOpen);
      return;
    }
    this.clicked.emit();
  }

  selectAction(action: NxFabAction): void {
    this.actionSelected.emit(action);
    this.open.set(false);
  }
}
