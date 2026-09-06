import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-theming-api-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-theming-api-demo.html',
  styleUrls: ['./developer-theming-api-demo.scss'],
})
export class DeveloperThemingApiDemo {
  commonService = inject(CommonService);

  cssVariables = [
    { category: 'Colors', variables: ['--primary-color', '--secondary-color', '--text-primary', '--text-secondary', '--shell-border', '--background-color'] },
    { category: 'Spacing', variables: ['--spacing-xs', '--spacing-sm', '--spacing-md', '--spacing-lg', '--spacing-xl', '--spacing-2xl'] },
    { category: 'Typography', variables: ['--font-family', '--font-size-base', '--font-weight-normal', '--font-weight-bold', '--line-height'] },
    { category: 'Shadows', variables: ['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl'] },
    { category: 'Border Radius', variables: ['--radius-sm', '--radius-md', '--radius-lg', '--radius-full'] },
  ];

  themingApproaches = [
    {
      name: 'CSS Custom Properties',
      description: 'Override theme colors using CSS variables',
      use: 'For runtime theme switching and custom branding',
      example: '--primary-color: #ff6b6b;',
    },
    {
      name: 'SCSS Variables',
      description: 'Compile-time theme configuration with SCSS',
      use: 'For build-time theme optimization',
      example: '$primary-color: #ff6b6b;',
    },
    {
      name: 'Component Styling',
      description: 'Deep component customization with CSS overrides',
      use: 'For specific component styling adjustments',
      example: '::ng-deep .nx-button { /* custom styles */ }',
    },
  ];

  colorPalette = [
    { name: 'Primary', hex: '#007bff', rgb: '0, 123, 255' },
    { name: 'Secondary', hex: '#6c757d', rgb: '108, 117, 125' },
    { name: 'Success', hex: '#28a745', rgb: '40, 167, 69' },
    { name: 'Danger', hex: '#dc3545', rgb: '220, 53, 69' },
    { name: 'Warning', hex: '#ffc107', rgb: '255, 193, 7' },
    { name: 'Info', hex: '#17a2b8', rgb: '23, 162, 184' },
  ];

  darkModeFeatures = [
    'Automatic dark mode detection via prefers-color-scheme',
    'Manual dark mode toggle support',
    'Per-component dark mode overrides',
    'Smooth transitions between light and dark themes',
    'Accessible color contrast in both modes',
  ];

  themeCustomizationExample = `:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --text-primary: #000;
  --text-secondary: #666;
  --background-color: #fff;
  --shell-border: #e0e0e0;
}`;
}
