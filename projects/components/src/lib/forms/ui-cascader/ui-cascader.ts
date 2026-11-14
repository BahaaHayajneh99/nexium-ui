import { Component, ElementRef, EventEmitter, HostListener, Input, Output, computed, signal } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxCascaderOption {
  label: string;
  value: string | number;
  children?: NxCascaderOption[];
}

/**
 * A multi-level cascading select. Clicking the trigger opens a flyout showing one column per
 * level; picking an option in a column reveals the next column (its `children`) to the right,
 * until a leaf (no `children`) is picked, which commits the full path and closes the flyout. The
 * closed trigger shows the selected path as breadcrumb text, e.g. "Asia / China / Beijing".
 */
@Component({
  selector: 'nx-cascader',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-cascader.html',
  styleUrl: './ui-cascader.scss',
})
export class NxCascader {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by signals (not plain fields) so `triggerLabel`/`columns` below - which read
  // options/value - actually re-run when the parent rebinds new values.
  private readonly optionsSignal = signal<NxCascaderOption[]>([]);
  @Input()
  get options(): NxCascaderOption[] {
    return this.optionsSignal();
  }
  set options(value: NxCascaderOption[]) {
    this.optionsSignal.set(value ?? []);
  }

  @Input() placeholder = 'Select...';

  private readonly valueSignal = signal<(string | number)[] | null>(null);
  @Input()
  get value(): (string | number)[] | null {
    return this.valueSignal();
  }
  set value(value: (string | number)[] | null) {
    this.valueSignal.set(value ?? null);
  }

  @Output() valueChange = new EventEmitter<(string | number)[]>();

  readonly open = signal(false);
  /** The path being built while the flyout is open - seeded from the committed value each time it opens. */
  readonly activePath = signal<(string | number)[]>([]);

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  private findPathLabels(path: (string | number)[]): string[] {
    const labels: string[] = [];
    let level = this.optionsSignal();
    for (const v of path) {
      const match = level.find((o) => o.value === v);
      if (!match) break;
      labels.push(match.label);
      level = match.children ?? [];
    }
    return labels;
  }

  readonly triggerLabel = computed(() => {
    const value = this.valueSignal();
    if (!value || value.length === 0) {
      return this.placeholder;
    }
    const labels = this.findPathLabels(value);
    return labels.length ? labels.join(' / ') : this.placeholder;
  });

  /** One array of options per visible column - column 0 is the top level, column N is the children of whatever's picked at depth N-1 in `activePath`. */
  readonly columns = computed<NxCascaderOption[][]>(() => {
    const result: NxCascaderOption[][] = [this.optionsSignal()];
    let level = this.optionsSignal();
    for (const v of this.activePath()) {
      const match = level.find((o) => o.value === v);
      if (!match?.children?.length) break;
      result.push(match.children);
      level = match.children;
    }
    return result;
  });

  toggleOpen(): void {
    if (this.open()) {
      this.open.set(false);
      return;
    }
    const current = this.valueSignal();
    this.activePath.set(current ? [...current] : []);
    this.open.set(true);
  }

  isSelected(depth: number, option: NxCascaderOption): boolean {
    return this.activePath()[depth] === option.value;
  }

  selectOption(depth: number, option: NxCascaderOption): void {
    const next = [...this.activePath().slice(0, depth), option.value];
    this.activePath.set(next);
    if (!option.children?.length) {
      this.valueSignal.set(next);
      this.valueChange.emit(next);
      this.open.set(false);
    }
  }
}
