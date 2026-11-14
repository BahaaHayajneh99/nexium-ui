import {
  booleanAttribute,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { NxIcon } from '../../data-display/ui-icon';

export type NxSplitButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface NxSplitButtonAction {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'nx-split-button',
  standalone: true,
  imports: [NgClass, NxIcon],
  templateUrl: './ui-split-button.html',
  styleUrl: './ui-split-button.scss',
})
export class NxSplitButton {
  @Input()
  label = '';

  @Input()
  variant: NxSplitButtonVariant = 'primary';

  @Input({ transform: booleanAttribute })
  disabled = false;

  @Input()
  actions: NxSplitButtonAction[] = [];

  @Output()
  primaryClick = new EventEmitter<void>();

  @Output()
  actionSelected = new EventEmitter<string>();

  isOpen = signal(false);

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  get buttonClasses() {
    return {
      [this.variant]: true,
      disabled: this.disabled,
    };
  }

  onPrimaryClick(): void {
    if (this.disabled) {
      return;
    }

    this.primaryClick.emit();
  }

  toggleMenu(): void {
    if (this.disabled) {
      return;
    }

    this.isOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isOpen.set(false);
  }

  selectAction(action: NxSplitButtonAction): void {
    if (action.disabled) {
      return;
    }

    this.actionSelected.emit(action.value);
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) {
      return;
    }

    const target = event.target as Node | null;

    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
