import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAutocompleteOption, NxAutocomplete } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-autocomplete-demo',
  imports: [NxAutocomplete, DemoSection],
  templateUrl: './ui-autocomplete-demo.html',
  styleUrl: './ui-autocomplete-demo.scss',
})
export class UiAutocompleteDemo {
  importCode = `import { NxAutocompleteOption, NxAutocomplete } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  city = '';

  options = ['Cairo', 'Alexandria', 'Giza', 'Luxor', 'Aswan', 'Berlin', 'London', 'New York'];

  basicCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="options"
    [(value)]="city">
</nx-autocomplete>`;

  basicTs = `city = '';

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
    [(value)]="city">
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

  virtualScrollCity = '';

  virtualScrollOptions = Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`);

  virtualScrollCode = `<nx-autocomplete
    label="Item"
    placeholder="Search items..."
    [options]="virtualScrollOptions"
    [virtualScroll]="true"
    [(value)]="city">
</nx-autocomplete>`;

  virtualScrollTs = `virtualScrollOptions = Array.from({ length: 5000 }, (_, i) => \`Item \${i + 1}\`);`;

  multipleCities: string[] = [];

  multipleCode = `<nx-autocomplete
    label="Cities"
    placeholder="Search cities..."
    [options]="options"
    [multiple]="true"
    [(values)]="cities">
</nx-autocomplete>`;

  multipleTs = `cities: string[] = [];`;

  floatLabelCity = '';

  floatLabelCode = `<nx-autocomplete
    label="City"
    [options]="options"
    [floatLabel]="true"
    [(value)]="city">
</nx-autocomplete>`;

  filledCity = '';

  filledCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    variant="filled"
    [options]="options"
    [(value)]="city">
</nx-autocomplete>`;

  disabledCity = 'Cairo';

  disabledCode = `<nx-autocomplete
    label="City"
    [options]="options"
    [disabled]="true"
    [(value)]="city">
</nx-autocomplete>`;

  showClearCity = '';

  showClearCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="options"
    [showClear]="true"
    [(value)]="city">
</nx-autocomplete>`;

  invalidCity = '';

  invalidCode = `<nx-autocomplete
    label="City"
    placeholder="Search cities..."
    [options]="options"
    [invalid]="true"
    [(value)]="city">
</nx-autocomplete>`;
}
