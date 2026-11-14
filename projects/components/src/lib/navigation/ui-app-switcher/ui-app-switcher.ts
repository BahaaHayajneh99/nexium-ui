import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxAppSwitcherItem {
  label: string;
  icon: string;
  url: string;
}

/**
 * A "grid of 9 dots" trigger button (in the style of Google's app launcher) that toggles open a
 * popover grid of app tiles - icon + label per tile. Entirely presentation/emission: clicking a
 * tile emits `appSelected` with that item and closes the popover; the host decides what to do with
 * it (e.g. `window.open`, router navigation). Clicking outside the component also closes it.
 */
@Component({
  selector: 'nx-app-switcher',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-app-switcher.html',
  styleUrl: './ui-app-switcher.scss',
})
export class NxAppSwitcher {
  protected readonly licensed = nxProLicenseGranted();

  @Input() apps: NxAppSwitcherItem[] = [];
  @Input() triggerLabel = 'Apps';

  @Output() appSelected = new EventEmitter<NxAppSwitcherItem>();

  protected open = false;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  toggle(): void {
    this.open = !this.open;
  }

  close(): void {
    this.open = false;
  }

  selectApp(app: NxAppSwitcherItem): void {
    this.appSelected.emit(app);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.close();
  }
}
