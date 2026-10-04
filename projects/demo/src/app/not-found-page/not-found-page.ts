import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NxNotFound } from '../../../../../dist/components';

/**
 * Catch-all page for any URL that doesn't match a route - wired up via the
 * `**` wildcard route, which must stay last in app.routes.ts.
 */
@Component({
  selector: 'app-not-found-page',
  imports: [NxNotFound],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
})
export class NotFoundPage {
  private router = inject(Router);

  goHome(): void {
    this.router.navigateByUrl('/getting-started');
  }
}
