import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-testing-unit-testing-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './testing-unit-testing-demo.html',
  styleUrls: ['./testing-unit-testing-demo.scss'],
})
export class TestingUnitTestingDemo {
  commonService = inject(CommonService);

  frameworks = [
    {
      name: 'Jasmine',
      description: 'BDD testing framework with clear, readable syntax',
      setup: 'npm install --save-dev jasmine',
      features: ['Suites & Specs', 'Matchers', 'Spies & Mocks', 'Async Testing'],
      example: 'describe("MyComponent", () => { it("should create", () => { expect(component).toBeTruthy(); }); });',
      pros: ['Excellent spy/mock support', 'Clear syntax', 'Great async handling'],
      cons: ['Slower than modern alternatives', 'Less built-in utilities']
    },
    {
      name: 'Jest',
      description: 'Zero-config testing platform with snapshot testing',
      setup: 'npm install --save-dev jest',
      features: ['Snapshots', 'Coverage', 'Parallel Execution', 'Watch Mode'],
      example: 'test("should render correctly", () => { expect(component).toMatchSnapshot(); });',
      pros: ['Fast execution', 'Snapshot testing', 'Built-in coverage', 'Zero config'],
      cons: ['Less common in Angular', 'Different API from Jasmine']
    },
    {
      name: 'Vitest',
      description: 'Unit testing framework powered by Vite',
      setup: 'npm install --save-dev vitest',
      features: ['Vite-powered', 'ESM First', 'Instant Watch', 'TypeScript'],
      example: 'it("should execute", () => { expect(sum(1, 2)).toBe(3); });',
      pros: ['Lightning fast', 'Vite integration', 'Modern API', 'Great DX'],
      cons: ['Newer ecosystem', 'Smaller community']
    }
  ];

  testPatterns = [
    {
      name: 'Unit Testing Pattern',
      purpose: 'Test individual functions, methods, and utilities in isolation',
      components: [
        'Test single units of code',
        'Mock external dependencies',
        'Use arrange-act-assert pattern',
        'Keep tests focused and fast',
        'Aim for >80% code coverage'
      ],
      example: 'Test utility functions: calculateTotal(), formatDate(), validateEmail()',
      tools: ['Jasmine', 'Jest', 'Vitest']
    },
    {
      name: 'Integration Testing Pattern',
      purpose: 'Test how multiple units work together',
      components: [
        'Test component + service interaction',
        'Use real or partially mocked dependencies',
        'Test data flow between components',
        'Verify state management',
        'Test error handling across layers'
      ],
      example: 'Test form component with validation service and HTTP calls',
      tools: ['Jasmine', 'Jest', 'Vitest']
    },
    {
      name: 'Edge Case Testing Pattern',
      purpose: 'Catch boundary conditions and error states',
      components: [
        'Test null/undefined inputs',
        'Test empty arrays/objects',
        'Test maximum/minimum values',
        'Test invalid data types',
        'Test concurrent operations'
      ],
      example: 'Test array sorting with empty array, single item, null values',
      tools: ['All frameworks']
    }
  ];

  bestPractices = [
    {
      title: 'Write tests before or alongside code (TDD mindset)',
      description: 'Develop tests in parallel with the implementation to ensure comprehensive coverage'
    },
    {
      title: 'Use descriptive test names that explain what is being tested',
      description: 'Test names should clearly indicate the scenario and expected outcome'
    },
    {
      title: 'Follow AAA pattern: Arrange, Act, Assert',
      description: 'Structure tests with a clear separation of setup, execution, and verification steps'
    },
    {
      title: 'Keep tests isolated and independent of each other',
      description: 'Ensure each test can run independently without affecting others'
    },
    {
      title: 'Use factories for test data creation',
      description: 'Create reusable functions to generate test data consistently'
    },
    {
      title: 'Mock external dependencies (HTTP, database, services)',
      description: 'Isolate tests from external dependencies by using mocks or stubs'
    },
    {
      title: 'Avoid testing implementation details, focus on behavior',
      description: 'Test the public API and expected outcomes rather than internal implementation'
    },
    {
      title: 'Maintain test code quality same as production code',
      description: 'Apply the same coding standards and practices to test code'
    },
    {
      title: 'Run tests frequently during development',
      description: 'Execute tests regularly to catch issues early in the development cycle'
    },
    {
      title: 'Aim for meaningful coverage, not arbitrary percentages',
      description: 'Focus on testing important scenarios and edge cases rather than just achieving a coverage threshold'
    }
  ];

  commonMatchers = [
    { matcher: 'expect(value).toBe(expected)', description: 'Strict equality (===)' },
    { matcher: 'expect(value).toEqual(expected)', description: 'Deep equality' },
    { matcher: 'expect(value).toBeTruthy()', description: 'Truthy value' },
    { matcher: 'expect(value).toBeFalsy()', description: 'Falsy value' },
    { matcher: 'expect(array).toContain(item)', description: 'Array contains item' },
    { matcher: 'expect(spy).toHaveBeenCalled()', description: 'Function was called' },
    { matcher: 'expect(promise).toResolve()', description: 'Promise resolves' },
    { matcher: 'expect(() => fn()).toThrow()', description: 'Function throws error' },
    { matcher: 'expect(string).toMatch(/pattern/)', description: 'Matches regex' },
    { matcher: 'expect(value).not.toBe(other)', description: 'Negation support' }
  ];

  testStructure = [
    {
      phase: 'Setup (beforeEach/beforeAll)',
      description: 'Initialize test fixtures, mock services, setup DOM',
      code: 'beforeEach(() => { fixture = TestBed.createComponent(MyComponent); component = fixture.componentInstance; });'
    },
    {
      phase: 'Execution (it blocks)',
      description: 'Run the actual test with arrange-act-assert pattern',
      code: 'it("should display title", () => { fixture.detectChanges(); expect(element.textContent).toBe("Title"); });'
    },
    {
      phase: 'Cleanup (afterEach/afterAll)',
      description: 'Clean up resources, reset mocks, restore state',
      code: 'afterEach(() => { fixture.destroy(); });'
    },
    {
      phase: 'Assertion',
      description: 'Verify expected behavior using matchers',
      code: 'expect(component.value).toBe(10); expect(spy).toHaveBeenCalledWith(arg);'
    }
  ];

  coverageTargets = [
    { metric: 'Line Coverage', target: '80%', description: 'Percentage of lines executed' },
    { metric: 'Branch Coverage', target: '75%', description: 'Percentage of conditional paths' },
    { metric: 'Function Coverage', target: '80%', description: 'Percentage of functions called' },
    { metric: 'Statement Coverage', target: '80%', description: 'Percentage of statements executed' }
  ];
}
