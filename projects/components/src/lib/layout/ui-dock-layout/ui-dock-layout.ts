import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';
import { NxDockPanelContent } from './nx-dock-panel-content';

export type NxDockRegion = 'left' | 'right' | 'bottom' | 'center';
type NxDockSizableRegion = Exclude<NxDockRegion, 'center'>;

export interface NxDockPanel {
  id: string;
  title: string;
  region: NxDockRegion;
  /** Initial width (left/right) or height (bottom) in px - ignored for `center`, which always fills the remaining space. Resizable afterward via drag. */
  size?: number;
  /** Whether the panel shows a close (x) button. Defaults to `true`. */
  closable?: boolean;
}

const DEFAULT_SIZE: Record<NxDockSizableRegion, number> = { left: 240, right: 280, bottom: 200 };
const MIN_SIZE: Record<NxDockSizableRegion, number> = { left: 140, right: 140, bottom: 100 };
const MAX_SIZE: Record<NxDockSizableRegion, number> = { left: 640, right: 640, bottom: 560 };
const DIVIDER_SIZE = 6;

interface NxDockDragState {
  region: NxDockSizableRegion;
  startPos: number;
  startSize: number;
}

/**
 * A VS Code-style docking layout: a central area surrounded by up to three resizable panels
 * (left, right, bottom), each with a small header (title + optional close button). Panel content
 * is projected by id via `NxDockPanelContent` (`<div nxDockPanelContent="id">...</div>`), dividers
 * are drag-resizable (same pointer-capture approach as `NxSplitter`/`NxResizable`), and closing a
 * panel collapses its grid track to zero so its neighbor reclaims the space.
 *
 * Deliberately out of scope: re-opening a closed panel, floating/undocking, and dragging a panel
 * to rearrange regions - this ships the resize + close 80%, not full IDE-docking semantics.
 */
@Component({
  selector: 'nx-dock-layout',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-dock-layout.html',
  styleUrl: './ui-dock-layout.scss',
})
export class NxDockLayout implements AfterContentInit {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so the `computed()`s below re-run whenever the host
  // rebinds a new `panels` array, rather than freezing on whatever was passed in on first read.
  private readonly panelsSignal = signal<NxDockPanel[]>([]);
  @Input()
  get panels(): NxDockPanel[] {
    return this.panelsSignal();
  }
  set panels(value: NxDockPanel[]) {
    this.panelsSignal.set(value ?? []);
  }

  /** Emits the closed panel's id. The panel is also hidden internally and its space reclaimed. */
  @Output() panelClosed = new EventEmitter<string>();
  /** Emits `{ panelId: sizePx }` for every sizable (non-center) panel whenever a drag-resize completes. */
  @Output() layoutChange = new EventEmitter<Record<string, number>>();

  @ContentChildren(NxDockPanelContent) private contents!: QueryList<NxDockPanelContent>;

  @ViewChild('leftSlot') private leftSlot?: ElementRef<HTMLElement>;
  @ViewChild('rightSlot') private rightSlot?: ElementRef<HTMLElement>;
  @ViewChild('bottomSlot') private bottomSlot?: ElementRef<HTMLElement>;
  @ViewChild('centerSlot') private centerSlot?: ElementRef<HTMLElement>;

  private readonly closedIds = signal<ReadonlySet<string>>(new Set());
  private readonly sizeOverrides = signal<Record<string, number>>({});
  private dragState: NxDockDragState | null = null;

  readonly leftPanel = computed(() => this.panels.find((p) => p.region === 'left'));
  readonly rightPanel = computed(() => this.panels.find((p) => p.region === 'right'));
  readonly bottomPanel = computed(() => this.panels.find((p) => p.region === 'bottom'));
  readonly centerPanel = computed(() => this.panels.find((p) => p.region === 'center'));

  readonly leftSize = computed(() => this.sizeFor(this.leftPanel(), 'left'));
  readonly rightSize = computed(() => this.sizeFor(this.rightPanel(), 'right'));
  readonly bottomSize = computed(() => this.sizeFor(this.bottomPanel(), 'bottom'));

