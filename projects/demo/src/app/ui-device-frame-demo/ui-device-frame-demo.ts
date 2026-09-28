import { Component } from '@angular/core';
import { NxDeviceFrame } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-device-frame-demo',
  imports: [NxDeviceFrame, DemoSection],
  templateUrl: './ui-device-frame-demo.html',
  styleUrl: './ui-device-frame-demo.scss',
})
export class UiDeviceFrameDemo {
  importCode = `import { NxDeviceFrame } from 'nexium-ui';`;

  phoneCode = `<nx-device-frame kind="phone">
    <div class="screen">Phone screen content</div>
</nx-device-frame>`;

  tabletCode = `<nx-device-frame kind="tablet">
    <div class="screen">Tablet screen content</div>
</nx-device-frame>`;

  browserCode = `<nx-device-frame kind="browser" url="https://nexium-ui.dev">
    <div class="screen">Browser page content</div>
</nx-device-frame>`;

  browserTs = `// url is only shown for kind="browser" - it's rendered in the fake address bar.`;

  sideBySideCode = `<nx-device-frame kind="phone">
    <div>Phone</div>
</nx-device-frame>
<nx-device-frame kind="tablet">
    <div>Tablet</div>
</nx-device-frame>
<nx-device-frame kind="browser" url="https://nexium-ui.dev">
    <div>Browser</div>
</nx-device-frame>`;
}
