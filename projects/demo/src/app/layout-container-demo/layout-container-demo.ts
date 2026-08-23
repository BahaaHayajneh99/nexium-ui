import { Component } from '@angular/core';
import { NxContainer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-layout-container-demo',
  imports: [NxContainer, DemoSection],
  templateUrl: './layout-container-demo.html',
})
export class LayoutContainerDemo {
  importCode = `import { NxContainer } from 'nexium-ui';`;

  basicCode = `<nx-container maxWidth="md">
    <div>Centered content, max-width 768px</div>
</nx-container>`;
}