  /** `[left] [left-divider] [center] [right-divider] [right]` - closed/absent panels and their dividers collapse to 0px so `center` (always `1fr`) reclaims the space. */
  readonly gridTemplateColumns = computed(() => {
    const left = this.trackSize(this.leftPanel(), this.leftSize());
    const right = this.trackSize(this.rightPanel(), this.rightSize());
    return `${left}px ${left ? DIVIDER_SIZE : 0}px 1fr ${right ? DIVIDER_SIZE : 0}px ${right}px`;
  });

  /** `[main row] [bottom-divider] [bottom]` - the main row (center + left/right) always fills remaining height. */
  readonly gridTemplateRows = computed(() => {
    const bottom = this.trackSize(this.bottomPanel(), this.bottomSize());
    return `1fr ${bottom ? DIVIDER_SIZE : 0}px ${bottom}px`;
  });

  ngAfterContentInit(): void {
    this.distributeContent();
    this.contents.changes.subscribe(() => this.distributeContent());
  }

  isClosed(panel: NxDockPanel | undefined): boolean {
    return !!panel && this.closedIds().has(panel.id);
  }

  closePanel(panel: NxDockPanel | undefined): void {
    if (!panel) {
      return;
    }
    this.closedIds.update((ids) => new Set(ids).add(panel.id));
    this.panelClosed.emit(panel.id);
  }

  onDividerPointerDown(region: NxDockSizableRegion, event: PointerEvent): void {
    event.preventDefault();
    const startSize = region === 'left' ? this.leftSize() : region === 'right' ? this.rightSize() : this.bottomSize();
    const startPos = region === 'bottom' ? event.clientY : event.clientX;
    this.dragState = { region, startPos, startSize };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragState) {
      return;
    }
    const { region, startPos, startSize } = this.dragState;
    const pos = region === 'bottom' ? event.clientY : event.clientX;
    const delta = pos - startPos;
    // Left grows as the divider moves right; right/bottom grow as their divider moves left/up.
    const rawSize = region === 'left' ? startSize + delta : startSize - delta;
    const nextSize = this.clamp(rawSize, MIN_SIZE[region], MAX_SIZE[region]);

    const panel = region === 'left' ? this.leftPanel() : region === 'right' ? this.rightPanel() : this.bottomPanel();
    if (!panel) {
      return;
    }
    this.sizeOverrides.update((overrides) => ({ ...overrides, [panel.id]: nextSize }));
  }

  @HostListener('document:pointerup')
  onPointerUp(): void {
    if (!this.dragState) {
      return;
    }
    this.dragState = null;
    this.layoutChange.emit(this.currentSizes());
  }

  /** Moves each `[nxDockPanelContent]` element's native node into the slot matching its panel's region - a dynamic, per-id content projection that a static `ng-content select` can't express. */
  private distributeContent(): void {
    for (const content of this.contents.toArray()) {
      const panel = this.panels.find((p) => p.id === content.panelId);
      const slot = this.slotFor(panel?.region);
      if (slot) {
        slot.nativeElement.appendChild(content.elementRef.nativeElement);
      }
    }
  }

  private slotFor(region: NxDockRegion | undefined): ElementRef<HTMLElement> | undefined {
    switch (region) {
      case 'left':
        return this.leftSlot;
      case 'right':
        return this.rightSlot;
      case 'bottom':
        return this.bottomSlot;
      case 'center':
        return this.centerSlot;
      default:
        return undefined;
    }
  }

  /** 0 when the region has no panel at all, or when its panel is closed. */
  private trackSize(panel: NxDockPanel | undefined, size: number): number {
    if (!panel || this.isClosed(panel)) {
      return 0;
    }
    return size;
  }

  private sizeFor(panel: NxDockPanel | undefined, region: NxDockSizableRegion): number {
    if (!panel) {
      return 0;
    }
    return this.sizeOverrides()[panel.id] ?? panel.size ?? DEFAULT_SIZE[region];
  }

  private currentSizes(): Record<string, number> {
    const sizes: Record<string, number> = {};
    for (const region of ['left', 'right', 'bottom'] as const) {
      const panel = region === 'left' ? this.leftPanel() : region === 'right' ? this.rightPanel() : this.bottomPanel();
      if (panel) {
        sizes[panel.id] = this.sizeFor(panel, region);
      }
    }
    return sizes;
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
