import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxFormulaField, NxFormulaInput, NxFormulaToken } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-formula-input-demo',
  imports: [NxFormulaInput, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-formula-input-demo.html',
  styleUrl: './ui-formula-input-demo.scss',
})
export class UiFormulaInputDemo {
  importCode = `import { NxFormulaInput } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  fields: NxFormulaField[] = [
    { name: 'price', label: 'Unit price' },
    { name: 'quantity', label: 'Quantity' },
    { name: 'discount', label: 'Discount %' },
  ];

  formula = '{{price}} * {{quantity}}';
  tokens: NxFormulaToken[] = [];

  basicDescription =
    `The ${this.commonService.appName} Formula Input is a single-line field for expression-like text. ` +
    `Typing the trigger ({{ by default) opens a suggestion list of fields to insert as {{name}} references - ` +
    `unlike Mention, tokens need a closing delimiter, so formulas like {{price}}*{{qty}} with no spaces between ` +
    `them still parse correctly. Every reference currently in the value shows below as a resolved chip.`;

  basicCode = `<nx-formula-input
    placeholder="Type {{ to insert a field..."
    [fields]="fields"
    [(value)]="formula"
    (tokensChange)="tokens = $event">
</nx-formula-input>`;

  basicTs = `fields: NxFormulaField[] = [
  { name: 'price', label: 'Unit price' },
  { name: 'quantity', label: 'Quantity' },
  { name: 'discount', label: 'Discount %' },
];

formula = '{{price}} * {{quantity}}';
tokens: NxFormulaToken[] = [];`;

  unknownFormula = '{{price}} + {{tax}}';

  unknownCode = `<nx-formula-input [fields]="fields" [(value)]="unknownFormula"></nx-formula-input>`;

  unknownTs = `// "tax" isn't in \`fields\` - its chip is flagged so typos are easy to spot.
unknownFormula = '{{price}} + {{tax}}';`;

  private fb = new FormBuilder();
  formulaForm = this.fb.group({ formula: ['{{price}} * {{quantity}}'] });

  reactiveCode = `<div [formGroup]="formulaForm">
    <nx-formula-input [fields]="fields" formControlName="formula"></nx-formula-input>
</div>`;

  reactiveTs = `formulaForm = this.fb.group({ formula: ['{{price}} * {{quantity}}'] });`;

  required = '';

  requiredCode = `<nx-formula-input
    [fields]="fields"
    [isRequired]="true"
    [(ngModel)]="required">
</nx-formula-input>`;

  requiredTs = `required = '';`;

  customFormula = '';

  customDescription =
    'triggerOpen/triggerClose default to the double-brace {{ }} pair, but any pair of strings works - ' +
    'e.g. double square brackets, to match a different templating convention.';

  customCode = `<nx-formula-input
    triggerOpen="[["
    triggerClose="]]"
    placeholder="Type [[ to insert a field..."
    [fields]="fields"
    [(value)]="customFormula">
</nx-formula-input>`;

  customTs = `customFormula = '';`;
}
