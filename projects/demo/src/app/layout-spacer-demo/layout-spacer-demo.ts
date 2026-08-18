import { Component } from '@angular/core';
import { UiFlex, UiSpacer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-spacer-demo',
  imports: [UiFlex, UiSpacer, DemoSection],
  templateUrl: './layout-spacer-demo.html',
})
export class LayoutSpacerDemo {
  growCode = `<nx-flex align="center">
    <div>Logo</div>
    <nx-spacer></nx-spacer>
    <div>Sign In</div>
</nx-flex>`;

  fixedCode = `<nx-flex align="center">
    <div>Icon</div>
    <nx-spacer [size]="24"></nx-spacer>
    <div>Label</div>
</nx-flex>`;
}
