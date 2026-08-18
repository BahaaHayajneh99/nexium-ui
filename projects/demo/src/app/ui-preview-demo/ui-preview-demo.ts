import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiPreview } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-preview-demo',
  imports: [UiPreview, DemoSection],
  templateUrl: './ui-preview-demo.html',
  styleUrl: './ui-preview-demo.scss',
})
export class UiPreviewDemo {
  public commonService = inject(CommonService);
  imageCode = `<nx-preview src="https://picsum.photos/seed/nexium-preview/600/400" fileName="photo.jpg" type="image">
</nx-preview>`;

  documentCode = `<nx-preview src="report.pdf" fileName="report.pdf" type="document">
</nx-preview>`;
}
