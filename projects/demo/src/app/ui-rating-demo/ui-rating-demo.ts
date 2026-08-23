import { Component } from '@angular/core';
import { NxRating } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-rating-demo',
  imports: [NxRating, DemoSection],
  templateUrl: './ui-rating-demo.html',
})
export class UiRatingDemo {
  importCode = `import { NxRating } from 'nexium-ui';`;

  rating = 3;

  basicCode = `<nx-rating [(value)]="rating"></nx-rating>`;
  basicTs = `rating = 3;`;

  readonlyCode = `<nx-rating [value]="4" [readonly]="true"></nx-rating>`;

  maxCode = `<nx-rating [(value)]="rating" [max]="10"></nx-rating>`;
}
