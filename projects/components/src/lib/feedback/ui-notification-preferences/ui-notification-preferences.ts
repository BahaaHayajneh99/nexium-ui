import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxSwitch } from '../../forms/ui-switch';

export interface NxNotificationChannel {
  key: string;
  label: string;
}

export interface NxNotificationCategory {
  key: string;
  label: string;
  description?: string;
}

/** A settings matrix letting a user toggle notification delivery per category x channel (e.g. "Comments" x "Email"). */
@Component({
  selector: 'nx-notification-preferences',
  standalone: true,
  imports: [NxProLocked, NxSwitch],
  templateUrl: './ui-notification-preferences.html',
  styleUrl: './ui-notification-preferences.scss',
})
export class NxNotificationPreferences {
  protected readonly licensed = nxProLicenseGranted();

  @Input() categories: NxNotificationCategory[] = [];
  @Input() channels: NxNotificationChannel[] = [];
  /** Keyed `values[categoryKey][channelKey]`. */
  @Input() values: Record<string, Record<string, boolean>> = {};

  @Output() valuesChange = new EventEmitter<Record<string, Record<string, boolean>>>();

  cellValue(categoryKey: string, channelKey: string): boolean {
    return this.values[categoryKey]?.[channelKey] ?? false;
  }

  onToggle(categoryKey: string, channelKey: string, checked: boolean): void {
    const next: Record<string, Record<string, boolean>> = {};
    for (const category of this.categories) {
      next[category.key] = { ...this.values[category.key] };
    }
    next[categoryKey] = { ...next[categoryKey], [channelKey]: checked };
    this.values = next;
    this.valuesChange.emit(next);
  }
}
