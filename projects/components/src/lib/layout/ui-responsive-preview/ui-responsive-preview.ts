import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface NxResponsiveBreakpoint {
  id: string;
  label: string;
  width: number;
}

export const NX_DEFAULT_BREAKPOINTS: NxResponsiveBreakpoint[] = [
  { id: 'mobile', label: 'Mobile', width: 375 },
  { id: 'tablet', label: 'Tablet', width: 768 },
  { id: 'desktop', label: 'Desktop', width: 1280 },
];

/** Renders projected content inside a fixed-width viewport, switchable between common breakpoints. */
@Component({
  selector: 'nx-responsive-preview',
  standalone: true,
  imports: [],
  templateUrl: './ui-responsive-preview.html',
  styleUrl: './ui-responsive-preview.scss',
})
export class NxResponsivePreview {
  @Input() breakpoints: NxResponsiveBreakpoint[] = NX_DEFAULT_BREAKPOINTS;
  @Input() activeId = NX_DEFAULT_BREAKPOINTS[0].id;

  @Output() activeIdChange = new EventEmitter<string>();

  get activeBreakpoint(): NxResponsiveBreakpoint | undefined {
    return this.breakpoints.find((bp) => bp.id === this.activeId);
  }

  select(id: string): void {
    this.activeId = id;
    this.activeIdChange.emit(id);
  }
}
