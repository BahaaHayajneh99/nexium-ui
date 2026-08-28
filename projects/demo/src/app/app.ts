import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NxIcon } from '../../../../dist/components';
import { Nav } from './component/nav';
import { ThemeCustomizer } from './component/theme-customizer/theme-customizer';
import { VisitorTrackingService } from './services/visitor-tracking.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, ThemeCustomizer, NxIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('demo');

  mobileNavOpen = signal(false);

  constructor(router: Router, private visitorTracking: VisitorTrackingService) {
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.mobileNavOpen.set(false);
    });
  }

  ngOnInit(): void {
    // Track visitor on app load
    this.trackVisitor();
  }

  private trackVisitor(): void {
    // Get or create unique visitor ID from localStorage
    let visitorId = localStorage.getItem('nexaui_visitor_id');
    
    if (!visitorId) {
      // Generate unique ID for new visitor (in production, use user ID after login)
      visitorId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('nexaui_visitor_id', visitorId);
    }

    // Track as unique visitor in Firebase with location data
    this.visitorTracking.trackUniqueVisitor(visitorId).then(() => {
      // Get visitors by country/location
      this.visitorTracking.getVisitorsByCountry();
    });
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }
}
