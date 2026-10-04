import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSpreadsheet, NxSpreadsheetColumn, NxSpreadsheetData, NxSpreadsheetTheme } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-spreadsheet-demo',
  imports: [NxSpreadsheet, DemoSection],
  templateUrl: './ui-spreadsheet-demo.html',
  styleUrl: './ui-spreadsheet-demo.scss',
})
export class UiSpreadsheetDemo {
  importCode = `import { NxSpreadsheet } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  data: NxSpreadsheetData = {
    A1: 'Category', B1: 'Jan', C1: 'Feb', D1: 'Mar', E1: 'Total',
    A2: 'Rent', B2: '1800', C2: '1800', D2: '1800', E2: '=SUM(B2:D2)',
    A3: 'Payroll', B3: '9200', C3: '9400', D3: '9600', E3: '=SUM(B3:D3)',
    A4: 'Marketing', B4: '2100', C4: '1800', D4: '2400', E4: '=SUM(B4:D4)',
    A5: 'Software', B5: '640', C5: '640', D5: '710', E5: '=SUM(B5:D5)',
    A6: 'Total', B6: '=SUM(B2:B5)', C6: '=SUM(C2:C5)', D6: '=SUM(D2:D5)', E6: '=SUM(E2:E5)',
  };

  onDataChange(data: NxSpreadsheetData): void {
    this.data = data;
  }

  basicCode = `<nx-spreadsheet
    [rows]="12"
    [cols]="6"
    [frozenRows]="1"
    [frozenCols]="1"
    [data]="data"
    (dataChange)="onDataChange($event)"
    exportFilename="monthly-budget">
</nx-spreadsheet>`;

  basicTs = `data: NxSpreadsheetData = {
  A1: 'Category', B1: 'Jan', C1: 'Feb', D1: 'Mar', E1: 'Total',
  A2: 'Rent', B2: '1800', C2: '1800', D2: '1800', E2: '=SUM(B2:D2)',
  A6: 'Total', B6: '=SUM(B2:B5)', C6: '=SUM(C2:C5)', D6: '=SUM(D2:D5)', E6: '=SUM(E2:E5)',
  // ...more rows
};

onDataChange(data: NxSpreadsheetData): void {
  this.data = data; // every edit, formula recalculation, paste, and resize flows back here
}

// Ctrl/Cmd+Z undoes, Ctrl/Cmd+Y (or Ctrl+Shift+Z) redoes - cell edits, clears, pastes, and
// added columns all go on the history stack. The toolbar's ↶/↷ buttons do the same thing for mouse users.`;

  employeeColumns: NxSpreadsheetColumn[] = [
    { label: 'Name', required: true },
    { label: 'Email', required: true, validations: [{ type: 'email' }] },
    { label: 'Department', required: true },
    { label: 'Age', validations: [{ type: 'integer', message: 'Whole numbers only' }, { type: 'min', value: 18, message: 'Must be 18 or older' }] },
    { label: 'Start Date', required: true },
  ];

  employeeData: NxSpreadsheetData = {
    A1: 'Jordan Lee', B1: 'jordan.lee@example.com', C1: 'Engineering', D1: '29', E1: '2024-03-01',
    A2: 'Priya Shah', B2: 'not-an-email', C2: 'Design', D2: '17', E2: '',
    A3: 'Marcus Webb', B3: 'marcus.webb@example.com', C3: 'Sales', D3: '34', E3: '2022-11-14',
  };

  onEmployeeDataChange(data: NxSpreadsheetData): void {
    this.employeeData = data;
  }

  onEmployeeColumnsChange(columns: NxSpreadsheetColumn[]): void {
    this.employeeColumns = columns;
  }

  validationCode = `<nx-spreadsheet
    [rows]="6"
    [cols]="5"
    [frozenRows]="0"
    [columnDefs]="employeeColumns"
    (columnDefsChange)="onEmployeeColumnsChange($event)"
    [data]="employeeData"
    (dataChange)="onEmployeeDataChange($event)">
</nx-spreadsheet>`;

  validationTs = `columnDefs: NxSpreadsheetColumn[] = [
  { label: 'Name', required: true },
  { label: 'Email', required: true, validations: [{ type: 'email' }] },
  { label: 'Department', required: true },
  { label: 'Age', validations: [
    { type: 'integer', message: 'Whole numbers only' },
    { type: 'min', value: 18, message: 'Must be 18 or older' },
  ]},
  { label: 'Start Date', required: true },
];

// 'required' shows a red * next to the header and is enforced automatically - no need to also
// add a { type: 'required' } rule. 'validations' covers everything else: email, number, integer,
// min, max, minLength, maxLength, pattern (your own regex), and custom (your own function).
// A cell that fails its column's rules gets a red outline and the message as its tooltip.`;

