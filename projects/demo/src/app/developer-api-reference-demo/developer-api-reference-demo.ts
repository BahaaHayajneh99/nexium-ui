import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-developer-api-reference-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './developer-api-reference-demo.html',
  styleUrls: ['./developer-api-reference-demo.scss'],
})
export class DeveloperApiReferenceDemo {
  commonService = inject(CommonService);

  componentCategories = [
    { name: 'Feedback Components', count: 9, examples: ['Alert', 'Toast', 'Modal', 'Dialog', 'Popover'] },
    { name: 'Form Components', count: 22, examples: ['Input', 'Select', 'Checkbox', 'Radio', 'Switch'] },
    { name: 'Data Display Components', count: 18, examples: ['Table', 'List', 'Tree', 'Timeline', 'Avatar'] },
    { name: 'Layout Components', count: 9, examples: ['Grid', 'Flex', 'Stack', 'Container', 'Divider'] },
    { name: 'Navigation Components', count: 11, examples: ['Navbar', 'Sidebar', 'Breadcrumb', 'Pagination', 'Menu'] },
  ];

  apiStructure = [
    'Overview - High-level component purpose and use cases',
    'Examples - Interactive code examples and live demos',
    'API Reference - Props, methods, and events',
    'Inputs (@Input) - Component configuration properties',
    'Outputs (@Output) - Component event emitters',
    'Methods - Public component methods',
    'Events - Custom events emitted by component',
    'Accessibility - WCAG compliance and ARIA attributes',
    'Styling - CSS custom properties and selectors',
    'TypeScript Types - Component interfaces and types',
  ];

  componentApiExample = {
    name: 'NxButton',
    description: 'A versatile button component with multiple variants and states',
    inputs: [
      { name: 'variant', type: 'string', default: 'primary', description: 'Button style variant' },
      { name: 'size', type: 'string', default: 'md', description: 'Button size (sm, md, lg)' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable button interaction' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading state' },
    ],
    outputs: [
      { name: 'click', type: 'Event', description: 'Emitted when button is clicked' },
      { name: 'focus', type: 'Event', description: 'Emitted when button receives focus' },
      { name: 'blur', type: 'Event', description: 'Emitted when button loses focus' },
    ],
    methods: [
      { name: 'focus()', return: 'void', description: 'Focus the button element' },
      { name: 'blur()', return: 'void', description: 'Remove focus from button' },
      { name: 'click()', return: 'void', description: 'Programmatically trigger click' },
    ],
  };
}
