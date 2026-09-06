import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-testing-component-testing-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './testing-component-testing-demo.html',
  styleUrls: ['./testing-component-testing-demo.scss'],
})
export class TestingComponentTestingDemo {
  commonService = inject(CommonService);

  componentTestingApproaches = [
    {
      name: 'Shallow Testing',
      description: 'Test component in isolation, mock child components',
      benefits: ['Fast', 'Isolated', 'Clear responsibility', 'Easy to debug'],
      tradeoffs: ['May miss integration issues', 'Requires more mocks'],
      example: 'Test parent component without rendering child components'
    },
    {
      name: 'Deep Testing',
      description: 'Test component with real child components',
      benefits: ['Tests real integration', 'Catches actual issues', 'More realistic'],
      tradeoffs: ['Slower', 'More dependencies', 'Harder to debug'],
      example: 'Test parent component with all child components rendered'
    },
    {
      name: 'Hybrid Testing',
      description: 'Test component with selective mocking based on test needs',
      benefits: ['Best of both worlds', 'Flexible', 'Balanced coverage'],
      tradeoffs: ['More complex setup'],
      example: 'Test component with real service but mocked HTTP calls'
    }
  ];

  testbedSetupSteps = [
    {
      step: '1. Import TestBed',
      code: 'import { TestBed } from "@angular/core/testing";'
    },
    {
      step: '2. Configure Testing Module',
      code: 'TestBed.configureTestingModule({ declarations: [ MyComponent ], imports: [ CommonModule ] });'
    },
    {
      step: '3. Create Component Fixture',
      code: 'const fixture = TestBed.createComponent(MyComponent); const component = fixture.componentInstance;'
    },
    {
      step: '4. Detect Changes',
      code: 'fixture.detectChanges(); // Triggers initial CD cycle'
    },
    {
      step: '5. Query Elements',
      code: 'const element = fixture.debugElement.query(By.css(".selector"));'
    },
    {
      step: '6. Assert Results',
      code: 'expect(element.nativeElement.textContent).toContain("expected");'
    }
  ];

  commonTasks = [
    {
      task: 'Test Input Properties',
      description: 'Verify component responds to input changes',
      code: 'component.inputProperty = "value"; fixture.detectChanges(); expect(component.result).toBe("expected");'
    },
    {
      task: 'Test Output Events',
      description: 'Verify component emits events with correct data',
      code: 'spyOn(component.outputEvent, "emit"); component.triggerEvent(); expect(component.outputEvent.emit).toHaveBeenCalledWith(data);'
    },
    {
      task: 'Test User Interactions',
      description: 'Simulate clicks, input, focus events',
      code: 'element.click(); expect(component.isActive).toBe(true);'
    },
    {
      task: 'Test Lifecycle Hooks',
      description: 'Verify ngOnInit, ngOnDestroy behavior',
      code: 'expect(component.initialized).toBe(true); fixture.destroy(); expect(component.destroyed).toBe(true);'
    },
    {
      task: 'Test Two-Way Binding',
      description: 'Verify ngModel [(ngModel)] binding',
      code: 'component.value = "test"; fixture.detectChanges(); expect(inputElement.value).toBe("test");'
    },
    {
      task: 'Test Async Operations',
      description: 'Handle promises and observables in tests',
      code: 'await fixture.whenStable(); // Wait for async operations'
    }
  ];

