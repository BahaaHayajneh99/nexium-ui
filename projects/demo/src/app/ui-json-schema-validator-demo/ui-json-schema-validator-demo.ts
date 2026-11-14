import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxJsonSchemaValidator, NxJsonSchemaValidationResult } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

const USER_SCHEMA = `{
  "type": "object",
  "required": ["name", "email", "age"],
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "email": { "type": "string", "minLength": 5 },
    "age": { "type": "number", "minimum": 0, "maximum": 150 },
    "role": { "type": "string", "enum": ["admin", "member", "guest"] }
  }
}`;

const PASSING_DATA = `{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "age": 36,
  "role": "admin"
}`;

const FAILING_DATA = `{
  "name": "Ada Lovelace",
  "age": -4,
  "role": "superuser"
}`;

@Component({
  selector: 'app-ui-json-schema-validator-demo',
  imports: [NxJsonSchemaValidator, DemoSection],
  templateUrl: './ui-json-schema-validator-demo.html',
  styleUrl: './ui-json-schema-validator-demo.scss',
})
export class UiJsonSchemaValidatorDemo {
  importCode = `import { NxJsonSchemaValidator } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  schema = USER_SCHEMA;
  passingData = PASSING_DATA;
  failingData = FAILING_DATA;

  lastResult: NxJsonSchemaValidationResult | null = null;

  onValidated(result: NxJsonSchemaValidationResult): void {
    this.lastResult = result;
  }

  basicCode = `<nx-json-schema-validator
    [schema]="schema"
    [data]="passingData"
    (validated)="onValidated($event)">
</nx-json-schema-validator>`;

  basicTs = `schema = \`{
  "type": "object",
  "required": ["name", "email", "age"],
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "email": { "type": "string", "minLength": 5 },
    "age": { "type": "number", "minimum": 0, "maximum": 150 },
    "role": { "type": "string", "enum": ["admin", "member", "guest"] }
  }
}\`;

passingData = \`{ "name": "Ada Lovelace", "email": "ada@example.com", "age": 36, "role": "admin" }\`;

onValidated(result: { valid: boolean; errors: string[] }): void {
  // result.valid is true/false, result.errors lists human-readable messages
}`;
}
