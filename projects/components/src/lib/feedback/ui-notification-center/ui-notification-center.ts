import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

export interface NxNotificationItem {
  id: string | number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'nx-notification-center',
  standalone: true,
  imports: [],
  templateUrl: './ui-notification-center.html',
  styleUrl: './ui-notification-center.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class NxNotificationCenter {
  @Input() notifications: NxNotificationItem[] = [];
  @Input() emptyMessage = "You're all caught up.";

  @Output() itemClick = new EventEmitter<NxNotificationItem>();
  @Output() markAllRead = new EventEmitter<void>();
  @Output() dismiss = new EventEmitter<NxNotificationItem>();

  open = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get unreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  toggle(): void {
    this.open = !this.open;
  }

  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  onItemClick(item: NxNotificationItem): void {
    this.itemClick.emit(item);
  }

  onMarkAllRead(): void {
    this.markAllRead.emit();
  }

  onDismiss(event: MouseEvent, item: NxNotificationItem): void {
    event.stopPropagation();
    this.dismiss.emit(item);
  }
}
