import { Component } from '@angular/core';
import { UiRating } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-rating-demo',
  imports: [UiRating, DemoSection],
  templateUrl: './ui-rating-demo.html',
})
export class UiRatingDemo {
  rating = 3;

  basicCode = `<nx-rating [(value)]="rating"></nx-rating>`;
  basicTs = `rating = 3;`;

  readonlyCode = `<nx-rating [value]="4" [readonly]="true"></nx-rating>`;

  maxCode = `<nx-rating [(value)]="rating" [max]="10"></nx-rating>`;
}
