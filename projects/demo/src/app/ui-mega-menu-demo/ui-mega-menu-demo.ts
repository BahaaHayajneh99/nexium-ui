import { Component } from '@angular/core';
import { NxMegaMenu } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-mega-menu-demo',
  imports: [NxMegaMenu, DemoSection],
  templateUrl: './ui-mega-menu-demo.html',
  styleUrl: './ui-mega-menu-demo.scss',
})
export class UiMegaMenuDemo {
  importCode = `import { NxMegaMenu } from 'nexium-ui';`;

  basicCode = `<nx-mega-menu label="Products">
    <div class="mega-menu-columns">
        <div>
            <h4>Data Display</h4>
            <a href="#">Table</a>
            <a href="#">Chart</a>
        </div>
        <div>
            <h4>Forms</h4>
            <a href="#">Input</a>
            <a href="#">Rating</a>
        </div>
        <div>
            <h4>Overlay</h4>
            <a href="#">Drawer</a>
            <a href="#">Command Palette</a>
        </div>
    </div>
</nx-mega-menu>`;
}
