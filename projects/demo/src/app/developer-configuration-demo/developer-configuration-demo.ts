import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-configuration-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-configuration-demo.html',
  styleUrls: ['./developer-configuration-demo.scss'],
})
export class DeveloperConfigurationDemo {
  commonService = inject(CommonService);

  configurationOptions = [
    {
      section: 'Theme Configuration',
      description: 'Configure the visual theme of your application, including colors, typography, and spacing.',
      options: [
        { key: 'primaryColor', type: 'string', default: '#007bff', description: 'Primary brand color' },
        { key: 'darkMode', type: 'boolean', default: 'false', description: 'Enable dark theme' },
        { key: 'borderRadius', type: 'string', default: '4px', description: 'Global border radius' },
        { key: 'fontFamily', type: 'string', default: 'system-ui', description: 'Primary font family' },
      ],
    },
    {
      section: 'Component Defaults',
      description: 'Set default properties for components to maintain consistency across the application.',
      options: [
        { key: 'buttonSize', type: 'string', default: 'md', description: 'Default button size' },
        { key: 'inputSize', type: 'string', default: 'md', description: 'Default input size' },
        { key: 'toastPosition', type: 'string', default: 'top-right', description: 'Default toast position' },
        { key: 'modalAnimated', type: 'boolean', default: 'true', description: 'Enable modal animations' },
      ],
    },
    {
      section: 'Internationalization',
      description:' Configure locale, date/time formats, and currency settings for global applications.',
      options: [
        { key: 'locale', type: 'string', default: 'en-US', description: 'Application locale' },
        { key: 'dateFormat', type: 'string', default: 'MM/DD/YYYY', description: 'Date display format' },
        { key: 'timeFormat', type: 'string', default: '12h', description: 'Time display format (12h/24h)' },
        { key: 'currency', type: 'string', default: 'USD', description: 'Currency code' },
      ],
    },
  ];

  setupSteps = [
    'Import NexaUI provider in your app.config.ts',
    'Configure theme CSS variables in global styles',
    'Set up localization/i18n if needed',
    'Configure component defaults in provider options',
    'Import component library styles in angular.json',
  ];

  environmentConfigs = [
    {
      env: 'Development',
      debug: true,
      animations: true,
      logging: 'verbose',
    },
    {
      env: 'Production',
      debug: false,
      animations: true,
      logging: 'errors only',
    },
  ];

  exampleConfigCode = `import { provideNexaUI } from '@nexaui/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNexaUI({
      theme: 'light',
      primaryColor: '#007bff',
      borderRadius: '4px',
      animations: true
    })
  ]
};`;
}
