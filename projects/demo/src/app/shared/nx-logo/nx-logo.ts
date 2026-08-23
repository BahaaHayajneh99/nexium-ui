import { booleanAttribute, Component, HostBinding, Input } from '@angular/core';

// Inline brand mark (vs. the static assets/images/logo.svg) so its colors
// react live to the app's data-theme toggle via CSS custom properties -
// an externally-loaded <img>/favicon SVG can't see the host page's vars.
@Component({
  selector: 'app-nx-logo',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 260 56"
      width="100%"
      [attr.height]="fill ? '100%' : null"
      [attr.preserveAspectRatio]="fill ? 'xMidYMid slice' : null"
      xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="42" font-family="System-UI, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="42" letter-spacing="-1.5">
        <tspan fill="var(--shell-primary)">N</tspan><tspan fill="var(--shell-text)">e</tspan><tspan fill="var(--shell-primary)">x</tspan><tspan fill="var(--shell-text)">iumUI</tspan>
      </text>
      <g transform="translate(216, 18)">
        <rect x="0" y="0" width="36" height="24" rx="8" fill="var(--shell-primary)" />
        <text x="18" y="17" font-family="System-UI, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="14" fill="#FFFFFF" text-anchor="middle" letter-spacing="0.5">UI</text>
      </g>
    </svg>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    :host.fill {
      height: 100%;
    }
  `,
})
export class NxLogo {
  // true fills/crops its container (e.g. inside a fixed-size nx-avatar);
  // false (default) keeps its own aspect ratio (e.g. inside nx-card-image).
  @Input({ transform: booleanAttribute })
  fill = false;

  @HostBinding('class.fill')
  get fillClass(): boolean {
    return this.fill;
  }
}
