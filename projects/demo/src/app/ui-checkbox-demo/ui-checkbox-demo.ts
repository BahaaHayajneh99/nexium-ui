import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxCheckbox } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Category {
  key: string;
  label: string;
}

@Component({
  selector: 'app-ui-checkbox-demo',
  imports: [NxCheckbox, DemoSection],
  templateUrl: './ui-checkbox-demo.html',
  styleUrl: './ui-checkbox-demo.scss',
})
export class UiCheckboxDemo {
  importCode = `import { NxCheckbox } from 'nexium-ui';`;

  public commonService = inject(CommonService);
  agreed = false;

  basicCode = `<nx-checkbox label="I agree to the terms and conditions" [(checked)]="agreed">
</nx-checkbox>`;

  basicTs = `agreed = false;`;

  disabledCode = `<nx-checkbox label="Disabled option" [disabled]="true">
</nx-checkbox>`;

  categories: Category[] = [
    { key: 'books', label: 'Books' },
    { key: 'movies', label: 'Movies' },
    { key: 'music', label: 'Music' },
    { key: 'games', label: 'Games' },
  ];

  selectedCategories: string[] = ['books'];
  dynamicLayout: 'inline' | 'block' = 'inline';

  dynamicCode = `<div [class.nx-checkbox-list-inline]="dynamicLayout === 'inline'">
    @for (category of categories; track category.key) {
        <nx-checkbox
            [label]="category.label"
            [checked]="selectedCategories.includes(category.key)"
            (checkedChange)="toggleCategory(category.key)">
        </nx-checkbox>
    }
</div>`;

  dynamicTs = `categories: Category[] = [
    { key: 'books', label: 'Books' },
    { key: 'movies', label: 'Movies' },
    { key: 'music', label: 'Music' },
    { key: 'games', label: 'Games' },
];

selectedCategories: string[] = ['books'];

toggleCategory(key: string): void {
    this.selectedCategories = this.selectedCategories.includes(key)
        ? this.selectedCategories.filter((c) => c !== key)
        : [...this.selectedCategories, key];
}`;

  filledCode = `<nx-checkbox label="Filled checkbox" variant="filled" [(checked)]="agreed">
</nx-checkbox>`;

  invalidCode = `<nx-checkbox label="This field is required" [invalid]="true">
</nx-checkbox>`;

  toggleCategory(key: string): void {
    this.selectedCategories = this.selectedCategories.includes(key)
      ? this.selectedCategories.filter((c) => c !== key)
      : [...this.selectedCategories, key];
  }

  setDynamicLayout(layout: 'inline' | 'block'): void {
    this.dynamicLayout = layout;
  }
}