  groupedColumns: NxSpreadsheetColumn[] = [
    { label: 'Region' },
    { label: 'Jan', groupLabel: 'Q1' },
    { label: 'Feb', groupLabel: 'Q1' },
    { label: 'Mar', groupLabel: 'Q1' },
    { label: 'Apr', groupLabel: 'Q2' },
    { label: 'May', groupLabel: 'Q2' },
    { label: 'Jun', groupLabel: 'Q2' },
  ];

  groupedData: NxSpreadsheetData = {
    A1: 'East', B1: '120', C1: '134', D1: '145', E1: '150', F1: '162', G1: '171',
    A2: 'West', B2: '98', C2: '110', D2: '115', E2: '120', F2: '128', G2: '140',
    A3: 'Central', B3: '140', C3: '150', D3: '149', E3: '155', F3: '160', G3: '168',
  };

  onGroupedDataChange(data: NxSpreadsheetData): void {
    this.groupedData = data;
  }

  groupedCode = `<nx-spreadsheet
    [rows]="4"
    [cols]="7"
    [frozenCols]="1"
    [columnDefs]="groupedColumns"
    [data]="groupedData"
    (dataChange)="onGroupedDataChange($event)">
</nx-spreadsheet>`;

  groupedTs = `columnDefs: NxSpreadsheetColumn[] = [
  { label: 'Region' },
  { label: 'Jan', groupLabel: 'Q1' },
  { label: 'Feb', groupLabel: 'Q1' },
  { label: 'Mar', groupLabel: 'Q1' },
  { label: 'Apr', groupLabel: 'Q2' },
  { label: 'May', groupLabel: 'Q2' },
  { label: 'Jun', groupLabel: 'Q2' },
];
// Consecutive columns sharing the same groupLabel are merged under one spanning header row.
// 'Region' has no groupLabel, so it renders with no group cell above it.`;

  arabicColumns: NxSpreadsheetColumn[] = [
    { label: 'الفئة', required: true },
    { label: 'يناير' },
    { label: 'فبراير' },
    { label: 'مارس' },
    { label: 'الإجمالي' },
  ];

  arabicData: NxSpreadsheetData = {
    A1: 'الإيجار', B1: '1800', C1: '1800', D1: '1800', E1: '=SUM(B1:D1)',
    A2: 'الرواتب', B2: '9200', C2: '9400', D2: '9600', E2: '=SUM(B2:D2)',
    A3: 'التسويق', B3: '2100', C3: '1800', D3: '2400', E3: '=SUM(B3:D3)',
  };

  onArabicDataChange(data: NxSpreadsheetData): void {
    this.arabicData = data;
  }

  rtlCode = `<nx-spreadsheet
    direction="rtl"
    [rows]="4"
    [cols]="5"
    [frozenCols]="1"
    [columnDefs]="arabicColumns"
    [data]="arabicData"
    (dataChange)="onArabicDataChange($event)">
</nx-spreadsheet>`;

  rtlTs = `direction: 'ltr' | 'rtl' = 'rtl';
// Mirrors the whole grid - column order, frozen-pane edge, and resize handles all flip to the
// correct side automatically. Column labels and cell values can be Arabic (or any script) text
// regardless of direction; direction only controls layout, not what you can type.`;

  customTheme: NxSpreadsheetTheme = {
    headerBackground: '#0f172a',
    accentColor: '#22c55e',
    borderColor: '#1e293b',
    stripedRows: true,
  };

  themeCode = `<nx-spreadsheet
    [rows]="8"
    [cols]="5"
    [frozenRows]="1"
    [theme]="customTheme"
    [data]="data"
    (dataChange)="onDataChange($event)">
</nx-spreadsheet>`;

  themeTs = `customTheme: NxSpreadsheetTheme = {
  headerBackground: '#0f172a',
  accentColor: '#22c55e',
  borderColor: '#1e293b',
  stripedRows: true,
};
// All four are optional and independent - set just the ones you want to override, the rest
// fall back to the surrounding app's own --shell-* theme tokens.`;
}
