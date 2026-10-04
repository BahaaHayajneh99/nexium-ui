import { Component, Input, computed, signal } from '@angular/core';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxWordBlockType = 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'bullet' | 'numbered';

export interface NxWordRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface NxWordBlock {
  type: NxWordBlockType;
  runs: NxWordRun[];
}

interface NxWordRenderGroup {
  type: NxWordBlockType;
  /** Consecutive blocks of the same list type share one `<ul>`/`<ol>` - always length 1 for non-list types. */
  items: NxWordBlock[];
}

/**
 * Renders a structured, page-like document - headings, paragraphs, bulleted/numbered lists, and
 * bold/italic/underline text runs. This is a viewer for a parsed document *model*, not a `.docx`
 * binary parser (that's a ZIP+XML format well outside a zero-dependency component's scope) -
 * convert a real Word file to `NxWordBlock[]` with a library like mammoth.js first, then hand the
 * result to this component.
 */
@Component({
  selector: 'nx-word-viewer',
  standalone: true,
  imports: [NxIcon, NxProLocked],
  templateUrl: './ui-word-viewer.html',
  styleUrl: './ui-word-viewer.scss',
})
export class NxWordViewer {
  protected readonly licensed = nxProLicenseGranted();

  @Input() title = 'Document';

  // Backed by a signal (not a plain field) so `renderGroups`/`wordCount` below - both
  // `computed()`s reading `this.blocks` - actually re-run when the parent rebinds a different
  // document, instead of permanently caching whatever they first saw on initial render.
  private readonly blocksSignal = signal<NxWordBlock[]>([]);
  @Input()
  get blocks(): NxWordBlock[] {
    return this.blocksSignal();
  }
  set blocks(value: NxWordBlock[]) {
    this.blocksSignal.set(value);
  }

  zoom = signal(100);

  readonly renderGroups = computed<NxWordRenderGroup[]>(() => {
    const groups: NxWordRenderGroup[] = [];
    for (const block of this.blocks) {
      const last = groups.at(-1);
      const isList = block.type === 'bullet' || block.type === 'numbered';
      if (last && isList && last.type === block.type) {
        last.items.push(block);
      } else {
        groups.push({ type: block.type, items: [block] });
      }
    }
    return groups;
  });

  readonly wordCount = computed(() => {
    const text = this.blocks.map((b) => b.runs.map((r) => r.text).join('')).join(' ');
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  });

  zoomIn(): void {
    this.zoom.update((z) => Math.min(150, z + 10));
  }

  zoomOut(): void {
    this.zoom.update((z) => Math.max(60, z - 10));
  }

  print(): void {
    window.print();
  }
}
