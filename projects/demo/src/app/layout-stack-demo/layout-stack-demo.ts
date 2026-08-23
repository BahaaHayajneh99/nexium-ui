import { Component } from '@angular/core';
import { NxStack } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-stack-demo',
  imports: [NxStack, DemoSection],
  templateUrl: './layout-stack-demo.html',
})
export class LayoutStackDemo {
  importCode = `import { NxStack } from 'nexium-ui';`;

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
