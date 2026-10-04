import { Component } from '@angular/core';
import { NxFeatureFlag, NxButton, NxBadge, NxCheckbox } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-directive-feature-flag-demo',
  imports: [NxFeatureFlag, NxButton, NxBadge, NxCheckbox, DemoSection],
  templateUrl: './directive-feature-flag-demo.html',
  styleUrl: './directive-feature-flag-demo.scss',
})
export class DirectiveFeatureFlagDemo {
  importCode = `import { NxFeatureFlag } from 'nexium-ui';`;

  bulkExportEnabled = true;

  basicCode = `<nx-feature-flag [enabled]="bulkExportEnabled">
    <nx-button variant="primary">Bulk export</nx-button>
</nx-feature-flag>`;

  basicTs = `// Shows its projected content only when enabled is true - otherwise renders
// nothing, like a named, reusable *ngIf.
bulkExportEnabled = true;`;

  darkModeEnabled = false;

  fallbackCode = `<nx-feature-flag [enabled]="darkModeEnabled">
    <nx-badge variant="success">Dark mode is live</nx-badge>
    <span nxFeatureFlagFallback>
        <nx-badge variant="secondary">Dark mode coming soon</nx-badge>
    </span>
</nx-feature-flag>`;

  fallbackTs = `// Anything projected with the [nxFeatureFlagFallback] attribute shows instead
// when enabled is false - like an else branch, but reusable as a component.
darkModeEnabled = false;`;

  toggleDarkMode(checked: boolean): void {
    this.darkModeEnabled = checked;
  }
}
