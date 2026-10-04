import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxTextStatistics, NxTextarea } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-text-statistics-demo',
  imports: [NxTextStatistics, NxTextarea, FormsModule, DemoSection],
  templateUrl: './ui-text-statistics-demo.html',
  styleUrl: './ui-text-statistics-demo.scss',
})
export class UiTextStatisticsDemo {
  importCode = `import { NxTextStatistics } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  text = `NexiumUI is a modern, comprehensive UI component library built with Angular 21+. It features standalone components with no external dependencies like Angular Material or CDK.

Every component is designed with accessibility, performance, and customization in mind. Type or paste your own text above to see the stats update live.`;

  basicCode = `<nx-textarea [(ngModel)]="text" [rows]="6"></nx-textarea>
<nx-text-statistics [text]="text"></nx-text-statistics>`;

  basicTs = `text = 'Paste or type anything here...';`;
}
