import { Component, Input, computed, signal } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxEmptyState } from '../ui-empty-state';
import { NxWordViewer, NxWordBlock } from '../ui-word-viewer';
import { NxExcelViewer, NxExcelSheet } from '../ui-excel-viewer';
import { NxPdfViewer } from '../ui-pdf-viewer';
import { NxMarkdownViewer } from '../ui-markdown-viewer';
import { NxTextViewer } from '../ui-text-viewer';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxDocumentType = 'pdf' | 'word' | 'excel' | 'markdown' | 'text' | 'auto';
type NxResolvedDocumentType = Exclude<NxDocumentType, 'auto'>;

const EXTENSION_MAP: Record<string, NxResolvedDocumentType> = {
  pdf: 'pdf',
  docx: 'word',
  doc: 'word',
  xlsx: 'excel',
  xls: 'excel',
  csv: 'excel',
  md: 'markdown',
};

const TYPE_LABELS: Record<NxResolvedDocumentType, string> = {
  pdf: 'PDF',
  word: 'Word',
  excel: 'Excel',
  markdown: 'Markdown',
  text: 'Text',
};

const TYPE_ICONS: Record<NxResolvedDocumentType, string> = {
  pdf: 'nx-file',
  word: 'nx-file',
  excel: 'nx-grid',
  markdown: 'nx-book',
  text: 'nx-file',
};

/**
 * Auto-detects a document's type (from its filename's extension, or from which parsed-data
 * `@Input()` is actually populated when the extension is missing/ambiguous) and delegates
 * rendering to the matching existing viewer (`NxPdfViewer`, `NxWordViewer`, `NxExcelViewer`,
 * `NxMarkdownViewer`, `NxTextViewer`) - so a consumer handing over "a document" doesn't have to
 * pick the right viewer component themselves. Shows a small toolbar with the detected type and
 * filename, and a "No preview available" empty state when no matching data was supplied.
 */
@Component({
  selector: 'nx-document-viewer',
  standalone: true,
  imports: [NxIcon, NxEmptyState, NxWordViewer, NxExcelViewer, NxPdfViewer, NxMarkdownViewer, NxTextViewer, NxProLocked],
  templateUrl: './ui-document-viewer.html',
  styleUrl: './ui-document-viewer.scss',
})
export class NxDocumentViewer {
  protected readonly licensed = nxProLicenseGranted();

  // Every data-bearing @Input() below is backed by a signal (not a plain field) rather than a
  // plain property, because `detectedType`/`hasData` further down are `computed()`s that read
  // them - a `computed()` that reads a plain field only "sees" it once and then freezes, never
  // re-running when the parent later rebinds a different document.
  private readonly srcSignal = signal<string | undefined>(undefined);
  @Input()
  get src(): string | undefined {
    return this.srcSignal();
  }
  set src(value: string | undefined) {
    this.srcSignal.set(value);
  }

  private readonly filenameSignal = signal('document');
  @Input()
  get filename(): string {
    return this.filenameSignal();
  }
  set filename(value: string) {
    this.filenameSignal.set(value || 'document');
  }

  private readonly typeSignal = signal<NxDocumentType>('auto');
  @Input()
  get type(): NxDocumentType {
    return this.typeSignal();
  }
  set type(value: NxDocumentType) {
    this.typeSignal.set(value || 'auto');
  }

  private readonly wordBlocksSignal = signal<NxWordBlock[] | undefined>(undefined);
  @Input()
  get wordBlocks(): NxWordBlock[] | undefined {
    return this.wordBlocksSignal();
  }
  set wordBlocks(value: NxWordBlock[] | undefined) {
    this.wordBlocksSignal.set(value);
  }

  private readonly excelSheetsSignal = signal<NxExcelSheet[] | undefined>(undefined);
  @Input()
  get excelSheets(): NxExcelSheet[] | undefined {
    return this.excelSheetsSignal();
  }
  set excelSheets(value: NxExcelSheet[] | undefined) {
    this.excelSheetsSignal.set(value);
  }

  private readonly markdownSourceSignal = signal<string | undefined>(undefined);
  @Input()
  get markdownSource(): string | undefined {
    return this.markdownSourceSignal();
  }
  set markdownSource(value: string | undefined) {
    this.markdownSourceSignal.set(value);
  }

  private readonly textContentSignal = signal<string | undefined>(undefined);
  @Input()
  get textContent(): string | undefined {
    return this.textContentSignal();
  }
  set textContent(value: string | undefined) {
    this.textContentSignal.set(value);
  }

  /** Type implied by the filename's extension alone - `null` when there's no extension, or it isn't one we recognize. */
  private readonly extensionType = computed<NxResolvedDocumentType | null>(() => {
    const name = this.filename.toLowerCase();
    const dot = name.lastIndexOf('.');
    if (dot < 0 || dot === name.length - 1) return null;
    return EXTENSION_MAP[name.slice(dot + 1)] ?? null;
  });

  /** Falls back to "whichever data input is actually populated" when the extension doesn't tell us. */
  private readonly dataBasedType = computed<NxResolvedDocumentType | null>(() => {
    if (this.src) return 'pdf';
    if (this.wordBlocks?.length) return 'word';
    if (this.excelSheets?.length) return 'excel';
    if (this.markdownSource) return 'markdown';
    if (this.textContent) return 'text';
    return null;
  });

  readonly detectedType = computed<NxResolvedDocumentType>(() => {
    if (this.type !== 'auto') return this.type;
    return this.extensionType() ?? this.dataBasedType() ?? 'text';
  });

  readonly hasData = computed<boolean>(() => {
    switch (this.detectedType()) {
      case 'pdf':
        return !!this.src;
      case 'word':
        return !!this.wordBlocks?.length;
      case 'excel':
        return !!this.excelSheets?.length;
      case 'markdown':
        return !!this.markdownSource;
      case 'text':
        return !!this.textContent;
    }
  });

  readonly typeLabel = computed(() => TYPE_LABELS[this.detectedType()]);
  readonly typeIcon = computed(() => TYPE_ICONS[this.detectedType()]);
}
