import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxAutocompleteOption, NxAutocomplete } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-autocomplete-demo',
  imports: [NxAutocomplete, FormsModule, ReactiveFormsModule, DemoSection],
  templateUrl: './ui-autocomplete-demo.html',
  styleUrl: './ui-autocomplete-demo.scss',
})
export class UiAutocompleteDemo {
  importCode = `import { NxAutocompleteOption, NxAutocomplete } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  private fb = new FormBuilder();

  city = '';

  cityForm = this.fb.group({ city: [''] });

  options = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Berlin', 'London', 'New York'];

  reactiveCode = `<div [formGroup]="cityForm">
    <nx-autocomplete
        label="City"
        placeholder="Search cities..."
        [options]="options"
        formControlName="city">
    </nx-autocomplete>
</div>`;

  reactiveTs = `cityForm = this.fb.group({ city: [''] });

options = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Berlin', 'London', 'New York'];`;

  templateCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="options"
    [(ngModel)]="city">
</nx-autocomplete>`;

  templateTs = `city = '';

options = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Berlin', 'London', 'New York'];`;

  groupCountry = '';

  groupedOptions: NxAutocompleteOption[] = [
    { label: 'Cairo', value: 'Cairo', group: 'Egypt' },
    { label: 'Alexandria', value: 'Alexandria', group: 'Egypt' },
    { label: 'Giza', value: 'Giza', group: 'Egypt' },
    { label: 'Berlin', value: 'Berlin', group: 'Germany' },
    { label: 'Munich', value: 'Munich', group: 'Germany' },
    { label: 'London', value: 'London', group: 'United Kingdom' },
    { label: 'Manchester', value: 'Manchester', group: 'United Kingdom' },
  ];

  groupCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="groupedOptions"
    [(ngModel)]="groupCountry">
</nx-autocomplete>`;

  groupTs = `groupedOptions: NxAutocompleteOption[] = [
    { label: 'Cairo', value: 'Cairo', group: 'Egypt' },
    { label: 'Alexandria', value: 'Alexandria', group: 'Egypt' },
    { label: 'Giza', value: 'Giza', group: 'Egypt' },
    { label: 'Berlin', value: 'Berlin', group: 'Germany' },
    { label: 'Munich', value: 'Munich', group: 'Germany' },
    { label: 'London', value: 'London', group: 'United Kingdom' },
    { label: 'Manchester', value: 'Manchester', group: 'United Kingdom' },
];`;

  selectedCityId: number | null = null;

  cityObjects = [
    { id: 1, name: 'Cairo' },
    { id: 2, name: 'Alexandria' },
    { id: 3, name: 'Giza' },
    { id: 4, name: 'Berlin' },
  ];

  bindCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="cityObjects"
    bindLabel="name"
    bindValue="id"
    [(ngModel)]="selectedCityId">
</nx-autocomplete>`;

  bindTs = `cityObjects = [
    { id: 1, name: 'Cairo' },
    { id: 2, name: 'Alexandria' },
    { id: 3, name: 'Giza' },
    { id: 4, name: 'Berlin' },
];

selectedCityId: number | null = null;`;

  virtualScrollCity = '';

  virtualScrollOptions = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);

  virtualScrollCode = `<nx-autocomplete
    label="Item"
    placeholder="Search items..."
    [options]="virtualScrollOptions"
    [virtualScroll]="true"
    [(ngModel)]="virtualScrollCity">
</nx-autocomplete>`;

  virtualScrollTs = `virtualScrollOptions = Array.from({ length: 5000 }, (_, i) => \`Item \${i + 1}\`);`;

  multipleCities: string[] = [];

  multipleCode = `<nx-autocomplete
    label="Cities"
    placeholder="Search cities..."
    [options]="options"
    [multiple]="true"
    [(ngModel)]="multipleCities">
</nx-autocomplete>`;

  multipleTs = `cities: string[] = [];`;

  floatLabelCity = '';

  floatLabelCode = `<nx-autocomplete
    label="City"
    [options]="options"
    [floatLabel]="true"
    [(ngModel)]="floatLabelCity">
</nx-autocomplete>`;

  filledCity = '';

  filledCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    variant="filled"
    [options]="options"
    [(ngModel)]="filledCity">
</nx-autocomplete>`;

  disabledCity = 'Cairo';

  disabledCode = `<nx-autocomplete
    label="City"
    [options]="options"
    [disabled]="true"
    [(ngModel)]="disabledCity">
</nx-autocomplete>`;

  showClearCity = '';

  showClearCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="options"
    [showClear]="true"
    [(ngModel)]="showClearCity">
</nx-autocomplete>`;

  invalidCity = '';

  invalidCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="options"
    [invalid]="true"
    [(ngModel)]="invalidCity">
</nx-autocomplete>`;
}
