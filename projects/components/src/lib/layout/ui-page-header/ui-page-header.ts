import { Component, Input } from '@angular/core';

/**
 * A page-level header: title/description block plus slots for a breadcrumb
 * above it, actions to the right, and a tab strip below.
 */
@Component({
  selector: 'nx-page-header',
  standalone: true,
  imports: [],
  templateUrl: './ui-page-header.html',
  styleUrl: './ui-page-header.scss',
})
export class NxPageHeader {
  @Input() title = '';
  @Input() description = '';
}
