import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NxIcon } from '../../../../dist/components';
import { Nav } from './component/nav';
import { Footer } from './component/footer/footer';
import { SiteHeader } from './component/site-header/site-header';
import { ThemeCustomizer } from './component/theme-customizer/theme-customizer';
import { SeoService } from './services/seo.service';
import { VisitorTrackingService } from './services/visitor-tracking.service';

// A same-page anchor click (e.g. href="#categories" on the landing page) changes the URL to
// "/#categories" without an actual route change - an exact "=== '/'" check would wrongly treat
// that as a different route and flip the docs sidebar chrome on. Comparing only the path portion
// (before any "#" or "?") keeps the landing route recognized regardless of its fragment.
function isRootUrl(url: string): boolean {
  return url.split('#')[0].split('?')[0] === '/';
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, SiteHeader, ThemeCustomizer, NxIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('demo');

  mobileNavOpen = signal(false);

  // The showcase app supplies its own full-page layout (see ShowcaseLayout) - it must not be
  // wrapped in the docs site's own sidebar/chrome, so app.html hides that chrome on these routes.
  isShowcaseRoute = signal(false);

  // The marketing landing page (root route) is also a full-bleed page with its own header,
  // not the docs sidebar shell.
  isLandingRoute = signal(false);

  constructor(
    router: Router,
    private visitorTracking: VisitorTrackingService,
    private seo: SeoService,
  ) {
    this.isShowcaseRoute.set(router.url.startsWith('/showcase'));
    this.isLandingRoute.set(isRootUrl(router.url));
    this.seo.apply(router.url);
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.mobileNavOpen.set(false);
      const url = (event as NavigationEnd).urlAfterRedirects;
      this.isShowcaseRoute.set(url.startsWith('/showcase'));
      this.isLandingRoute.set(isRootUrl(url));
      this.seo.apply(url);
    });
  }

  ngOnInit(): void {
    // Track visitor on app load
    this.trackVisitor();
  }

  private trackVisitor(): void {
    this.visitorTracking.trackUniqueVisitor();
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }
}
