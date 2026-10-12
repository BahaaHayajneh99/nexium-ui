import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

const DEFAULT_IDLE_TIMEOUT_MS = 15 * 60 * 1000;
const DEFAULT_WARNING_DURATION_MS = 60 * 1000;
const DEFAULT_ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart'];

/** Minimum time between idle-timer resets while activity events are flooding in (e.g. scroll/mousemove). */
const ACTIVITY_THROTTLE_MS = 1000;

/**
 * A session-expiration warning dialog - invisible while the user is active, then shows a modal
 * countdown warning after `idleTimeoutMs` of no activity, giving the user a chance to "Stay
 * signed in" (resets the idle timer) or "Sign out" immediately. If the countdown in the warning
 * reaches zero with no action, `sessionExpired` fires automatically. Reuses the same modal/backdrop
 * chrome as `nx-modal`/`nx-unsaved-changes-dialog`, with a focus-friendly dialog role.
 */
@Component({
  selector: 'nx-session-timeout',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-session-timeout.html',
  styleUrl: './ui-session-timeout.scss',
})
export class NxSessionTimeout implements OnInit, OnChanges, OnDestroy {
  protected readonly licensed = nxProLicenseGranted();

  /** How long with no user activity before the warning dialog shows. */
  @Input() idleTimeoutMs = DEFAULT_IDLE_TIMEOUT_MS;
  /** How long the countdown inside the warning dialog runs before auto-expiring. */
  @Input() warningDurationMs = DEFAULT_WARNING_DURATION_MS;
  /** Set false to fully disable idle-tracking (e.g. a login page with no session to protect yet). */
  @Input() active = true;
  /** DOM event names on `document` that count as "user is active" and reset the idle timer. */
  @Input() activityEvents: string[] = DEFAULT_ACTIVITY_EVENTS;

  /** The countdown hit zero with no action taken - treat the session as expired. */
  @Output() sessionExpired = new EventEmitter<void>();
  /** The user clicked "Stay signed in" - the idle timer has been reset and the dialog closed. */
  @Output() extended = new EventEmitter<void>();
  /** The user clicked "Sign out" explicitly. */
  @Output() signedOut = new EventEmitter<void>();

  open = false;
  remainingMs = 0;

  private idleTimer?: ReturnType<typeof setTimeout>;
  private countdownInterval?: ReturnType<typeof setInterval>;
  private warningDeadline = 0;
  private lastActivityResetAt = 0;
  private boundOnActivity = () => this.onActivity();
  private listenersBound: string[] = [];

  get formattedRemaining(): string {
    return this.formatMmSs(this.remainingMs);
  }

  ngOnInit(): void {
    if (this.active) {
      this.bindActivityListeners();
      this.resetIdleTimer();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['active'] && !changes['active'].firstChange) {
      if (this.active) {
        this.bindActivityListeners();
        this.resetIdleTimer();
      } else {
        this.unbindActivityListeners();
        this.clearTimers();
        this.open = false;
      }
    }

    if (changes['activityEvents'] && !changes['activityEvents'].firstChange && this.active) {
      this.unbindActivityListeners();
      this.bindActivityListeners();
    }
  }

  ngOnDestroy(): void {
    this.unbindActivityListeners();
    this.clearTimers();
  }

  /** User clicked "Stay signed in": close the warning and start the idle window over. */
  stayActive(): void {
    this.open = false;
    this.clearTimers();
    if (this.active) {
      this.resetIdleTimer();
    }
    this.extended.emit();
  }

  /** User clicked "Sign out": close the warning and emit immediately, no countdown involved. */
  signOut(): void {
    this.open = false;
    this.clearTimers();
    this.signedOut.emit();
  }

  private onActivity(): void {
    if (!this.active || this.open) {
      // Once the warning dialog is showing, only the explicit "Stay signed in" button should
      // reset the timer - otherwise an incidental scroll/click behind the dialog would silently
      // dismiss a warning the user never consciously acknowledged.
      return;
    }

    const now = Date.now();
    if (now - this.lastActivityResetAt < ACTIVITY_THROTTLE_MS) {
      return;
    }
    this.lastActivityResetAt = now;
    this.resetIdleTimer();
  }

  private resetIdleTimer(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }
    this.idleTimer = setTimeout(() => this.showWarning(), this.idleTimeoutMs);
  }

  private showWarning(): void {
    this.open = true;
    this.warningDeadline = Date.now() + this.warningDurationMs;
    this.remainingMs = this.warningDurationMs;

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(() => this.tickCountdown(), 1000);
  }

  private tickCountdown(): void {
    const remaining = this.warningDeadline - Date.now();
    this.remainingMs = Math.max(remaining, 0);

    if (remaining <= 0) {
      this.clearTimers();
      this.open = false;
      this.sessionExpired.emit();
    }
  }

  private clearTimers(): void {
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = undefined;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = undefined;
    }
  }

  private bindActivityListeners(): void {
    this.unbindActivityListeners();
    for (const eventName of this.activityEvents) {
      document.addEventListener(eventName, this.boundOnActivity, { passive: true });
      this.listenersBound.push(eventName);
    }
  }

  private unbindActivityListeners(): void {
    for (const eventName of this.listenersBound) {
      document.removeEventListener(eventName, this.boundOnActivity);
    }
    this.listenersBound = [];
  }

  private formatMmSs(ms: number): string {
    const totalSeconds = Math.max(Math.ceil(ms / 1000), 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}
