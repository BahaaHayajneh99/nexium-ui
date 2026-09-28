import { Component, Input } from '@angular/core';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export type NxDiffLineType = 'unchanged' | 'added' | 'removed';

export interface NxDiffLine {
  type: NxDiffLineType;
  oldLineNumber: number | null;
  newLineNumber: number | null;
  text: string;
}

/** Computes a line-based diff via the classic LCS algorithm - fine for typical config/snippet-sized text, not optimized for huge files. */
function computeLineDiff(oldLines: string[], newLines: string[]): NxDiffLine[] {
  const m = oldLines.length;
  const n = newLines.length;
  const lcs: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] = oldLines[i] === newLines[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const result: NxDiffLine[] = [];
  let i = 0;
  let j = 0;
  let oldNum = 1;
  let newNum = 1;

  while (i < m && j < n) {
    if (oldLines[i] === newLines[j]) {
      result.push({ type: 'unchanged', oldLineNumber: oldNum++, newLineNumber: newNum++, text: oldLines[i] });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      result.push({ type: 'removed', oldLineNumber: oldNum++, newLineNumber: null, text: oldLines[i] });
      i++;
    } else {
      result.push({ type: 'added', oldLineNumber: null, newLineNumber: newNum++, text: newLines[j] });
      j++;
    }
  }
  while (i < m) {
    result.push({ type: 'removed', oldLineNumber: oldNum++, newLineNumber: null, text: oldLines[i++] });
  }
  while (j < n) {
    result.push({ type: 'added', oldLineNumber: null, newLineNumber: newNum++, text: newLines[j++] });
  }

  return result;
}

/** A unified line-by-line diff between two text blocks, with +/- gutters and line numbers. */
@Component({
  selector: 'nx-diff-viewer',
  standalone: true,
  imports: [NxProLocked],
  templateUrl: './ui-diff-viewer.html',
  styleUrl: './ui-diff-viewer.scss',
})
export class NxDiffViewer {
  protected readonly licensed = nxProLicenseGranted();

  @Input() oldText = '';
  @Input() newText = '';

  get diffLines(): NxDiffLine[] {
    return computeLineDiff(this.oldText.split('\n'), this.newText.split('\n'));
  }
}
