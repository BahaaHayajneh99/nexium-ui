import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTextarea } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-textarea-demo',
  imports: [NxTextarea, DemoSection],
  templateUrl: './ui-textarea-demo.html',
  styleUrl: './ui-textarea-demo.scss',
})
export class UiTextareaDemo {
  importCode = `import { NxTextarea } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  message = '';

  basicCode = `<nx-textarea label="Message" placeholder="Write your message" [(value)]="message">
</nx-textarea>`;

  basicTs = `message = '';`;

  rowsCode = `<nx-textarea label="Description" [rows]="6" [(value)]="message">
</nx-textarea>`;

  rowsTs = this.basicTs;
}
