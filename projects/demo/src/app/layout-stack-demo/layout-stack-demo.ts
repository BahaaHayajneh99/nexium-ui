import { Component } from '@angular/core';
import { UiStack } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-stack-demo',
  imports: [UiStack, DemoSection],
  templateUrl: './layout-stack-demo.html',
})
export class LayoutStackDemo {
  verticalCode = `<nx-stack [gap]="12">
    <div>First</div>
    <div>Second</div>
    <div>Third</div>
</nx-stack>`;

  horizontalCode = `<nx-stack direction="horizontal" [gap]="12" align="center">
    <div>First</div>
    <div>Second</div>
    <div>Third</div>
</nx-stack>`;
}
