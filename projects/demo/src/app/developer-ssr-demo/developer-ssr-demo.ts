import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-ssr-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-ssr-demo.html',
  styleUrls: ['./developer-ssr-demo.scss'],
})
export class DeveloperSsrDemo {
  commonService = inject(CommonService);

  ssrFeatures = [
    {
      feature: 'Full SSR Support',
      description: 'All components are fully compatible with Angular Universal',
      benefits: ['Improved SEO', 'Faster initial load', 'Better social sharing'],
    },
    {
      feature: 'No DOM Dependencies',
      description: 'Components avoid direct DOM access for SSR compatibility',
      benefits: ['Works in Node.js environment', 'Predictable rendering', 'Better performance'],
    },
    {
      feature: 'State Serialization',
      description: 'Component state properly serializes for hydration',
      benefits: ['Smooth client-side hydration', 'No state loss', 'Correct component state on client'],
    },
    {
      feature: 'Platform Detection',
      description: 'Built-in platform detection for browser-specific features',
      benefits: ['No SSR runtime errors', 'Graceful degradation', 'Proper code splitting'],
    },
  ];

  setupSteps = [
    'Install Angular Universal: ng add @nguniversal/express-engine',
    'Configure NexaUI provider in server.ts',
    'Ensure all components use OnPush change detection',
    'Test SSR rendering with npm run serve:ssr',
    'Monitor hydration mismatches in console',
    'Deploy to Node.js server or serverless platform',
  ];

  commonIssues = [
    {
      issue: 'Hydration Mismatch',
      cause: 'Server and client render different content',
      solution: 'Use [attr.ngSkipHydration] for dynamic content',
    },
    {
      issue: 'Missing Window Object',
      cause: 'Code accesses window in component initialization',
      solution: 'Use isPlatformBrowser() check before window access',
    },
    {
      issue: 'Timezone Differences',
      cause: 'Server and client timezones differ',
      solution: 'Use consistent timezone for date operations',
    },
  ];

  compatibilityMatrix = [
    { component: 'UI Components', ssr: '✓ Full Support', sse: '✓ Compatible' },
    { component: 'Modal/Dialog', ssr: '✓ Supported', sse: '✓ Supported' },
    { component: 'Tooltips', ssr: '✓ SSR Safe', sse: '✓ Dynamic' },
    { component: 'Animations', ssr: '⚠ Limited', sse: '✓ Full' },
  ];

  performanceTips = [
    'Pre-render static pages at build time',
    'Use OnPush change detection strategy',
    'Lazy load non-critical components',
    'Minimize component initialization logic in SSR',
    'Cache rendered pages when possible',
    'Monitor server-side render times',
  ];
}
