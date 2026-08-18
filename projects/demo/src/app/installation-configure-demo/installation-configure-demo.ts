import { Component } from '@angular/core';

@Component({
  selector: 'app-installation-configure-demo',
  templateUrl: './installation-configure-demo.html',
})
export class InstallationConfigureDemo {
  tsconfigCode = `{
  "compilerOptions": {
    "paths": {
      "components": ["./node_modules/@nexium/components"],
      "core": ["./node_modules/@nexium/core"]
    }
  }
}`;

  monorepoTsconfigCode = `{
  "compilerOptions": {
    "paths": {
      "components": ["./dist/components"],
      "core": ["./dist/core"]
    }
  }
}`;
}
