import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxUnitInput } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-unit-input-demo',
  imports: [NxUnitInput, FormsModule, DemoSection],
  templateUrl: './ui-unit-input-demo.html',
  styleUrl: './ui-unit-input-demo.scss',
})
export class UiUnitInputDemo {
  importCode = `import { NxUnitInput } from 'nexium-ui';`;

  price: number | null = null;

  currencyCode = `<nx-unit-input label="Price" [units]="['$']" unitPosition="prefix" [(ngModel)]="price"></nx-unit-input>`;

  currencyTs = `price: number | null = null;`;

  currencies = ['$', '€', '£', '¥'];
  budget: number | null = null;
  selectedCurrency = '$';

  multiCurrencyCode = `<nx-unit-input
    label="Budget"
    [units]="currencies"
    unitPosition="prefix"
    [(ngModel)]="budget"
    [(unit)]="selectedCurrency">
</nx-unit-input>`;

  multiCurrencyTs = `currencies = ['$', '€', '£', '¥'];
budget: number | null = null;
selectedCurrency = '$';`;

  weight: number | null = null;

  weightCode = `<nx-unit-input label="Weight" [units]="['kg', 'lb', 'g']" unitPosition="suffix" [(ngModel)]="weight"></nx-unit-input>`;

  weightTs = `weight: number | null = null;`;

  percentage: number | null = null;

  requiredCode = `<nx-unit-input label="Percentage" [units]="['%']" [isRequired]="true" [(ngModel)]="percentage"></nx-unit-input>`;

  requiredTs = `percentage: number | null = null;`;

  lockedValue: number | null = 1500;

  disabledCode = `<nx-unit-input label="Locked value" [units]="['$']" [(ngModel)]="lockedValue" [disabled]="true"></nx-unit-input>`;

  disabledTs = `lockedValue: number | null = 1500;`;
}
