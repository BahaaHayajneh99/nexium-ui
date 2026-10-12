import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxIntegrationStatus = 'connected' | 'disconnected' | 'error';

/**
 * A single tile for a third-party integration/connector (Slack, GitHub, Stripe, ...) in a
 * settings/integrations page - logo, name, short description, a status badge, and a primary
 * action that toggles between "Connect" and "Disconnect" depending on `status`. An optional
 * "Configure" action only shows up once connected. The logo can be a named icon via `icon`, or
 * any custom markup (an `<img>`, an inline SVG, ...) projected into the `[icon]` slot.
 */
@Component({
  selector: 'nx-integration-card',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-integration-card.html',
  styleUrl: './ui-integration-card.scss',
})
export class NxIntegrationCard {
  protected readonly licensed = nxProLicenseGranted();

  @Input() name = '';
  @Input() description = '';
  @Input() icon = '';
  @Input() status: NxIntegrationStatus = 'disconnected';
  @Input({ transform: booleanAttribute }) configurable = true;

  @Output() connect = new EventEmitter<void>();
  @Output() disconnect = new EventEmitter<void>();
  @Output() configure = new EventEmitter<void>();

  get statusLabel(): string {
    switch (this.status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Error';
      default:
        return 'Disconnected';
    }
  }

  onPrimaryAction(): void {
    if (this.status === 'connected') {
      this.disconnect.emit();
      return;
    }
    this.connect.emit();
  }
}
