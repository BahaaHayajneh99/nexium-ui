import { Component, inject } from '@angular/core';
import { NxPermissionGate, NxPermissionChecker, NxPermissionValue, NxButton, NxCheckbox, NxBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

enum Role {
  Admin = 1,
  Account = 2,
  Employee = 3,
}

class DemoPermissionChecker extends NxPermissionChecker {
  currentRole: Role = Role.Employee;
  grantedCodes = new Set<string>(['VW_AUDT']);

  override hasPermission(permissions: NxPermissionValue | NxPermissionValue[]): boolean {
    const required = Array.isArray(permissions) ? permissions : [permissions];
    return required.some((p) => (typeof p === 'number' ? p === this.currentRole : this.grantedCodes.has(p)));
  }

  toggleCode(code: string, on: boolean): void {
    if (on) {
      this.grantedCodes.add(code);
    } else {
      this.grantedCodes.delete(code);
    }
  }
}

@Component({
  selector: 'app-directive-permission-gate-demo',
  imports: [NxPermissionGate, NxButton, NxCheckbox, NxBadge, DemoSection],
  templateUrl: './directive-permission-gate-demo.html',
  providers: [{ provide: NxPermissionChecker, useClass: DemoPermissionChecker }],
})
export class DirectivePermissionGateDemo {
  private checker = inject(NxPermissionChecker) as DemoPermissionChecker;

  readonly Role = Role;
  roles = [
    { label: 'Admin', value: Role.Admin },
    { label: 'Account', value: Role.Account },
    { label: 'Employee', value: Role.Employee },
  ];

  importCode = `import { NxPermissionGate, NxPermissionChecker } from 'nexium-ui';`;

  canViewAudit = true;

  basicCode = `<nx-permission-gate [permission]="'VW_AUDT'">
    <nx-button variant="secondary">View audit log</nx-button>
    <span nxPermissionGateFallback>
        <nx-badge variant="secondary">Locked - ask an admin for access</nx-badge>
    </span>
</nx-permission-gate>`;

  basicTs = `// Same NxPermissionChecker contract as *nxHasPermission, but as a component
// so it can show an explicit fallback slot instead of just removing the content.
canViewAudit = true;`;

  roleCode = `<nx-permission-gate [permission]="Role.Admin">
    <nx-button variant="danger">Delete workspace</nx-button>
    <span nxPermissionGateFallback>
        <nx-badge variant="secondary">Admins only</nx-badge>
    </span>
</nx-permission-gate>`;

  roleTs = `// permission also accepts a numeric role/code, or a mixed array of
// roles and string keys - granted if any one of them matches.`;

  get currentRole(): Role {
    return this.checker.currentRole;
  }

  setRole(role: Role): void {
    this.checker.currentRole = role;
  }

  onViewAuditChange(checked: boolean): void {
    this.canViewAudit = checked;
    this.checker.toggleCode('VW_AUDT', checked);
  }
}
