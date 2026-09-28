import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

export type NxConnectionState = 'online' | 'offline';
export type NxConnectionStatusDisplay = 'pill' | 'banner';

/**
 * Reports the browser's connectivity - as a small inline pill (drop it in a
 * navbar or status bar), or as a full-width banner that appears while
 * offline and briefly flashes "back online" on reconnect. Auto-detects via
 * `navigator.onLine` and the `online`/`offline` window events; pass
 * `status` to drive it manually instead (e.g. from your own API health
 * check).
 */
@Component({
  selector: 'nx-connection-status',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-connection-status.html',
  styleUrl: './ui-connection-status.scss',
})
export class NxConnectionStatus implements OnInit, OnChanges, OnDestroy {
  @Input() display: NxConnectionStatusDisplay = 'pill';
  @Input() status: NxConnectionState | null = null;
  @Input() onlineMessage = 'Back online';
  @Input() offlineMessage = "You're offline - some features may not work.";

  currentStatus = signal<NxConnectionState>('online');
  private justReconnected = signal(false);
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private autoDetecting = false;

  private readonly boundOnline = () => this.applyStatus('online');
  private readonly boundOffline = () => this.applyStatus('offline');

  ngOnInit(): void {
    if (this.status) {
      this.currentStatus.set(this.status);
      return;
    }

    this.autoDetecting = true;
    this.currentStatus.set(typeof navigator !== 'undefined' && !navigator.onLine ? 'offline' : 'online');
    window.addEventListener('online', this.boundOnline);
    window.addEventListener('offline', this.boundOffline);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Only react to a *later* change here - the very first assignment is
    // already handled by ngOnInit (which also decides whether to fall back
    // to auto-detection when `status` isn't set at all). Routed through
    // applyStatus() so a manually-driven offline -> online transition gets
    // the same "just reconnected" flash as auto-detection does.
    if (changes['status'] && !changes['status'].firstChange && this.status) {
      this.applyStatus(this.status);
    }
  }

  ngOnDestroy(): void {
    if (this.autoDetecting) {
      window.removeEventListener('online', this.boundOnline);
      window.removeEventListener('offline', this.boundOffline);
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
  }

  get bannerVisible(): boolean {
    return this.currentStatus() === 'offline' || this.justReconnected();
  }

  get bannerVariant(): 'danger' | 'success' {
    return this.currentStatus() === 'offline' ? 'danger' : 'success';
  }

  get bannerMessage(): string {
    return this.currentStatus() === 'offline' ? this.offlineMessage : this.onlineMessage;
  }

  private applyStatus(status: NxConnectionState): void {
    const wasOffline = this.currentStatus() === 'offline';
    this.currentStatus.set(status);

    if (status === 'online' && wasOffline) {
      this.justReconnected.set(true);
      if (this.reconnectTimer) {
        clearTimeout(this.reconnectTimer);
      }
      this.reconnectTimer = setTimeout(() => this.justReconnected.set(false), 3000);
    }
  }
}
