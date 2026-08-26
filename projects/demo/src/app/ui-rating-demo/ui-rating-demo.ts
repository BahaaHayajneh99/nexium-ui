import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxRating } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-rating-demo',
  imports: [NxRating, DemoSection, FormsModule, ReactiveFormsModule],
  templateUrl: './ui-rating-demo.html',
})
export class UiRatingDemo {
  importCode = `import { NxRating } from 'nexium-ui';`;

  rating = 3;

  private fb = new FormBuilder();

  ratingForm = this.fb.group({ rating: [3] });

  reactiveCode = `<div [formGroup]="ratingForm">
    <nx-rating formControlName="rating"></nx-rating>
</div>`;
  reactiveTs = `ratingForm = this.fb.group({ rating: [3] });`;

  templateCode = `<nx-rating [(ngModel)]="rating"></nx-rating>`;
  templateTs = `rating = 3;`;

  readonlyCode = `<nx-rating [value]="4" [readonly]="true"></nx-rating>`;

  maxCode = `<nx-rating [(ngModel)]="rating" [max]="10"></nx-rating>`;
}
