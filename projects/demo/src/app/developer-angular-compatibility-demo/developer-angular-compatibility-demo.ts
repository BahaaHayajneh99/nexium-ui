import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-angular-compatibility-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-angular-compatibility-demo.html',
  styleUrls: ['./developer-angular-compatibility-demo.scss'],
})
export class DeveloperAngularCompatibilityDemo {
  commonService = inject(CommonService);

  // From the README's "Supported Angular versions" table: nexium-ui 0.2.0 and later supports
  // every Angular version from 16 through 21 (0.1.9 and earlier only supported Angular 21.2+).
  // There's no separate major-version lineage per Angular release - it's the same current
  // package across all of them.
  versionMatrix = [
    { version: '21.x', nexaUI: '0.2.0+', status: 'Recommended', notes: 'Latest Angular release, full support' },
    { version: '20.x', nexaUI: '0.2.0+', status: 'Supported', notes: 'Full support' },
    { version: '19.x', nexaUI: '0.2.0+', status: 'Supported', notes: 'Full support' },
    { version: '18.x', nexaUI: '0.2.0+', status: 'Supported', notes: 'Full support' },
    { version: '17.x', nexaUI: '0.2.0+', status: 'Supported', notes: 'Full support' },
    { version: '16.x', nexaUI: '0.2.0+', status: 'Supported', notes: 'Full support' },
  ];

  nodeVersions = [
    { angular: '21.x', node: '18.19.x || 20.x || 22.x', npm: '10.x || 11.x', recommended: '20.11.0+' },
    { angular: '20.x', node: '18.19.x || 20.x', npm: '10.x', recommended: '20.11.0+' },
    { angular: '19.x', node: '18.19.x || 20.x', npm: '9.x || 10.x', recommended: '18.19.0+' },
  ];

  features = [
    {
      name: 'Standalone Components',
      description: 'All components are standalone, no module imports needed',
      support: 'Angular 14+',
    },
    {
      name: 'Signals',
      description: 'Compatible with Angular Signals for reactive state management',
      support: 'Angular 16+',
    },
    {
      name: 'Control Flow Syntax',
      description: 'Supports @if, @for, @switch, and other control flow blocks',
      support: 'Angular 17+',
    },
    {
      name: 'Zoneless Change Detection',
      description: 'Fully compatible with zoneless change detection strategy',
      support: 'Angular 18+',
    },
    {
      name: 'TypeScript Strict Mode',
      description: 'All components fully typed for strict TypeScript compilation',
      support: 'All versions',
    },
  ];

  migrationPaths = [
    {
      from: 'Angular 18.x',
      to: 'Angular 21.x',
      steps: [
        'Update Angular CLI and dependencies',
        'Update nexium-ui to the latest version',
        'Review deprecated Angular features',
        'Update component imports if necessary',
        'Test application thoroughly',
      ],
    },
  ];
}
