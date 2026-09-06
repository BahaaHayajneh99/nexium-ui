import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-customization-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-customization-demo.html',
  styleUrls: ['./developer-customization-demo.scss'],
})
export class DeveloperCustomizationDemo {
  commonService = inject(CommonService);

  customizationLevels = [
    {
      level: 'Theme Level',
      description: 'Customize global theme colors, spacing, and typography',
      methods: ['CSS Variables', 'SCSS Variables', 'CSS Overrides'],
      difficulty: 'Easy',
      scope: 'Application-wide',
    },
    {
      level: 'Component Level',
      description: 'Customize individual component appearance and behavior',
      methods: ['Input Properties', 'CSS Classes', 'Template Projection'],
      difficulty: 'Medium',
      scope: 'Specific components',
    },
    {
      level: 'Advanced Level',
      description: 'Extend components with custom functionality',
      methods: ['Component Extension', 'Custom Directives', 'Service Injection'],
      difficulty: 'Hard',
      scope: 'Advanced use cases',
    },
  ];

  customizationPatterns = [
    {
      name: 'CSS Variable Override',
      description: 'Override theme variables for custom branding',
      use: 'Quick theming changes without rebuilding',
    },
    {
      name: 'Component Props Binding',
      description: 'Use component @Input properties for dynamic configuration',
      use: 'Data-driven component behavior',
    },
    {
      name: 'Slot/Content Projection',
      description: 'Use <ng-content> for flexible component composition',
      use: 'Custom templates and layouts',
    },
    {
      name: 'Directive Extension',
      description: 'Create custom directives for cross-cutting concerns',
      use: 'Reusable behavior across components',
    },
    {
      name: 'Service Customization',
      description: 'Inject custom services to modify component behavior',
      use: 'Business logic integration',
    },
  ];

  extensionGuides = [
    'Extending component base classes for shared functionality',
    'Creating custom themes with SCSS mixins',
    'Building custom component wrappers',
    'Implementing custom form controls',
    'Creating directive-based component enhancements',
  ];

  bestPractices = [
    {
      title: 'Follow library conventions',
      description: 'Adhere to the design and coding standards of the library to ensure consistency and maintainability',
    },
    {
      title: 'Prefer composition over inheritance for component extension',
      description: 'Use composition to create flexible and maintainable component extensions',
    },
    {
      title: 'Use CSS variables for theme customization',
      description: 'Leverage CSS variables for easy and consistent theme modifications',
    },
    {
      title: 'Keep custom styles scoped to avoid global conflicts',
      description: 'Isolate custom styles to prevent unintended side effects on other components',
    },
    {
      title: 'Document custom component props and behavior',
      description: 'Provide clear documentation for custom component properties and functionality',
    },
    {
      title: 'Test customizations across different browsers',
      description: 'Ensure customizations work as expected across various browser environments',
    },
    {
      title: 'Maintain backward compatibility with library updates',
      description: 'Plan customizations to minimize disruption during library upgrades',
    },
  ];
}