  dependencyMockingStrategies = [
    {
      strategy: 'Mock Services',
      description: 'Replace real service with test double',
      example: 'const mockService = { getData: () => of([1, 2, 3]) }; TestBed.overrideProvider(MyService, { useValue: mockService });',
      usageScenario: 'When testing component that depends on HTTP/Database services'
    },
    {
      strategy: 'Spy on Services',
      description: 'Wrap real service and track calls',
      example: 'spyOn(service, "getData").and.returnValue(of(mockData));',
      usageScenario: 'When you want real service behavior but need to track/override specific methods'
    },
    {
      strategy: 'Use TestBed.inject()',
      description: 'Get service instance from TestBed with proper dependencies',
      example: 'const service = TestBed.inject(MyService);',
      usageScenario: 'When you need the actual service with all its dependencies'
    },
    {
      strategy: 'Mock Child Components',
      description: 'Replace child components with simple test doubles',
      example: 'TestBed.overrideComponent(ChildComponent, { set: { template: "" } });',
      usageScenario: 'When testing parent component behavior independent of children'
    }
  ];

  detectionChangeStrategies = [
    {
      name: 'Manual Change Detection',
      when: 'After direct property changes or events',
      code: 'fixture.detectChanges();'
    },
    {
      name: 'Automatic Change Detection',
      when: 'With fakeAsync/tick for async operations',
      code: 'it("test", fakeAsync(() => { tick(1000); }));'
    },
    {
      name: 'Async Change Detection',
      when: 'With async test utility',
      code: 'it("test", async () => { await fixture.whenStable(); });'
    },
    {
      name: 'Trigger Event Detection',
      when: 'After DOM events (clicks, input)',
      code: 'element.click(); fixture.detectChanges();'
    }
  ];

  asyncTestingPatterns = [
    {
      pattern: 'async/await',
      description: 'Modern promise-based async testing',
      usage: 'it("test", async () => { await service.asyncMethod(); })',
      pros: 'Clean, modern, familiar syntax',
      cons: 'Not ideal for complex timing'
    },
    {
      pattern: 'fakeAsync/tick',
      description: 'Control virtual time for testing',
      usage: 'it("test", fakeAsync(() => { tick(1000); }))',
      pros: 'Complete control over timing',
      cons: 'More verbose, less familiar'
    },
    {
      pattern: 'done callback',
      description: 'Legacy async testing method',
      usage: 'it("test", (done) => { setTimeout(() => { expect(...); done(); }, 100); })',
      pros: 'Universal support',
      cons: 'Verbose, error-prone'
    },
    {
      pattern: 'Observables',
      description: 'Test async streams with RxJS',
      usage: 'expect(observable).toEmitValues([1, 2, 3])',
      pros: 'Natural for Angular',
      cons: 'Requires observable testing library'
    }
  ];

  bestPractices = [
    {
      title: 'Keep tests focused on component behavior, not implementation details',
      description: 'Write tests that verify the component\'s public API and behavior, rather than its internal implementation.'
    },
    {
      title: 'Use AAA pattern: Arrange (setup), Act (trigger), Assert (verify)',
      description: 'Structure your tests in three distinct phases to improve readability and maintainability.'
    },
    {
      title: 'Test user interactions, not component internals',
      description: 'Focus on how users interact with the component rather than testing its internal methods directly.'
    },
    {
      title: 'Mock external dependencies (HTTP, services, router)',
      description: 'Isolate the component under test by replacing external dependencies with controlled mocks.'
    },
    {
      title: 'Test edge cases and error scenarios',
      description: 'Ensure the component handles unexpected situations gracefully and provides appropriate feedback.'
    },
    {
      title: 'Use meaningful test descriptions that explain the scenario',
      description: 'Write clear and descriptive test names that communicate the expected behavior.'
    },
    {
      title: 'Keep setup code DRY with beforeEach blocks',
      description: 'Reuse common setup logic across multiple tests to improve maintainability.'
    },
    {
      title: 'Avoid testing private methods directly',
      description: 'Focus on testing the component\'s public API and behavior instead of its internal implementation details.'
    },
    {
      title: 'Test component state changes through public interfaces',
      description: 'Verify that the component updates its state correctly in response to user interactions or data changes.'
    },
    {
      title: 'Maintain test code quality equivalent to production code',
      description: 'Apply the same coding standards and practices to test code as you do for production code.'
    }
  ];
}
