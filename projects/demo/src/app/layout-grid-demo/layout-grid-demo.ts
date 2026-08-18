import { Component } from '@angular/core';
import { UiGrid, UiGridItem } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-grid-demo',
  imports: [UiGrid, UiGridItem, DemoSection],
  templateUrl: './layout-grid-demo.html',
})
export class LayoutGridDemo {
  basicCode = `<nx-grid [cols]="4" [gap]="16">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
</nx-grid>`;

  spanCode = `<nx-grid [cols]="4" [gap]="16">
    <nx-grid-item [colSpan]="2">Spans 2 columns</nx-grid-item>
    <nx-grid-item>1</nx-grid-item>
    <nx-grid-item>1</nx-grid-item>
</nx-grid>`;
}
