import { Component } from '@angular/core';
import { UiDivider, UiStack } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-divider-demo',
  imports: [UiDivider, UiStack, DemoSection],
  templateUrl: './layout-divider-demo.html',
})
export class LayoutDividerDemo {
  horizontalCode = `<div>Section one</div>
<nx-divider></nx-divider>
<div>Section two</div>`;

  labeledCode = `<nx-divider label="OR"></nx-divider>`;

  verticalCode = `<nx-stack direction="horizontal" [gap]="12" align="stretch">
    <div>Left</div>
    <nx-divider orientation="vertical"></nx-divider>
    <div>Right</div>
</nx-stack>`;
}
