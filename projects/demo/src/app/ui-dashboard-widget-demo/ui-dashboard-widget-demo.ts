import { Component } from '@angular/core';
import { NxDashboardWidget } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-dashboard-widget-demo',
  imports: [NxDashboardWidget, DemoSection],
  templateUrl: './ui-dashboard-widget-demo.html',
  styleUrl: './ui-dashboard-widget-demo.scss',
})
export class UiDashboardWidgetDemo {
  importCode = `import { NxDashboardWidget } from 'nexium-ui';`;

  basicCode = `<nx-dashboard-widget title="Recent Orders">
    <button nxDashboardWidgetActions>Refresh</button>
    <p>142 orders in the last 24 hours.</p>
</nx-dashboard-widget>`;

  basicTs = `// title fills the header bar; content marked with the nxDashboardWidgetActions attribute projects into the header's actions slot, everything else projects into the default body slot.`;

  statesCode = `<nx-dashboard-widget title="Revenue">
    <p>$48,290 this month, up 12.4%.</p>
</nx-dashboard-widget>

<nx-dashboard-widget title="Revenue" [loading]="true"></nx-dashboard-widget>

<nx-dashboard-widget title="Revenue" error="Failed to load revenue data."></nx-dashboard-widget>`;

  statesTs = `// loading (checked first) shows an nx-spinner in place of the content; error (checked next) shows the message instead; otherwise the projected content renders.`;
}
