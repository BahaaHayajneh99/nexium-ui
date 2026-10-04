import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  Inject,
  Input,
  QueryList,
  forwardRef,
  numberAttribute,
} from '@angular/core';

export type NxResizablePanelsOrientation = 'horizontal' | 'vertical';

/** A row/column of N panels separated by draggable gutters, each panel keeping a percentage-of-container size. */
@Component({
  selector: 'nx-resizable-panels',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-resizable-panels" [class.vertical]="orientation === 'vertical'">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .nx-resizable-panels {
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .nx-resizable-panels.vertical {
      flex-direction: column;
    }
  `,
})
export class NxResizablePanels implements AfterContentInit {
  @Input() orientation: NxResizablePanelsOrientation = 'horizontal';

  @ContentChildren(forwardRef(() => NxResizablePanel)) panelsList!: QueryList<NxResizablePanel>;

  private draggingIndex: number | null = null;
  private startPos = 0;
  private startSizeA = 0;
  private startSizeB = 0;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    this.syncPanels();
    this.panelsList.changes.subscribe(() => this.syncPanels());
  }

  startResize(panel: NxResizablePanel, event: PointerEvent): void {
    event.preventDefault();
    const panels = this.panelsList.toArray();
    const index = panels.indexOf(panel);
    if (index === -1 || index === panels.length - 1) {
      return;
    }

    this.draggingIndex = index;
    this.startPos = this.orientation === 'horizontal' ? event.clientX : event.clientY;
    this.startSizeA = panels[index].size;
    this.startSizeB = panels[index + 1].size;
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (this.draggingIndex === null) {
      return;
    }

    const panels = this.panelsList.toArray();
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const containerSize = this.orientation === 'horizontal' ? rect.width : rect.height;
    const currentPos = this.orientation === 'horizontal' ? event.clientX : event.clientY;
    const deltaPercent = ((currentPos - this.startPos) / containerSize) * 100;

    const a = panels[this.draggingIndex];
    const b = panels[this.draggingIndex + 1];

    let newA = this.startSizeA + deltaPercent;
    let newB = this.startSizeB - deltaPercent;
    if (newA < a.minSize) {
      newB -= a.minSize - newA;
      newA = a.minSize;
    }
    if (newB < b.minSize) {
      newA -= b.minSize - newB;
      newB = b.minSize;
    }

    a.size = Math.max(a.minSize, newA);
    b.size = Math.max(b.minSize, newB);
  }

  @HostListener('document:pointerup')
  onPointerUp(): void {
    this.draggingIndex = null;
  }

  private syncPanels(): void {
    const panels = this.panelsList.toArray();
    panels.forEach((panel, index) => {
      panel.isLast = index === panels.length - 1;
      panel.orientation = this.orientation;
    });
  }
}

/** A single pane inside `<nx-resizable-panels>`; renders its own trailing drag handle. */
@Component({
  selector: 'nx-resizable-panel',
  standalone: true,
  imports: [],
  template: `
    <div class="nx-resizable-panel-content">
      <ng-content></ng-content>
    </div>
    @if (!isLast) {
      <div
        class="nx-resizable-panel-gutter"
        [class.vertical]="orientation === 'vertical'"
        (pointerdown)="onGutterPointerDown($event)">
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      position: relative;
      overflow: auto;
      flex-basis: 0;
    }
    .nx-resizable-panel-content {
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow: auto;
    }
    .nx-resizable-panel-gutter {
      flex-shrink: 0;
      width: 6px;
      cursor: col-resize;
      background-color: var(--shell-border);
    }
    .nx-resizable-panel-gutter.vertical {
      width: 100%;
      height: 6px;
      cursor: row-resize;
    }
    .nx-resizable-panel-gutter:hover {
      background-color: var(--shell-primary);
    }
  `,
  host: {
    '[style.flex-grow]': 'size',
  },
})
export class NxResizablePanel {
  @Input({ transform: numberAttribute }) size = 50;
  @Input({ transform: numberAttribute }) minSize = 10;

  isLast = false;
  orientation: NxResizablePanelsOrientation = 'horizontal';

  constructor(@Inject(forwardRef(() => NxResizablePanels)) private parent: NxResizablePanels) {}

  onGutterPointerDown(event: PointerEvent): void {
    this.parent.startResize(this, event);
  }
}
