import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxTextarea } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-textarea-demo',
  imports: [NxTextarea, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-textarea-demo.html',
  styleUrl: './ui-textarea-demo.scss',
})
export class UiTextareaDemo {
  importCode = `import { NxTextarea } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  message = '';

  private fb = new FormBuilder();

  messageForm = this.fb.group({ message: [''] });

  reactiveCode = `<div [formGroup]="messageForm">
    <nx-textarea label="Message" placeholder="Write your message" formControlName="message"></nx-textarea>
</div>`;

  reactiveTs = `messageForm = this.fb.group({ message: [''] });`;

  templateCode = `<nx-textarea label="Message" placeholder="Write your message" [(ngModel)]="message">
</nx-textarea>`;

  templateTs = `message = '';`;

  rowsCode = `<nx-textarea label="Description" [rows]="6" [(ngModel)]="message">
</nx-textarea>`;

  rowsTs = this.templateTs;
}
