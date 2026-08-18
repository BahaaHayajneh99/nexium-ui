import { Component } from '@angular/core';
import { UiContainer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-container-demo',
  imports: [UiContainer, DemoSection],
  templateUrl: './layout-container-demo.html',
})
export class LayoutContainerDemo {
  basicCode = `<nx-container maxWidth="md">
    <div>Centered content, max-width 768px</div>
</nx-container>`;
}
