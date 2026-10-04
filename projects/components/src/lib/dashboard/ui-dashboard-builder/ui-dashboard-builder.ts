import { Component, EventEmitter, HostListener, Input, Output, computed, signal } from '@angular/core';
import { NxWidgetGrid, NxWidgetLayoutItem } from '../ui-widget-grid';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A demo widget kind placed on the canvas - `type` is just a label, no real chart rendering. */
export interface NxDashboardBuilderWidget {
  id: string;
  type: string;
  title: string;
}

export interface NxDashboardLayout {
  name: string;
  widgets: NxDashboardBuilderWidget[];
  layoutItems: NxWidgetLayoutItem[];
  theme?: 'light' | 'dark' | 'auto';
}

const DEMO_WIDGET_TYPES = ['metric', 'chart', 'text'] as const;
const DEFAULT_WIDGET_SIZE = { w: 4, h: 2 };

function emptyLayout(name: string): NxDashboardLayout {
  return { name, widgets: [], layoutItems: [], theme: 'light' };
}

/**
 * The full dashboard-building experience, composing `NxWidgetGrid` internally: a palette to add
 * demo widgets, the grid canvas itself, save/export actions, multi-dashboard switching, a theme
 * picker, and a basic responsive column collapse. Widget content is a styled placeholder box
 * (title + type label) - the deliverable here is the builder mechanics, not a charting engine.
 */
@Component({
  selector: 'nx-dashboard-builder',
  standalone: true,
  imports: [NxWidgetGrid, NxIcon, NxProLocked],
  templateUrl: './ui-dashboard-builder.html',
  styleUrl: './ui-dashboard-builder.scss',
})
export class NxDashboardBuilder {
  protected readonly licensed = nxProLicenseGranted();

  // Signal-backed (not a plain field) because `activeLayout` below is a `computed()` reading it -
  // a computed over a plain `@Input()` would freeze at whatever the first-bound value was and
  // never see a later rebind from the parent (e.g. loading a different set of saved dashboards).
  private readonly layoutsSignal = signal<NxDashboardLayout[]>([emptyLayout('Dashboard 1')]);
  @Input()
  get layouts(): NxDashboardLayout[] {
    return this.layoutsSignal();
  }
  set layouts(value: NxDashboardLayout[]) {
    const next = value?.length ? value : [emptyLayout('Dashboard 1')];
    this.layoutsSignal.set(next);
    if (this.activeIndex() >= next.length) {
      this.activeIndex.set(0);
    }
  }

  private _width?: number;
  @Input()
  get width(): number | undefined {
    return this._width;
  }
  set width(value: number | undefined) {
    this._width = value;
    this.updateResponsiveColumns();
  }

  @Output() layoutSaved = new EventEmitter<NxDashboardLayout>();

  readonly activeIndex = signal(0);
  readonly effectiveColumns = signal(12);
  readonly widgetTypes = DEMO_WIDGET_TYPES;

  readonly activeLayout = computed<NxDashboardLayout>(() => this.layoutsSignal()[this.activeIndex()] ?? emptyLayout('Dashboard 1'));

  constructor() {
    this.updateResponsiveColumns();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateResponsiveColumns();
  }

  private updateResponsiveColumns(): void {
    const w = this._width ?? (typeof window !== 'undefined' ? window.innerWidth : 1200);
    if (w < 640) this.effectiveColumns.set(2);
    else if (w < 960) this.effectiveColumns.set(4);
    else if (w < 1280) this.effectiveColumns.set(8);
    else this.effectiveColumns.set(12);
  }

  selectDashboard(index: number): void {
    this.activeIndex.set(index);
  }

  addDashboard(): void {
    const next = [...this.layoutsSignal(), emptyLayout(`Dashboard ${this.layoutsSignal().length + 1}`)];
    this.layoutsSignal.set(next);
    this.activeIndex.set(next.length - 1);
  }

  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.updateActiveLayout({ ...this.activeLayout(), theme });
  }

  addWidget(type: string): void {
    const current = this.activeLayout();
    const id = `widget-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const widget: NxDashboardBuilderWidget = {
      id,
      type,
      title: `${type.charAt(0).toUpperCase()}${type.slice(1)} ${current.widgets.length + 1}`,
    };
    const spot = this.findEmptySpot(current.layoutItems);
    const layoutItem: NxWidgetLayoutItem = { id, x: spot.x, y: spot.y, ...DEFAULT_WIDGET_SIZE };
    this.updateActiveLayout({
      ...current,
      widgets: [...current.widgets, widget],
      layoutItems: [...current.layoutItems, layoutItem],
    });
  }

  removeWidget(id: string): void {
    const current = this.activeLayout();
    this.updateActiveLayout({
      ...current,
      widgets: current.widgets.filter((w) => w.id !== id),
      layoutItems: current.layoutItems.filter((i) => i.id !== id),
    });
  }

  onLayoutChange(items: NxWidgetLayoutItem[]): void {
    this.updateActiveLayout({ ...this.activeLayout(), layoutItems: items });
  }

  widgetFor(id: string): NxDashboardBuilderWidget | undefined {
    return this.activeLayout().widgets.find((w) => w.id === id);
  }

  private updateActiveLayout(layout: NxDashboardLayout): void {
    const next = [...this.layoutsSignal()];
    next[this.activeIndex()] = layout;
    this.layoutsSignal.set(next);
  }

  /** Simple bottom-stacking placement for a freshly-added widget: full default width, left-aligned, below everything else. */
  private findEmptySpot(items: NxWidgetLayoutItem[]): { x: number; y: number } {
    const maxY = items.reduce((max, i) => Math.max(max, i.y + i.h), 0);
    return { x: 0, y: maxY };
  }

  saveLayout(): void {
    this.layoutSaved.emit({ ...this.activeLayout() });
  }

  exportLayout(): void {
    const layout = this.activeLayout();
    const json = JSON.stringify(layout, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${layout.name.replace(/\s+/g, '-').toLowerCase() || 'dashboard'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
