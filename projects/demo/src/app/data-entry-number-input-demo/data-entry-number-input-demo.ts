import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';
import { NxNumber } from '../../../../components/src/lib/forms/ui-number';

@Component({
  selector: 'app-data-entry-number-input-demo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DemoSection, NxNumber],
  templateUrl: './data-entry-number-input-demo.html',
  styleUrl: './data-entry-number-input-demo.scss',
})
export class DataEntryNumberInputDemo {
  commonService = inject(CommonService);

  importCode = `import { NxNumber } from 'nexium-ui';`;

  quantity = 1;
  price = 99.99;
  percentage = 50;
  stepValue = 10;
  rangedValue = 25;
  visibilityValue = 5;
  showDecreaseButton = true;
  showIncreaseButton = true;
  showStepButtons = true;
  amountValue = 250;
  percentValue = 15;

  basicCode = `<nx-number
  label="Quantity"
  [(ngModel)]="quantity"
  [min]="1"
  [max]="100"
  [step]="1"
  placeholder="Enter quantity">
</nx-number>`;

  stepCode = `<nx-number
  label="Step: 5"
  [(ngModel)]="stepValue"
  [step]="5"
  [min]="0"
  [max]="100">
</nx-number>`;

  minMaxCode = `<nx-number
  label="Range: 10 to 50"
  [(ngModel)]="rangedValue"
  [min]="10"
  [max]="50"
  [step]="1">
</nx-number>`;

  buttonControlCode = `<nx-number
  label="Button Visibility"
  [(ngModel)]="visibilityValue"
  [showStepButtons]="showStepButtons"
  [showDecreaseButton]="showDecreaseButton"
  [showIncreaseButton]="showIncreaseButton"
  [step]="1">
</nx-number>`;

  prefixCode = `<nx-number
  label="Price"
  [(ngModel)]="amountValue"
  prefix="$"
  [step]="0.01"
  [min]="0">
</nx-number>

<nx-number
  label="Discount"
  [(ngModel)]="percentValue"
  suffix="%"
  [min]="0"
  [max]="100">
</nx-number>`;

  features = [
    { name: 'Min/Max Values', description: 'Set range constraints' },
    { name: 'Step Control', description: 'Define increment steps' },
    { name: 'Decimal Support', description: 'Handle fractional numbers' },
    { name: 'Input Validation', description: 'Built-in number validation' },
    { name: 'Button Visibility', description: 'Show/hide increase and decrease buttons' },
    { name: 'Prefix & Suffix', description: 'Display $, %, or custom symbols' },
  ];

  requiredQuantity: number | null = null;

  requiredCode = `<nx-number label="Quantity" placeholder="Enter quantity" [isRequired]="true" [(ngModel)]="requiredQuantity"></nx-number>`;

  requiredTs = `requiredQuantity: number | null = null;`;

  useCases = [
    { title: 'E-commerce', description: 'Product quantity selection' },
    { title: 'Pricing', description: 'Price and discount calculations' },
    { title: 'Analytics', description: 'Metric and statistic inputs' },
    { title: 'Surveys', description: 'Rating and scoring inputs' },
    { title: 'Finance', description: 'Currency and amount entries' },
    { title: 'Inventory', description: 'Stock and quantity tracking' },
  ];
}
