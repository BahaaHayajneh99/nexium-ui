import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { UiCardActions, UiCardContent, UiCardFooter, UiCardHeader, UiCardTitle, UiCardSubtitle, UiCard, UiCardImage } from '../../../../../dist/components';
import { UiButton } from 'components';
import { NgStyle } from '@angular/common';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-card-demo',
  standalone: true,
  imports: [UiCard, UiButton, UiCardImage, UiCardActions, UiCardContent, UiCardFooter, UiCardHeader, UiCardTitle, UiCardSubtitle, NgStyle, DemoSection],
  templateUrl: './ui-card-demo.html',
  styleUrl: './ui-card-demo.scss',
})
export class UiCardDemo {
  public commonService = inject(CommonService);
  basicCode = `<nx-card>
    <nx-card-content>Card Content</nx-card-content>
</nx-card>`;

  headerCode = `<nx-card>
    <nx-card-header>
        <nx-card-title>Card Title</nx-card-title>
    </nx-card-header>
</nx-card>`;

  imageCode = `<nx-card>
    <nx-card-image>
        <img src="image.jpg" alt="Card Image">
    </nx-card-image>
    <nx-card-content>Card Content</nx-card-content>
</nx-card>`;

  subtitleCode = `<nx-card-header>
    <nx-card-title>Title</nx-card-title>
    <nx-card-subtitle>Subtitle</nx-card-subtitle>
</nx-card-header>`;

  completeCode = `<nx-card>
    <nx-card-header>
        <nx-card-title>${this.commonService.appName} Card</nx-card-title>
        <nx-card-subtitle>UI Component</nx-card-subtitle>
    </nx-card-header>

    <nx-card-content>
        Content goes here
    </nx-card-content>

    <nx-card-actions>
        Actions
    </nx-card-actions>

    <nx-card-footer>
        Footer
    </nx-card-footer>
</nx-card>`;

  variantsCode = `<nx-card variant="flat">Flat Card</nx-card>
<nx-card variant="outlined">Outlined Card</nx-card>
<nx-card variant="elevated">Elevated Card</nx-card>`;

  hoverableCode = `<nx-card hoverable>
    Hover Card
</nx-card>`;

  sizesCode = `<nx-card size="small">Small Card</nx-card>
<nx-card size="medium">Medium Card</nx-card>
<nx-card size="large">Large Card</nx-card>`;
}
