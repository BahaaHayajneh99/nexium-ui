import { Component } from '@angular/core';
import { NxVersionBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-version-badge-demo',
  imports: [NxVersionBadge, DemoSection],
  templateUrl: './ui-version-badge-demo.html',
  styleUrl: './ui-version-badge-demo.scss',
})
export class UiVersionBadgeDemo {
  importCode = `import { NxVersionBadge } from 'nexium-ui';`;

  variantsCode = `<nx-version-badge version="v2.4.0"></nx-version-badge>
<nx-version-badge version="v3.0.0" label="New" variant="new"></nx-version-badge>
<nx-version-badge version="v3.1.0-rc.1" label="Beta" variant="beta"></nx-version-badge>
<nx-version-badge version="v1.0.0" label="Deprecated" variant="deprecated"></nx-version-badge>`;

  variantsTs = `// variant accepts 'default' | 'new' | 'beta' | 'deprecated'.
// label is optional - a small uppercase tag shown before the version string.`;

  contextCode = `<div class="feature-row">
    <span>Bulk export</span>
    <nx-version-badge version="v4.2.0" label="New" variant="new"></nx-version-badge>
</div>
<div class="feature-row">
    <span>Realtime collaboration</span>
    <nx-version-badge version="v4.3.0-beta" label="Beta" variant="beta"></nx-version-badge>
</div>
<div class="feature-row">
    <span>Legacy CSV import</span>
    <nx-version-badge version="v1.0.0" label="Deprecated" variant="deprecated"></nx-version-badge>
</div>`;

  contextTs = `// A common spot for nx-version-badge - next to a feature name in a
// changelog or settings page, flagging when it shipped or its maturity.`;
}
