import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NxIcon } from '../../../../dist/components';
import { Nav } from './component/nav';
import { ThemeCustomizer } from './component/theme-customizer/theme-customizer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, ThemeCustomizer, NxIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('demo');

  mobileNavOpen = signal(false);

  constructor(router: Router) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.mobileNavOpen.set(false);
    });
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }
}
