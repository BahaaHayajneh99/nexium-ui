import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  booleanAttribute,
} from '@angular/core';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

@Component({
  selector: 'nx-modal',
  standalone: true,
  imports: [],
  templateUrl: './ui-modal.html',
  styleUrl: './ui-modal.scss',
})
export class UiModal implements OnChanges {
  @Input({ transform: booleanAttribute }) open = false;
  @Input() header = '';
  @Input({ transform: booleanAttribute }) closeOnBackdropClick = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('panel') private panelRef?: ElementRef<HTMLElement>;

  private previouslyFocused: HTMLElement | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open']) {
      return;
    }

    if (this.open) {
      this.previouslyFocused = document.activeElement as HTMLElement | null;
      queueMicrotask(() => this.focusFirst());
    } else {
      this.previouslyFocused?.focus();
      this.previouslyFocused = null;
    }
  }

  close(): void {
    this.open = false;
    this.openChange.emit(false);
    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdropClick) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) {
      this.close();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTab(domEvent: Event): void {
    if (!this.open || !this.panelRef) {
      return;
    }

    const event = domEvent as KeyboardEvent;
    const focusable = Array.from(this.panelRef.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusable.length === 0) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    } else if (!this.panelRef.nativeElement.contains(active)) {
      // Focus escaped the panel entirely (e.g. programmatic focus elsewhere) - pull it back in.
      event.preventDefault();
      first.focus();
    }
  }

  private focusFirst(): void {
    if (!this.panelRef) {
      return;
    }

    const focusable = this.panelRef.nativeElement.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusable ?? this.panelRef.nativeElement).focus();
  }
}
