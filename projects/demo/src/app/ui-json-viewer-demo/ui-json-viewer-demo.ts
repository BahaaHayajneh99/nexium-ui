import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { NxJsonViewer, NxTextarea } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-json-viewer-demo',
  imports: [NxJsonViewer, NxTextarea, FormsModule, DemoSection],
  templateUrl: './ui-json-viewer-demo.html',
  styleUrl: './ui-json-viewer-demo.scss',
})
export class UiJsonViewerDemo {
  importCode = `import { NxJsonViewer } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  tryItCode = `<nx-textarea [(ngModel)]="jsonInput" [rows]="10"></nx-textarea>
<nx-json-viewer [value]="parsedJson"></nx-json-viewer>`;

  tryItTs = `jsonInput = '{ "hello": "world" }';

get parsedJson(): unknown {
  try {
    return JSON.parse(this.jsonInput);
  } catch {
    return null;
  }
}`;

  jsonInput = `{
  "id": 7,
  "title": "Paste your own JSON here",
  "tags": ["try", "it", "yourself"],
  "meta": {
    "author": "You",
    "published": true
  }
}`;

  get parsedJson(): unknown {
    try {
      return JSON.parse(this.jsonInput);
    } catch {
      return null;
    }
  }

  get jsonParseError(): string | null {
    try {
      JSON.parse(this.jsonInput);
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : 'Invalid JSON';
    }
  }

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
