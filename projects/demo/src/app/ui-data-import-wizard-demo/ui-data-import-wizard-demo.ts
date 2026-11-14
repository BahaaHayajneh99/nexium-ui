import { Component, inject } from '@angular/core';
import { NxDataImportWizard, NxImportConfirmedEvent, NxImportField } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

// Demo-only sample data, matching the shape real parseFile() consumers would resolve.
const SAMPLE_HEADERS = ['Full Name', 'Email', 'Phone'];
const SAMPLE_ROWS: Record<string, string>[] = [
  { 'Full Name': 'Ada Lovelace', Email: 'ada@example.com', Phone: '555-0101' },
  { 'Full Name': 'Grace Hopper', Email: 'grace@example.com', Phone: '' },
  { 'Full Name': 'Alan Turing', Email: '', Phone: '555-0103' },
  { 'Full Name': '', Email: 'no-name@example.com', Phone: '555-0104' },
  { 'Full Name': 'Katherine Johnson', Email: 'katherine@example.com', Phone: '555-0105' },
];

@Component({
  selector: 'app-ui-data-import-wizard-demo',
  imports: [NxDataImportWizard, DemoSection],
  templateUrl: './ui-data-import-wizard-demo.html',
  styleUrl: './ui-data-import-wizard-demo.scss',
})
export class UiDataImportWizardDemo {
  importCode = `import { NxDataImportWizard } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  targetFields: NxImportField[] = [
    { key: 'name', label: 'Name', required: true },
    { key: 'email', label: 'Email', required: true },
    { key: 'phone', label: 'Phone' },
  ];

  lastImport = '';

  // This library ships no CSV/Excel parser, so parseFile is always supplied by the consumer.
  // For this live demo we ignore the actual file contents and resolve fake sample data after a
  // short delay, just to exercise the full upload -> map -> review -> done flow. A real app would
  // read `file` with a CSV-parsing library of its choice (e.g. PapaParse) instead.
  parseFile = (file: File): Promise<{ headers: string[]; rows: Record<string, string>[] }> => {
    void file;
    return new Promise((resolve) => {
      setTimeout(() => resolve({ headers: SAMPLE_HEADERS, rows: SAMPLE_ROWS }), 600);
    });
  };

  basicCode = `<nx-data-import-wizard
    [targetFields]="targetFields"
    [parseFile]="parseFile"
    (importConfirmed)="onImportConfirmed($event)"
    (cancelled)="onCancelled()">
</nx-data-import-wizard>`;

  basicTs = `targetFields: NxImportField[] = [
  { key: 'name', label: 'Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'phone', label: 'Phone' },
];

// This library has no CSV/Excel parser - you supply parseFile(). A real app would read
// the actual File contents (e.g. with a CSV-parsing library of your choice); this demo
// simulates it with fake sample data after a short delay.
parseFile = (file: File): Promise<{ headers: string[]; rows: Record<string, string>[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      headers: ['Full Name', 'Email', 'Phone'],
      rows: [ /* ...parsed rows... */ ],
    }), 600);
  });
};

onImportConfirmed(event: NxImportConfirmedEvent): void {
  // event.mapping: Record<string, string | null>, event.rows: ALL parsed rows.
  // Persist event.rows mapped via event.mapping - this component doesn't persist anything itself.
}`;

  onImportConfirmed(event: NxImportConfirmedEvent): void {
    this.lastImport = `Confirmed ${event.rows.length} row(s) with mapping ${JSON.stringify(event.mapping)}`;
  }

  onCancelled(): void {
    this.lastImport = 'Wizard cancelled.';
  }
}
