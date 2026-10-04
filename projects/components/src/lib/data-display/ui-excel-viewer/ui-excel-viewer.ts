import { Component, Input, computed, signal } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxExcelSheet {
  name: string;
  rows: string[][];
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

/**
 * A read-only, multi-sheet spreadsheet viewer with sheet tabs, column-letter/row-number headers,
 * and CSV export of the active sheet. Like `NxWordViewer`, this renders already-parsed sheet
 * *data* (`string[][]` rows) rather than parsing a real `.xlsx` file - pair it with a library
 * like SheetJS to get from a real workbook to this shape. For an *editable* grid with formulas,
 * reach for `NxSpreadsheet` instead.
 */
@Component({
  selector: 'nx-excel-viewer',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-excel-viewer.html',
  styleUrl: './ui-excel-viewer.scss',
})
export class NxExcelViewer {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `activeSheet` below - a `computed()` reading
  // `this.sheets` - actually re-runs when the parent rebinds a different workbook, instead of
  // permanently caching whatever it first saw on initial render.
  private readonly sheetsSignal = signal<NxExcelSheet[]>([]);
  @Input()
  get sheets(): NxExcelSheet[] {
    return this.sheetsSignal();
  }
  set sheets(value: NxExcelSheet[]) {
    this.sheetsSignal.set(value);
  }
  @Input() exportFilename = 'sheet';

  activeIndex = signal(0);
  colLetter = colLetter;

  readonly activeSheet = computed<NxExcelSheet | null>(() => this.sheets[this.activeIndex()] ?? null);

  readonly columnIndexes = computed(() => {
    const sheet = this.activeSheet();
    if (!sheet) return [];
    const maxCols = sheet.rows.reduce((max, row) => Math.max(max, row.length), 0);
    return Array.from({ length: maxCols }, (_, i) => i);
  });

  selectSheet(index: number): void {
    this.activeIndex.set(index);
  }

  cell(row: string[], col: number): string {
    return row[col] ?? '';
  }

  exportCSV(): void {
    const sheet = this.activeSheet();
    if (!sheet) return;
    const lines = sheet.rows.map((row) =>
      row.map((cell) => (/[",\n]/.test(cell) ? `"${cell.replace(/"/g, '""')}"` : cell)).join(','),
    );
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.exportFilename}-${sheet.name}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }
}
