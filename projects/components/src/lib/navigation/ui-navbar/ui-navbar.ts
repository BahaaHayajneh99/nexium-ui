import { Component, Input, ViewEncapsulation, booleanAttribute } from '@angular/core';

@Component({
  selector: 'nx-navbar',
  standalone: true,
  imports: [],
  templateUrl: './ui-navbar.html',
  styleUrl: './ui-navbar.scss',
  // Unencapsulated so the plain <a> links a consumer projects into
  // [nx-navbar-links] pick up real link styling instead of the browser
  // default - emulated encapsulation can't reach projected content.
  encapsulation: ViewEncapsulation.None,
})
export class UiNavbar {
  @Input({ transform: booleanAttribute }) sticky = false;

  mobileOpen = false;

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }
}
