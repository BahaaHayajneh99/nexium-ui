import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxExcelViewer, NxExcelSheet } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-excel-viewer-demo',
  imports: [NxExcelViewer, DemoSection],
  templateUrl: './ui-excel-viewer-demo.html',
  styleUrl: './ui-excel-viewer-demo.scss',
})
export class UiExcelViewerDemo {
  importCode = `import { NxExcelViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  sheets: NxExcelSheet[] = [
    {
      name: 'Revenue',
      rows: [
        ['Region', 'Q1', 'Q2', 'Q3'],
        ['West', '73000', '78300', '86600'],
        ['East', '80100', '85300', '87300'],
        ['Central', '38900', '41200', '39700'],
      ],
    },
    {
      name: 'Headcount',
      rows: [
        ['Team', 'Jan', 'Jun', 'Dec'],
        ['Engineering', '12', '15', '19'],
        ['Sales', '6', '8', '10'],
        ['Support', '4', '5', '6'],
      ],
    },
  ];

  basicCode = `<nx-excel-viewer [sheets]="sheets" exportFilename="workbook"></nx-excel-viewer>`;

  basicTs = `sheets: NxExcelSheet[] = [
  { name: 'Revenue', rows: [
    ['Region', 'Q1', 'Q2', 'Q3'],
    ['West', '73000', '78300', '86600'],
    // ...more rows
  ] },
  { name: 'Headcount', rows: [ /* ... */ ] },
  // convert a real .xlsx with a library like SheetJS to get from a workbook to this shape
];`;
}
