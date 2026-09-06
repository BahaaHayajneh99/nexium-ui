import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-typescript-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-typescript-demo.html',
  styleUrls: ['./developer-typescript-demo.scss'],
})
export class DeveloperTypescriptDemo {
  commonService = inject(CommonService);

  tsconfigExample = `{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "forceConsistentCasingInFileNames": true
  }
}`;

  typescriptFeatures = [
    {
      feature: 'Strict Type Checking',
      description: 'All components use strict TypeScript for type safety',
      benefit: 'Catch errors at compile time, better IDE support',
    },
    {
      feature: 'Generics Support',
      description: 'Many components support TypeScript generics for type-safe data',
      benefit: 'Full type safety for data-bound components',
    },
    {
      feature: 'Utility Types',
      description: 'Exported utility types for advanced use cases',
      benefit: 'Extend and customize component behavior with type safety',
    },
    {
      feature: 'Discriminated Unions',
      description: 'Component props use discriminated unions for variant safety',
      benefit: 'Type-safe variant selection, no invalid combinations',
    },
  ];

  typeExamples = [
    {
      name: 'ButtonVariant',
      type: "'primary' | 'secondary' | 'danger' | 'success'",
      usage: 'Ensures only valid button variants can be used',
    },
    {
      name: 'ComponentSize',
      type: "'sm' | 'md' | 'lg' | 'xl'",
      usage: 'Standardized sizing across all components',
    },
    {
      name: 'SelectOption<T>',
      type: '{ value: T; label: string; disabled?: boolean }',
      usage: 'Generic type for select/dropdown options',
    },
    {
      name: 'TableColumn<T>',
      type: '{ key: keyof T; header: string; sortable?: boolean }',
      usage: 'Type-safe table column configuration',
    },
  ];

  bestPractices = [
    {
      title:'Enable Strict Mode',
      description: 'Always enable TypeScript strict mode for maximum type safety',
    },
    {
      title:'Use Exported Types',
      description: 'Use component types exported from NexaUI for consistency',
    },
    {
      title:'Leverage IDE Support',
      description: 'Leverage IDE autocomplete for component props and events',
    },
    {
      title:'Use Generics',
      description: 'Use generics when working with data-bound components',
    },
    {
      title:'Export Component Interfaces',
      description: 'Export component interfaces for prop typing in parent components',
    },
    {
      title:'Avoid Any Type',
      description: 'Avoid any type - use proper TypeScript interfaces instead',
    },
    {
      title:'Use Discriminated Unions',
      description: 'Use discriminated unions for variant-based component styling',
    },
  ];

  commonPatterns = [
    'Type-safe form binding with ngModel and reactive forms',
    'Generic list/table components for any data type',
    'Event emitter typing for parent-child communication',
    'Dependency injection with typed service providers',
  ];
}
