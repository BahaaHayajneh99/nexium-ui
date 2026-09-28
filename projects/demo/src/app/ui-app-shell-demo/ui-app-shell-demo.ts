import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxAppShell } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-app-shell-demo',
  imports: [NxAppShell, DemoSection],
  templateUrl: './ui-app-shell-demo.html',
  styleUrl: './ui-app-shell-demo.scss',
})
export class UiAppShellDemo {
  importCode = `import { NxAppShell } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-app-shell>
    <div nxAppShellHeader>Header</div>
    <div nxAppShellSidebar>Sidebar</div>
    <div nxAppShellFooter>Footer &copy; 2026</div>

    <h2>Page content</h2>
    <p>Everything not assigned to a named slot lands in the default content area.</p>
</nx-app-shell>`;

  basicTs = `// Regions are composed via named content-projection slots:
// [nxAppShellHeader], [nxAppShellSidebar], [nxAppShellFooter], plus a
// default slot for the main content.`;

  toggleCode = `<nx-app-shell #shell [(sidebarCollapsed)]="collapsed">
    <div nxAppShellHeader>
        <button (click)="shell.toggleSidebar()">Toggle sidebar</button>
    </div>
    <div nxAppShellSidebar>Nav links...</div>
    <p>Sidebar collapsed: {{ collapsed }}</p>
</nx-app-shell>`;

  toggleTs = `// sidebarCollapsed can be driven externally, or toggled from within
// projected content via a template reference variable calling toggleSidebar().
collapsed = false;`;

  collapsed = false;
}
