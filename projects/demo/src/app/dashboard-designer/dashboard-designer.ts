import { Component, OnInit, inject, signal } from '@angular/core';
import { NxDashboardBuilder, NxDashboardLayout } from 'components';
import { CommonService } from '../services/common.service';

/** localStorage key the whole multi-dashboard workspace is persisted under. */
const STORAGE_KEY = 'nexium-dashboard-designer-layouts';

/** Realistic starter workspace shown the first time a visitor opens this page (or after a reset). */
function starterLayouts(): NxDashboardLayout[] {
  return [
    {
      name: 'Sales Overview',
      theme: 'light',
      widgets: [
        { id: 'sw1', type: 'metric', title: 'Monthly Revenue' },
        { id: 'sw2', type: 'chart', title: 'Revenue Trend' },
        { id: 'sw3', type: 'metric', title: 'New Deals' },
        { id: 'sw4', type: 'text', title: 'Top Performer Notes' },
      ],
      layoutItems: [
        { id: 'sw1', x: 0, y: 0, w: 4, h: 2 },
        { id: 'sw2', x: 4, y: 0, w: 8, h: 3 },
        { id: 'sw3', x: 0, y: 2, w: 4, h: 2 },
        { id: 'sw4', x: 4, y: 3, w: 8, h: 2 },
      ],
    },
    {
      name: 'Ops Health',
      theme: 'dark',
      widgets: [
        { id: 'ow1', type: 'metric', title: 'Uptime %' },
        { id: 'ow2', type: 'chart', title: 'Incident Volume' },
        { id: 'ow3', type: 'metric', title: 'Open Tickets' },
      ],
      layoutItems: [
        { id: 'ow1', x: 0, y: 0, w: 3, h: 2 },
        { id: 'ow2', x: 3, y: 0, w: 9, h: 3 },
        { id: 'ow3', x: 0, y: 2, w: 3, h: 2 },
      ],
    },
    {
      name: 'Customer Success',
      theme: 'auto',
      widgets: [
        { id: 'cw1', type: 'metric', title: 'NPS Score' },
        { id: 'cw2', type: 'chart', title: 'Churn Rate' },
      ],
      layoutItems: [
        { id: 'cw1', x: 0, y: 0, w: 4, h: 2 },
        { id: 'cw2', x: 4, y: 0, w: 8, h: 3 },
      ],
    },
  ];
}

/** Loose shape guard - enough to reject obviously-wrong input without being overly strict about every field. */
function isValidLayoutArray(value: unknown): value is NxDashboardLayout[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  return value.every(
    (item) =>
      !!item &&
      typeof item === 'object' &&
      typeof (item as Record<string, unknown>)['name'] === 'string' &&
      Array.isArray((item as Record<string, unknown>)['widgets']) &&
      Array.isArray((item as Record<string, unknown>)['layoutItems']),
  );
}

/**
 * Standalone "product" page wrapping the PRO `NxDashboardBuilder` component with real
 * cross-session persistence (localStorage) and whole-workspace JSON import/export, framed
 * as a persistent dashboard-building workspace rather than a plain component demo. The
 * builder itself already owns the palette/canvas/multi-dashboard-switcher/per-layout export
 * UI and its own PRO gating - this page only manages the array of layouts around it.
 */
@Component({
  selector: 'app-dashboard-designer',
  standalone: true,
  imports: [NxDashboardBuilder],
  templateUrl: './dashboard-designer.html',
  styleUrl: './dashboard-designer.scss',
})
export class DashboardDesigner implements OnInit {
  public commonService = inject(CommonService);

  readonly layouts = signal<NxDashboardLayout[]>(starterLayouts());
  readonly errorMessage = signal<string | null>(null);
  readonly lastSavedAt = signal<string | null>(null);

  private errorTimeoutId: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.loadFromStorage();
  }

  /** Tries to hydrate the workspace from a previous visit; falls back silently to starter data on any problem. */
  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (isValidLayoutArray(parsed)) {
        this.layouts.set(parsed);
      }
    } catch {
      // Corrupt/unavailable storage - keep whatever starter data the signal was already seeded with.
    }
  }

  private persist(layouts: NxDashboardLayout[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
    } catch {
      this.showError('Could not save to local storage - it may be full or blocked by the browser.');
    }
  }

  /**
   * The builder's Save button only reports the ONE layout that is currently active, not its
   * index, so it is matched back into the workspace by name (replacing an existing dashboard,
   * or appending a brand-new one added via the builder's own "add dashboard" control) and the
   * full array is re-persisted so every dashboard - not just the one just saved - survives a reload.
   */
  onLayoutSaved(layout: NxDashboardLayout): void {
    const current = this.layouts();
    const index = current.findIndex((item) => item.name === layout.name);
    const next = index >= 0 ? [...current] : [...current, { ...layout }];
    if (index >= 0) {
      next[index] = { ...layout };
    }
    this.layouts.set(next);
    this.persist(next);
    this.lastSavedAt.set(new Date().toLocaleTimeString());
  }

  /** Downloads the entire workspace (every dashboard) as one JSON file - distinct from the builder's own per-dashboard export. */
  exportAll(): void {
    const json = JSON.stringify(this.layouts(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexium-dashboards.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  triggerImport(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onImportFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!isValidLayoutArray(parsed)) {
          this.showError('That file does not look like a valid dashboard export.');
          return;
        }
        this.layouts.set(parsed);
        this.persist(parsed);
        this.errorMessage.set(null);
      } catch {
        this.showError('Could not parse that file as JSON.');
      }
    };
    reader.onerror = () => this.showError('Could not read that file.');
    reader.readAsText(file);

    // Reset so selecting the same file again later still fires a change event.
    input.value = '';
  }

  resetToStarter(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore - the in-memory reset below still takes effect.
    }
    this.layouts.set(starterLayouts());
    this.errorMessage.set(null);
  }

  private showError(message: string): void {
    this.errorMessage.set(message);
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
    }
    this.errorTimeoutId = setTimeout(() => this.errorMessage.set(null), 4000);
  }
}
