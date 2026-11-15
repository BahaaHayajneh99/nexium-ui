import { Component, Input, booleanAttribute } from '@angular/core';
import { NgIf } from '@angular/common';
import { NxSpinnerComponent } from '../../data-display/ui-spinner';

/** A generic dashboard tile shell: title bar with an actions slot, plus loading/error/content states. */
@Component({
  selector: 'nx-dashboard-widget',
  standalone: true,
  imports: [NgIf, NxSpinnerComponent],
  templateUrl: './ui-dashboard-widget.html',
  styleUrl: './ui-dashboard-widget.scss',
})
export class NxDashboardWidget {
  @Input() title = '';
  @Input({ transform: booleanAttribute }) loading = false;
  @Input() error = '';
}
