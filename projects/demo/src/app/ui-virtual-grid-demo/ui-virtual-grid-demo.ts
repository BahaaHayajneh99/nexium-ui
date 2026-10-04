import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxVirtualGrid } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-virtual-grid-demo',
  imports: [NxVirtualGrid, DemoSection],
  templateUrl: './ui-virtual-grid-demo.html',
  styleUrl: './ui-virtual-grid-demo.scss',
})
export class UiVirtualGridDemo {
  importCode = `import { NxVirtualGrid } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // 5,000 rows x 30 columns - 150,000 cells total, but only the handful that fit in the
  // viewport (plus a small buffer) are ever actually rendered to the DOM at once.
  bigGridCode = `<nx-virtual-grid
    [rowCount]="5000"
    [columnCount]="30"
    [rowHeight]="32"
    [columnWidth]="110"
    [height]="360"
    [width]="640"
    [getCellValue]="bigGridCellValue">
</nx-virtual-grid>`;

  bigGridTs = `bigGridCellValue = (row: number, col: number): string => \`R\${row}C\${col}\`;`;

  bigGridCellValue = (row: number, col: number): string => `R${row}C${col}`;

  // A smaller 50x10 grid proving getCellValue can drive real, differently-formatted tabular
  // content per cell rather than a repeated placeholder string.
  tableGridCode = `<nx-virtual-grid
    [rowCount]="50"
    [columnCount]="10"
    [rowHeight]="36"
    [columnWidth]="130"
    [height]="320"
    [width]="640"
    [getCellValue]="salesCellValue">
</nx-virtual-grid>`;

  tableGridTs = `private readonly columnLabels = ['Region', 'Q1', 'Q2', 'Q3', 'Q4', 'Total', 'Growth', 'Units', 'Avg Price', 'Rank'];

salesCellValue = (row: number, col: number): string => {
  if (col === 0) return \`Region \${row + 1}\`;
  const base = (row + 1) * (col + 1) * 137.42;
  if (col === 6) return \`\${(((row * 7 + col) % 21) - 5).toFixed(1)}%\`;
  if (col === 9) return \`#\${(row % 50) + 1}\`;
  return \`$\${base.toLocaleString(undefined, { maximumFractionDigits: 0 })}\`;
};`;

  salesCellValue = (row: number, col: number): string => {
    if (col === 0) return `Region ${row + 1}`;
    const base = (row + 1) * (col + 1) * 137.42;
    if (col === 6) return `${(((row * 7 + col) % 21) - 5).toFixed(1)}%`;
    if (col === 9) return `#${(row % 50) + 1}`;
    return `$${base.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };
}
