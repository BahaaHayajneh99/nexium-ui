import { Component } from '@angular/core';
import { UiFlex } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-flex-demo',
  imports: [UiFlex, DemoSection],
  templateUrl: './layout-flex-demo.html',
})
export class LayoutFlexDemo {
  rowCode = `<nx-flex justify="between" align="center" [gap]="12">
    <div>Left</div>
    <div>Right</div>
</nx-flex>`;

  columnCode = `<nx-flex direction="column" [gap]="8">
    <div>First</div>
    <div>Second</div>
    <div>Third</div>
</nx-flex>`;
}
