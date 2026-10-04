import { Component, Input, booleanAttribute } from '@angular/core';
import { NxSpinnerComponent } from '../../data-display/ui-spinner';

/** A generic dashboard tile shell: title bar with an actions slot, plus loading/error/content states. */
@Component({
  selector: 'nx-dashboard-widget',
  standalone: true,
  imports: [NxSpinnerComponent],
  templateUrl: './ui-dashboard-widget.html',
  styleUrl: './ui-dashboard-widget.scss',
})
export class NxDashboardWidget {
  @Input() title = '';
  @Input({ transform: booleanAttribute }) loading = false;
  @Input() error = '';
}
