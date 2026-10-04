import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxAutofocus } from '../../directives/nx-autofocus';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxSpreadsheetData = Record<string, string>;

export type NxSpreadsheetDirection = 'ltr' | 'rtl';

export type NxSpreadsheetValidationType =
  | 'required'
  | 'email'
  | 'number'
  | 'integer'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'custom';

export interface NxSpreadsheetValidationRule {
  type: NxSpreadsheetValidationType;
  /** Threshold for min/max/minLength/maxLength, or the regex source for pattern. */
  value?: number | string;
  message?: string;
  /** Required (and only used) when `type` is `'custom'`. Return true when the value is valid. */
  validator?: (value: string) => boolean;
}

export interface NxSpreadsheetColumn {
  /** Header text. Defaults to the plain column letter (A, B, C...) when omitted. */
  label?: string;
  /** Shorthand for a `required` validation rule - shows a red `*` next to the header label. */
  required?: boolean;
  validations?: NxSpreadsheetValidationRule[];
  /** Consecutive columns sharing the same `groupLabel` are merged under one spanning header cell. */
  groupLabel?: string;
}

export interface NxSpreadsheetTheme {
  headerBackground?: string;
  accentColor?: string;
  borderColor?: string;
  stripedRows?: boolean;
}

interface NxSpreadsheetSnapshot {
  data: NxSpreadsheetData;
  cols: number;
  columnDefs: NxSpreadsheetColumn[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function defaultValidationMessage(type: NxSpreadsheetValidationType): string {
  switch (type) {
    case 'required':
      return 'This field is required.';
    case 'email':
      return 'Enter a valid email address.';
    case 'number':
      return 'Enter a valid number.';
    case 'integer':
      return 'Enter a whole number.';
    case 'min':
      return 'Value is below the minimum.';
    case 'max':
      return 'Value is above the maximum.';
    case 'minLength':
      return 'Too short.';
    case 'maxLength':
      return 'Too long.';
    case 'pattern':
      return 'Value does not match the required format.';
    case 'custom':
      return 'Invalid value.';
  }
}

/** Returns an error message when `value` fails `rule`, or `null` when it passes. Empty values only fail `required`. */
function validateValue(value: string, rule: NxSpreadsheetValidationRule): string | null {
  const trimmed = value.trim();
  const fail = rule.message ?? defaultValidationMessage(rule.type);
  if (trimmed === '' && rule.type !== 'required' && rule.type !== 'minLength' && rule.type !== 'maxLength') {
    return null;
  }
  switch (rule.type) {
    case 'required':
      return trimmed === '' ? fail : null;
    case 'email':
      return EMAIL_RE.test(trimmed) ? null : fail;
    case 'number':
      return Number.isNaN(Number(trimmed)) ? fail : null;
    case 'integer':
      return Number.isInteger(Number(trimmed)) ? null : fail;
    case 'min':
      return Number(trimmed) < Number(rule.value) ? fail : null;
    case 'max':
      return Number(trimmed) > Number(rule.value) ? fail : null;
    case 'minLength':
      return value.length < Number(rule.value) ? fail : null;
    case 'maxLength':
      return value.length > Number(rule.value) ? fail : null;
    case 'pattern':
      return new RegExp(String(rule.value)).test(trimmed) ? null : fail;
    case 'custom':
      return rule.validator && !rule.validator(value) ? fail : null;
    default:
      return null;
  }
}

interface NxCellPos {
  row: number;
  col: number;
}

interface NxRange {
  r1: number;
  c1: number;
  r2: number;
  c2: number;
}

function colLetter(index: number): string {
  let n = index;
  let out = '';
  do {
    out = String.fromCharCode(65 + (n % 26)) + out;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return out;
}

function colIndex(letters: string): number {
  let n = 0;
  for (const ch of letters) {
    n = n * 26 + (ch.charCodeAt(0) - 64);
  }
  return n - 1;
}

function address(row: number, col: number): string {
  return `${colLetter(col)}${row + 1}`;
}

function parseCellRef(ref: string): NxCellPos | null {
  const match = ref.match(/^([A-Z]+)(\d+)$/i);
  if (!match) return null;
  return { col: colIndex(match[1].toUpperCase()), row: Number(match[2]) - 1 };
}

function parseRangeArg(arg: string): NxRange | null {
  const trimmed = arg.trim();
  const rangeMatch = trimmed.match(/^([A-Z]+\d+):([A-Z]+\d+)$/i);
  if (rangeMatch) {
    const a = parseCellRef(rangeMatch[1])!;
    const b = parseCellRef(rangeMatch[2])!;
    return { r1: Math.min(a.row, b.row), c1: Math.min(a.col, b.col), r2: Math.max(a.row, b.row), c2: Math.max(a.col, b.col) };
  }
  const single = parseCellRef(trimmed);
  return single ? { r1: single.row, c1: single.col, r2: single.row, c2: single.col } : null;
}

function normalizeRange(a: NxCellPos, b: NxCellPos): NxRange {
  return {
    r1: Math.min(a.row, b.row),
    c1: Math.min(a.col, b.col),
    r2: Math.max(a.row, b.row),
    c2: Math.max(a.col, b.col),
  };
}

/**
 * A grid spreadsheet with real cell editing, mouse/keyboard range selection, copy/paste, undo/
 * redo (Ctrl+Z / Ctrl+Y), formulas (SUM/AVERAGE/COUNT/MIN/MAX over a range, plus `+-*\/`
 * arithmetic referencing other cells), draggable row/column resize, freeze panes, CSV export,
 * RTL layout, and an optional per-column schema (`columnDefs`) for required/validated fields and
 * grouped headers. Data is a flat `{ "A1": "42", "B2": "=SUM(A1:A1)" }` map - only non-empty
 * cells need an entry. `columnDefs` is entirely optional - omit it to use this as a plain,
 * schema-free grid exactly as before.
 */
@Component({
  selector: 'nx-spreadsheet',
  standalone: true,
  imports: [FormsModule, NxAutofocus, NxProLocked],
  templateUrl: './ui-spreadsheet.html',
  styleUrl: './ui-spreadsheet.scss',
})
export class NxSpreadsheet {
  protected readonly licensed = nxProLicenseGranted();

  // The `@HostListener('keydown')` below listens on `<nx-spreadsheet>` itself, which has no
  // tabindex and so can never actually hold focus - only this inner div (tabindex="0" in the
  // template) can. Keydown events bubble up from it to the host either way, but without
  // explicitly focusing *this* element on cell interaction, nothing ever has real keyboard focus
  // in the first place (clicking a plain, non-focusable cell `<div>` does not implicitly focus
  // any focusable ancestor), so no keyboard shortcut - typing, arrows, copy/paste, undo/redo -
  // would ever actually reach a real mouse-driven user.
  @ViewChild('gridRoot') private gridRoot?: ElementRef<HTMLElement>;

  // Backed by signals (not plain fields) so `rowIndexes`/`colIndexes` below - which are
  // `computed()`s reading `this.rows`/`this.cols` - actually re-run when the parent rebinds a new
  // grid size, instead of permanently caching whatever they first saw on initial render. The
  // setters also re-run ensureSizes() so colWidths/rowHeights grow or shrink to match.
  private readonly rowsSignal = signal(20);
  @Input()
  get rows(): number {
    return this.rowsSignal();
  }
  set rows(value: number) {
    this.rowsSignal.set(value);
    this.ensureSizes();
  }

  private readonly colsSignal = signal(10);
  @Input()
  get cols(): number {
    return this.colsSignal();
  }
  set cols(value: number) {
    this.colsSignal.set(value);
    this.ensureSizes();
    this.colsChange.emit(value);
  }
  @Output() colsChange = new EventEmitter<number>();

  // Backed by a signal (not a plain field) so `hasColumnGroups`/`columnGroupSpans` below - both
  // `computed()`s reading `this.columnDefs` - actually re-run when addColumn()/undo()/redo()
  // reassign it, instead of permanently caching whatever they first saw on initial render.
  private readonly columnDefsSignal = signal<NxSpreadsheetColumn[]>([]);
  @Input()
  get columnDefs(): NxSpreadsheetColumn[] {
    return this.columnDefsSignal();
  }
  set columnDefs(value: NxSpreadsheetColumn[]) {
    this.columnDefsSignal.set(value ?? []);
  }
  @Output() columnDefsChange = new EventEmitter<NxSpreadsheetColumn[]>();

  @Input() data: NxSpreadsheetData = {};
  @Input() frozenRows = 0;
  @Input() frozenCols = 0;
  @Input() exportFilename = 'spreadsheet';
  @Input() direction: NxSpreadsheetDirection = 'ltr';
  @Input() allowAddColumn = true;
  @Input() theme: NxSpreadsheetTheme = {};

  @Output() dataChange = new EventEmitter<NxSpreadsheetData>();

  colWidths = signal<number[]>([]);
  rowHeights = signal<number[]>([]);

  activeCell = signal<NxCellPos>({ row: 0, col: 0 });
  selectionAnchor = signal<NxCellPos>({ row: 0, col: 0 });
  editingCell = signal<NxCellPos | null>(null);
  editDraft = '';

  private isSelecting = false;
  private resizing: { type: 'col' | 'row'; index: number; startPos: number; startSize: number } | null = null;
  private clipboard: { range: NxRange; values: string[][] } | null = null;

  private undoStack: NxSpreadsheetSnapshot[] = [];
  private redoStack: NxSpreadsheetSnapshot[] = [];

  readonly rowIndexes = computed(() => Array.from({ length: this.rows }, (_, i) => i));
  readonly colIndexes = computed(() => Array.from({ length: this.cols }, (_, i) => i));

  readonly selectedRange = computed<NxRange>(() => normalizeRange(this.selectionAnchor(), this.activeCell()));

  readonly hasColumnGroups = computed(() => this.columnDefs.some((def) => !!def?.groupLabel));

  readonly columnGroupSpans = computed<{ label: string; span: number; startCol: number }[]>(() => {
    const defs = this.columnDefs;
    const total = this.cols;
    const spans: { label: string; span: number; startCol: number }[] = [];
    let col = 0;
    while (col < total) {
      const label = defs[col]?.groupLabel ?? '';
      let span = 1;
      while (label !== '' && col + span < total && (defs[col + span]?.groupLabel ?? '') === label) {
        span++;
      }
      spans.push({ label, span, startCol: col });
      col += span;
    }
    return spans;
  });

  colLetter = colLetter;

  constructor() {
    this.ensureSizes();
  }

  private ensureSizes(): void {
    if (this.colWidths().length !== this.cols) {
      this.colWidths.set(Array.from({ length: this.cols }, (_, i) => this.colWidths()[i] ?? 96));
    }
    if (this.rowHeights().length !== this.rows) {
      this.rowHeights.set(Array.from({ length: this.rows }, (_, i) => this.rowHeights()[i] ?? 28));
    }
  }

  colWidth(index: number): number {
    return this.colWidths()[index] ?? 96;
  }

  rowHeight(index: number): number {
    return this.rowHeights()[index] ?? 28;
  }

  /** Sticky `left` offset for a frozen column - the row-header width plus every earlier column's width. */
  colLeft(index: number): number {
    let left = 48; // row header width, must match .nx-spreadsheet-row-header width in the scss
    for (let i = 0; i < index; i++) left += this.colWidth(i);
    return left;
  }

  /** Sticky `top` offset for a frozen row - the header row(s) height plus every earlier row's height. */
  rowTop(index: number): number {
    // 28px per header row, must match .nx-spreadsheet-header-row/.nx-spreadsheet-group-row height
    // in the scss; the group-label row only exists when at least one column has a groupLabel.
    let top = this.hasColumnGroups() ? 56 : 28;
    for (let i = 0; i < index; i++) top += this.rowHeight(i);
    return top;
  }

  groupSpanWidth(span: { startCol: number; span: number }): number {
    let width = 0;
    for (let i = 0; i < span.span; i++) width += this.colWidth(span.startCol + i);
    return width;
  }

  columnDef(col: number): NxSpreadsheetColumn | undefined {
    return this.columnDefs[col];
  }

  columnLabel(col: number): string {
    return this.columnDef(col)?.label ?? this.colLetter(col);
  }

  /** First failing validation message for this cell, or `null` when it passes (or has no column schema). */
  cellError(row: number, col: number): string | null {
    const def = this.columnDef(col);
    if (!def) return null;
    const value = this.rawValue(row, col);
    const rules: NxSpreadsheetValidationRule[] = def.required ? [{ type: 'required' }, ...(def.validations ?? [])] : (def.validations ?? []);
    for (const rule of rules) {
      const error = validateValue(value, rule);
      if (error) return error;
    }
    return null;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  undo(): void {
    const snapshot = this.undoStack.pop();
    if (!snapshot) return;
    this.redoStack.push(this.snapshotState());
    this.restoreSnapshot(snapshot);
  }

  redo(): void {
    const snapshot = this.redoStack.pop();
    if (!snapshot) return;
    this.undoStack.push(this.snapshotState());
    this.restoreSnapshot(snapshot);
  }

  private snapshotState(): NxSpreadsheetSnapshot {
    return { data: this.data, cols: this.cols, columnDefs: this.columnDefs };
  }

  private restoreSnapshot(snapshot: NxSpreadsheetSnapshot): void {
    this.data = snapshot.data;
    this.cols = snapshot.cols;
    this.columnDefs = snapshot.columnDefs;
    this.dataChange.emit(this.data);
    this.columnDefsChange.emit(this.columnDefs);
  }

  private pushUndo(): void {
    this.undoStack.push(this.snapshotState());
    if (this.undoStack.length > 100) this.undoStack.shift();
    this.redoStack = [];
  }

  addColumn(): void {
    this.pushUndo();
    this.cols = this.cols + 1;
  }

  rawValue(row: number, col: number): string {
    return this.data[address(row, col)] ?? '';
  }

  displayValue(row: number, col: number): string {
    const result = this.evaluateCell(row, col, new Set());
    return typeof result === 'number' ? this.formatNumber(result) : result;
  }

  private formatNumber(value: number): string {
    return Number.isInteger(value) ? String(value) : String(Math.round(value * 1000) / 1000);
  }

  private evaluateCell(row: number, col: number, visiting: Set<string>): number | string {
    const key = address(row, col);
    const raw = this.data[key] ?? '';
    if (!raw) return '';
    if (!raw.startsWith('=')) {
      const num = Number(raw);
      return Number.isNaN(num) ? raw : num;
    }
    if (visiting.has(key)) return '#REF!';
    visiting.add(key);
    const result = this.evalFormula(raw.slice(1), visiting);
    visiting.delete(key);
    return result;
  }

  private collectRangeValues(range: NxRange, visiting: Set<string>): number[] {
    const values: number[] = [];
    for (let r = range.r1; r <= range.r2; r++) {
      for (let c = range.c1; c <= range.c2; c++) {
        const v = this.evaluateCell(r, c, visiting);
        if (typeof v === 'number') values.push(v);
      }
    }
    return values;
  }

  private evalFormula(expr: string, visiting: Set<string>): number | string {
    const trimmed = expr.trim();
    const fnMatch = trimmed.match(/^([A-Z]+)\((.+)\)$/i);
    if (fnMatch) {
      const fn = fnMatch[1].toUpperCase();
      const range = parseRangeArg(fnMatch[2]);
      if (!range) return '#REF!';
      const values = this.collectRangeValues(range, visiting);
      switch (fn) {
        case 'SUM':
          return values.reduce((a, b) => a + b, 0);
        case 'AVERAGE':
          return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
        case 'COUNT':
          return values.length;
        case 'MIN':
          return values.length ? Math.min(...values) : 0;
        case 'MAX':
          return values.length ? Math.max(...values) : 0;
        default:
          return '#NAME?';
      }
    }

    const substituted = trimmed.replace(/[A-Z]+\d+/gi, (ref) => {
      const parsed = parseCellRef(ref.toUpperCase());
      if (!parsed) return '0';
      const value = this.evaluateCell(parsed.row, parsed.col, visiting);
      return typeof value === 'number' ? String(value) : '0';
    });

    if (!/^[\d+\-*/().\s]+$/.test(substituted)) {
      return '#ERROR!';
    }
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function(`"use strict"; return (${substituted});`)();
      return typeof result === 'number' && Number.isFinite(result) ? result : '#ERROR!';
    } catch {
      return '#ERROR!';
    }
  }

  isActive(row: number, col: number): boolean {
    const a = this.activeCell();
    return a.row === row && a.col === col;
  }

  isSelected(row: number, col: number): boolean {
    const r = this.selectedRange();
    return row >= r.r1 && row <= r.r2 && col >= r.c1 && col <= r.c2;
  }

  isEditing(row: number, col: number): boolean {
    const e = this.editingCell();
    return !!e && e.row === row && e.col === col;
  }

  onCellMouseDown(row: number, col: number, event: MouseEvent): void {
    if (this.editingCell()) {
      this.commitEdit();
    }
    this.isSelecting = true;
    this.activeCell.set({ row, col });
    if (!event.shiftKey) {
      this.selectionAnchor.set({ row, col });
    }
    this.gridRoot?.nativeElement.focus();
  }

  onCellMouseEnter(row: number, col: number): void {
    if (this.isSelecting) {
      this.activeCell.set({ row, col });
    }
  }

  onCellDoubleClick(row: number, col: number): void {
    this.startEditing({ row, col }, this.rawValue(row, col));
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    this.isSelecting = false;
    if (this.resizing) {
      this.resizing = null;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    if (!this.resizing) return;
    const delta = this.resizing.type === 'col' ? event.clientX - this.resizing.startPos : event.clientY - this.resizing.startPos;
    const newSize = Math.max(32, this.resizing.startSize + delta);
    if (this.resizing.type === 'col') {
      const widths = [...this.colWidths()];
      widths[this.resizing.index] = newSize;
      this.colWidths.set(widths);
    } else {
      const heights = [...this.rowHeights()];
      heights[this.resizing.index] = newSize;
      this.rowHeights.set(heights);
    }
  }

  startColResize(index: number, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.resizing = { type: 'col', index, startPos: event.clientX, startSize: this.colWidth(index) };
  }

  startRowResize(index: number, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.resizing = { type: 'row', index, startPos: event.clientY, startSize: this.rowHeight(index) };
  }

  startEditing(pos: NxCellPos, initial: string): void {
    this.activeCell.set(pos);
    this.selectionAnchor.set(pos);
    this.editDraft = initial;
    this.editingCell.set(pos);
  }

  commitEdit(): void {
    const pos = this.editingCell();
    if (!pos) return;
    const key = address(pos.row, pos.col);
    if (this.editDraft === (this.data[key] ?? '')) {
      // No actual change - don't pollute undo history with a no-op edit.
      this.editingCell.set(null);
      return;
    }
    this.pushUndo();
    const next = { ...this.data };
    if (this.editDraft === '') {
      delete next[key];
    } else {
      next[key] = this.editDraft;
    }
    this.data = next;
    this.dataChange.emit(next);
    this.editingCell.set(null);
  }

  cancelEdit(): void {
    this.editingCell.set(null);
  }

  moveActive(dRow: number, dCol: number, extend = false): void {
    const a = this.activeCell();
    const next = {
      row: Math.min(this.rows - 1, Math.max(0, a.row + dRow)),
      col: Math.min(this.cols - 1, Math.max(0, a.col + dCol)),
    };
    this.activeCell.set(next);
    if (!extend) {
      this.selectionAnchor.set(next);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.editingCell()) {
      if (event.key === 'Enter') {
        event.preventDefault();
        this.commitEdit();
        this.moveActive(1, 0);
      } else if (event.key === 'Tab') {
        event.preventDefault();
        this.commitEdit();
        this.moveActive(0, 1);
      } else if (event.key === 'Escape') {
        this.cancelEdit();
      }
      return;
    }

    const ctrl = event.ctrlKey || event.metaKey;
    if (ctrl && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      this.undo();
      return;
    }
    if (ctrl && (event.key.toLowerCase() === 'y' || (event.shiftKey && event.key.toLowerCase() === 'z'))) {
      event.preventDefault();
      this.redo();
      return;
    }
    if (ctrl && event.key.toLowerCase() === 'c') {
      event.preventDefault();
      this.copySelection();
      return;
    }
    if (ctrl && event.key.toLowerCase() === 'v') {
      event.preventDefault();
      this.pasteSelection();
      return;
    }
    if (event.key === 'Enter' || event.key === 'F2') {
      event.preventDefault();
      const a = this.activeCell();
      this.startEditing(a, this.rawValue(a.row, a.col));
      return;
    }
    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      this.clearSelection();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveActive(1, 0, event.shiftKey);
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveActive(-1, 0, event.shiftKey);
      return;
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.moveActive(0, -1, event.shiftKey);
      return;
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.moveActive(0, 1, event.shiftKey);
      return;
    }
    if (event.key.length === 1 && !ctrl && !event.altKey) {
      const a = this.activeCell();
      this.startEditing(a, event.key);
    }
  }

  private clearSelection(): void {
    this.pushUndo();
    const r = this.selectedRange();
    const next = { ...this.data };
    for (let row = r.r1; row <= r.r2; row++) {
      for (let col = r.c1; col <= r.c2; col++) {
        delete next[address(row, col)];
      }
    }
    this.data = next;
    this.dataChange.emit(next);
  }

  private copySelection(): void {
    const range = this.selectedRange();
    const values: string[][] = [];
    for (let row = range.r1; row <= range.r2; row++) {
      const rowValues: string[] = [];
      for (let col = range.c1; col <= range.c2; col++) {
        rowValues.push(this.rawValue(row, col));
      }
      values.push(rowValues);
    }
    this.clipboard = { range, values };
  }

  private pasteSelection(): void {
    if (!this.clipboard) return;
    this.pushUndo();
    const target = this.activeCell();
    const next = { ...this.data };
    this.clipboard.values.forEach((rowValues, rOffset) => {
      rowValues.forEach((value, cOffset) => {
        const row = target.row + rOffset;
        const col = target.col + cOffset;
        if (row >= this.rows || col >= this.cols) return;
        const key = address(row, col);
        if (value === '') {
          delete next[key];
        } else {
          next[key] = value;
        }
      });
    });
    this.data = next;
    this.dataChange.emit(next);
  }

  exportCSV(filename = this.exportFilename): void {
    const lines: string[] = [];
    for (let row = 0; row < this.rows; row++) {
      const cells: string[] = [];
      for (let col = 0; col < this.cols; col++) {
        const value = this.displayValue(row, col);
        cells.push(/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);
      }
      lines.push(cells.join(','));
    }
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
