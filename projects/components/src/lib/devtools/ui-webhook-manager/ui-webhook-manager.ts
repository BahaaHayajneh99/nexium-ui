import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxWebhookEndpoint {
  id: string | number;
  url: string;
  /** Subscribed event type keys - matched against `availableEvents[].value`. */
  events: string[];
  enabled: boolean;
  lastDeliveryStatus?: 'success' | 'failed';
  /** ISO timestamp of the last delivery attempt. */
  lastDeliveryAt?: string;
}

export interface NxWebhookEventOption {
  label: string;
  value: string;
}

/**
 * A list of configured webhook endpoints - URL, subscribed event badges, an enabled/disabled
 * toggle, last delivery status, and per-row "Send test ping"/delete actions - plus an inline form
 * for adding a new endpoint (URL + a checklist of subscribable event types). Entirely
 * presentation/emission: every action (add, toggle, test ping, delete) is emitted for the host to
 * carry out and reflect back into `webhooks`.
 */
@Component({
  selector: 'nx-webhook-manager',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-webhook-manager.html',
  styleUrl: './ui-webhook-manager.scss',
})
export class NxWebhookManager {
  protected readonly licensed = nxProLicenseGranted();

  @Input() webhooks: NxWebhookEndpoint[] = [];
  @Input() availableEvents: NxWebhookEventOption[] = [];

  @Output() addWebhook = new EventEmitter<{ url: string; events: string[] }>();
  @Output() toggleEnabled = new EventEmitter<{ id: string | number; enabled: boolean }>();
  @Output() testPing = new EventEmitter<string | number>();
  @Output() deleteWebhook = new EventEmitter<string | number>();

  protected readonly addingWebhook = signal(false);
  protected readonly draftUrl = signal('');
  protected readonly draftEvents = signal<Set<string>>(new Set());
  /** The row currently showing the "Sending..." state - cleared a moment after the ping is emitted, purely a local UI affordance. */
  protected readonly pingingId = signal<string | number | null>(null);

  startAdd(): void {
    this.addingWebhook.set(true);
    this.draftUrl.set('');
    this.draftEvents.set(new Set());
  }

  cancelAdd(): void {
    this.addingWebhook.set(false);
  }

  isDraftEventSelected(value: string): boolean {
    return this.draftEvents().has(value);
  }

  toggleDraftEvent(value: string): void {
    this.draftEvents.update((set) => {
      const next = new Set(set);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  }

  get canSubmitAdd(): boolean {
    return this.draftUrl().trim().length > 0 && this.draftEvents().size > 0;
  }

  submitAdd(): void {
    const url = this.draftUrl().trim();
    const events = Array.from(this.draftEvents());
    if (!url || events.length === 0) return;
    this.addWebhook.emit({ url, events });
    this.addingWebhook.set(false);
    this.draftUrl.set('');
    this.draftEvents.set(new Set());
  }

  onTestPing(id: string | number): void {
    this.pingingId.set(id);
    this.testPing.emit(id);
    setTimeout(() => {
      if (this.pingingId() === id) this.pingingId.set(null);
    }, 1200);
  }

  onToggle(webhook: NxWebhookEndpoint): void {
    this.toggleEnabled.emit({ id: webhook.id, enabled: !webhook.enabled });
  }

  formatDate(iso?: string): string {
    if (!iso) return '-';
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  eventLabel(value: string): string {
    return this.availableEvents.find((e) => e.value === value)?.label ?? value;
  }
}
