import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-troubleshooting-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-troubleshooting-demo.html',
  styleUrls: ['./developer-troubleshooting-demo.scss'],
})
export class DeveloperTroubleshootingDemo {
  commonService = inject(CommonService);

  commonIssues = [
    {
      problem: 'Styles not applying',
      causes: [
        'Global styles not imported in angular.json',
        'Component styles scoped incorrectly',
        'CSS specificity conflict with other libraries',
        'Missing CSS custom property definitions',
      ],
      solutions: [
        'Verify global styles import in angular.json',
        'Check component styleUrls configuration',
        'Use higher specificity or !important (sparingly)',
        'Define CSS variables in :root or body',
      ],
    },
    {
      problem: 'Component not rendering',
      causes: [
        'Component not imported in module/standalone imports',
        'Selector mismatch',
        'Component not in routes',
        'Missing required @Input properties',
      ],
      solutions: [
        'Add component to imports array',
        'Verify selector matches template element',
        'Add route configuration',
        'Provide required input values',
      ],
    },
    {
      problem: 'Events not firing',
      causes: [
        'Event not properly bound with (eventName)',
        'Handler method not defined',
        'Event emitter not triggered',
        'stopPropagation() called',
      ],
      solutions: [
        'Check binding syntax in template',
        'Verify method exists in component',
        'Debug with console.log in event handler',
        'Remove event.stopPropagation() if not needed',
      ],
    },
    {
      problem: 'Type errors with strict mode',
      causes: [
        'Missing type declarations',
        'Incorrect input binding types',
        'Any type used instead of proper types',
        'null/undefined not handled',
      ],
      solutions: [
        'Import component types from library',
        'Use correct type for input properties',
        'Enable strict mode in tsconfig.json',
        'Use type guards for null/undefined checks',
      ],
    },
    {
      problem: 'Performance issues',
      causes: [
        'Change detection running too often',
        'Large lists without virtual scrolling',
        'Excessive re-renders',
        'Memory leaks from subscriptions',
      ],
      solutions: [
        'Use OnPush change detection strategy',
        'Implement virtual scrolling for large lists',
        'Use trackBy in *ngFor',
        'Unsubscribe from observables in ngOnDestroy',
      ],
    },
  ];

  debuggingTips = [
    'Use browser DevTools to inspect element styles',
    'Check console for TypeScript/Angular errors',
    'Use ng version to verify Angular version',
    'Verify package.json has correct NexaUI version',
    'Clear node_modules and reinstall if issues persist',
    'Check for conflicting CSS frameworks',
    'Use Angular DevTools extension for component debugging',
  ];

  versionIssues = [
    {
      issue: 'Version mismatch between Angular and NexaUI',
      resolution: 'Update to compatible versions - see Angular Compatibility section',
    },
    {
      issue: 'Breaking changes after library update',
      resolution: 'Check changelog and migration guide for version',
    },
    {
      issue: 'Peer dependency conflicts',
      resolution: 'Use npm ls to find conflicts, update conflicting packages',
    },
  ];

  resources = [
    { name: 'Official Documentation', url: 'https://nexaui.dev/docs' },
    { name: 'API Reference', url: 'https://nexaui.dev/api' },
    { name: 'GitHub Issues', url: 'https://github.com/nexaui/nexaui/issues' },
    { name: 'Community Discord', url: 'https://discord.gg/nexaui' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com/questions/tagged/nexaui' },
  ];
}
