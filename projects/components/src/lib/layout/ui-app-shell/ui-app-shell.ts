import { Component, EventEmitter, Input, Output, booleanAttribute, signal } from '@angular/core';

/**
 * A standard app layout scaffold: header + collapsible sidebar + content +
 * footer regions, projected via named slots. Sidebar collapse state can be
 * driven externally (`sidebarCollapsed`) or toggled from within projected
 * content via a template reference variable calling `toggleSidebar()`.
 */
@Component({
  selector: 'nx-app-shell',
  standalone: true,
  imports: [],
  templateUrl: './ui-app-shell.html',
  styleUrl: './ui-app-shell.scss',
})
export class NxAppShell {
  @Input({ transform: booleanAttribute })
  set sidebarCollapsed(value: boolean) {
    this.collapsed.set(value);
  }

  @Output() sidebarCollapsedChange = new EventEmitter<boolean>();

  collapsed = signal(false);

  toggleSidebar(): void {
    this.collapsed.update((value) => !value);
    this.sidebarCollapsedChange.emit(this.collapsed());
  }
}
