import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxPermissionMatrix, NxPermissionMatrixValue } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-permission-matrix-demo',
  imports: [NxPermissionMatrix, DemoSection],
  templateUrl: './ui-permission-matrix-demo.html',
  styleUrl: './ui-permission-matrix-demo.scss',
})
export class UiPermissionMatrixDemo {
  importCode = `import { NxPermissionMatrix } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  roles = ['Admin', 'Editor', 'Viewer'];
  permissions = ['Create', 'Read', 'Update', 'Delete', 'Publish'];

  value: NxPermissionMatrixValue = {
    Admin: { Create: true, Read: true, Update: true, Delete: true, Publish: true },
    Editor: { Create: true, Read: true, Update: true, Delete: false, Publish: false },
    Viewer: { Create: false, Read: true, Update: false, Delete: false, Publish: false },
  };

  basicCode = `<nx-permission-matrix
    [roles]="roles"
    [permissions]="permissions"
    [(value)]="value">
</nx-permission-matrix>`;

  basicTs = `roles = ['Admin', 'Editor', 'Viewer'];
permissions = ['Create', 'Read', 'Update', 'Delete', 'Publish'];

value: NxPermissionMatrixValue = {
  Admin: { Create: true, Read: true, Update: true, Delete: true, Publish: true },
  Editor: { Create: true, Read: true, Update: true, Delete: false, Publish: false },
  Viewer: { Create: false, Read: true, Update: false, Delete: false, Publish: false },
};`;
}
