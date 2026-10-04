import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NxAddressInput, NxAddress } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-address-input-demo',
  imports: [NxAddressInput, FormsModule, JsonPipe, DemoSection],
  templateUrl: './ui-address-input-demo.html',
  styleUrl: './ui-address-input-demo.scss',
})
export class UiAddressInputDemo {
  importCode = `import { NxAddressInput } from 'nexium-ui';`;

  address: NxAddress | null = null;

  basicCode = `<nx-address-input (valueChange)="address = $event"></nx-address-input>`;
  basicTs = `address: NxAddress | null = null;`;

  requiredAddress: NxAddress | null = null;

  requiredCode = `<nx-address-input [isRequired]="true" (valueChange)="requiredAddress = $event"></nx-address-input>`;
  requiredTs = `// isRequired marks street/city/postalCode/country as required.
// The validation message only appears once a field has been touched.
requiredAddress: NxAddress | null = null;`;

  prefilledAddress: NxAddress = {
    street: '221B Baker Street',
    street2: '',
    city: 'London',
    state: '',
    postalCode: 'NW1 6XE',
    country: 'GB',
  };

  disabledCode = `<nx-address-input [(ngModel)]="prefilledAddress" [disabled]="true"></nx-address-input>`;
  disabledTs = `// NxAddressInput implements ControlValueAccessor, so it also plugs
// into [(ngModel)] or a reactive FormGroup.
prefilledAddress: NxAddress = {
  street: '221B Baker Street',
  street2: '',
  city: 'London',
  state: '',
  postalCode: 'NW1 6XE',
  country: 'GB',
};`;
}
