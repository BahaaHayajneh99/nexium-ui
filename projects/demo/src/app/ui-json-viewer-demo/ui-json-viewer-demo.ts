import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxJsonViewer } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-json-viewer-demo',
  imports: [NxJsonViewer, DemoSection],
  templateUrl: './ui-json-viewer-demo.html',
  styleUrl: './ui-json-viewer-demo.scss',
})
export class UiJsonViewerDemo {
  importCode = `import { NxJsonViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  basicCode = `<nx-json-viewer [value]="user"></nx-json-viewer>`;

  basicTs = `user = {
  id: 42,
  name: 'Ada Lovelace',
  active: true,
  roles: ['admin', 'editor'],
  profile: {
    email: 'ada@example.com',
    verified: true,
    lastLogin: null,
  },
};`;

  user = {
    id: 42,
    name: 'Ada Lovelace',
    active: true,
    roles: ['admin', 'editor'],
    profile: {
      email: 'ada@example.com',
      verified: true,
      lastLogin: null,
    },
  };

  responseCode = `<nx-json-viewer [value]="apiResponse"></nx-json-viewer>`;

  responseTs = `// Rows are flattened from the value, so any depth "just works" -
// collapse a row by clicking it to hide its children.
apiResponse = {
  status: 200,
  data: {
    items: [
      { id: 1, title: 'First post' },
      { id: 2, title: 'Second post' },
    ],
    pagination: { page: 1, perPage: 10, total: 2 },
  },
};`;

  apiResponse = {
    status: 200,
    data: {
      items: [
        { id: 1, title: 'First post' },
        { id: 2, title: 'Second post' },
      ],
      pagination: { page: 1, perPage: 10, total: 2 },
    },
  };
}
