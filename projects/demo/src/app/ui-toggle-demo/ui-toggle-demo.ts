import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxToggle } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-toggle-demo',
  imports: [NxToggle, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-toggle-demo.html',
  styleUrl: './ui-toggle-demo.scss',
})
export class UiToggleDemo {
  importCode = `import { NxToggle } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  bold = false;
  italic = false;

  private fb = new FormBuilder();

  boldForm = this.fb.group({ bold: [false] });

  basicCode = `<nx-toggle [(pressed)]="bold">Bold</nx-toggle>
<nx-toggle [(pressed)]="italic">Italic</nx-toggle>`;

  basicTs = `bold = false;
italic = false;`;

  reactiveCode = `<div [formGroup]="boldForm">
    <nx-toggle formControlName="bold">Bold</nx-toggle>
</div>`;

  reactiveTs = `boldForm = this.fb.group({ bold: [false] });`;

  templateCode = `<nx-toggle [(ngModel)]="bold">Bold</nx-toggle>`;

  templateTs = `bold = false;`;
}
