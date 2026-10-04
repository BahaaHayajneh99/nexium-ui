import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPageHeader } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-page-header-demo',
  imports: [NxPageHeader, DemoSection],
  templateUrl: './ui-page-header-demo.html',
  styleUrl: './ui-page-header-demo.scss',
})
export class UiPageHeaderDemo {
  importCode = `import { NxPageHeader } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-page-header title="Projects" description="Manage every project in your workspace."></nx-page-header>`;

  basicTs = `// title and description render the page-level text block.`;

  fullCode = `<nx-page-header title="Invoice #1042" description="Issued to Acme Corp on Mar 3, 2026.">
    <span nxPageHeaderBreadcrumb>Billing / Invoices / #1042</span>

    <div nxPageHeaderActions style="display:flex; gap:8px;">
        <button>Export</button>
        <button>Send reminder</button>
    </div>

    <div nxPageHeaderTabs style="display:flex; gap:16px;">
        <a>Details</a>
        <a>Activity</a>
        <a>Payments</a>
    </div>
</nx-page-header>`;

  fullTs = `// nxPageHeaderBreadcrumb renders above the title, nxPageHeaderActions to
// the right of it, and nxPageHeaderTabs below it as a tab strip.`;
}
