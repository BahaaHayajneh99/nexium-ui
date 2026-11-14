import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxValidationError {
  field: string;
  label: string;
  message: string;
}

/** A panel that lists every current form-field error in one place, each entry clickable so the consumer can focus the offending field. */
@Component({
  selector: 'nx-form-validation-summary',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-form-validation-summary.html',
  styleUrl: './ui-form-validation-summary.scss',
})
export class NxFormValidationSummary {
  @Input() errors: NxValidationError[] = [];
  @Input() title = 'Please fix the following errors';

  /** Emitted when an error row is clicked. The consumer is responsible for focusing the real field using `error.field`. */
  @Output() errorClick = new EventEmitter<NxValidationError>();

  onRowClick(error: NxValidationError): void {
    this.errorClick.emit(error);
  }
}
