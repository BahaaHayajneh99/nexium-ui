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

  versionMatrix = [
    { version: '21.x', nexaUI: '✓ Latest', status: 'Recommended', notes: 'Full support, all features' },
    { version: '20.x', nexaUI: '✓ v4.x', status: 'Supported', notes: 'Full support with latest library' },
    { version: '19.x', nexaUI: '✓ v3.x', status: 'Supported', notes: 'Full support, some features limited' },
    { version: '18.x', nexaUI: '✓ v2.x', status: 'Legacy', notes: 'Basic support, migration recommended' },
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
        'Update NexaUI to latest version',
        'Review deprecated Angular features',
        'Update component imports if necessary',
        'Test application thoroughly',
      ],
    },
  ];
}
