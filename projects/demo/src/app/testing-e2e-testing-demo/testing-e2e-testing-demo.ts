import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-testing-e2e-testing-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './testing-e2e-testing-demo.html',
  styleUrls: ['./testing-e2e-testing-demo.scss'],
})
export class TestingE2eTestingDemo {
  commonService = inject(CommonService);

  e2eFrameworks = [
    {
      name: 'Cypress',
      website: 'cypress.io',
      description: 'Modern E2E testing framework with excellent developer experience',
      setup: 'npm install --save-dev cypress',
      features: ['Real browser', 'Time travel', 'Network stubbing', 'Video recording', 'CI/CD integration'],
      languageSupport: 'JavaScript, TypeScript',
      pros: ['Excellent DX', 'Great documentation', 'Strong community', 'Debugging tools'],
      cons: ['Only Chromium-based', 'Not true E2E for all browsers', 'Dashboard paid tier'],
      example: 'cy.visit("/login"); cy.get("input").type("user@email.com"); cy.contains("Login").click();'
    },
    {
      name: 'Playwright',
      website: 'playwright.dev',
      description: 'Powerful cross-browser automation for E2E testing',
      setup: 'npm install --save-dev @playwright/test',
      features: ['Multi-browser', 'Mobile emulation', 'Network interception', 'Fast', 'Parallel testing'],
      languageSupport: 'JavaScript, TypeScript, Python, Java, C#',
      pros: ['True cross-browser', 'Excellent API', 'Fast execution', 'Good documentation'],
      cons: ['Steeper learning curve', 'Less DX focus', 'Smaller community vs Cypress'],
      example: 'await page.goto("https://example.com"); await page.fill("input", "text"); await page.click("button");'
    },
    {
      name: 'WebdriverIO',
      website: 'webdriver.io',
      description: 'WebDriver standard implementation for cross-browser testing',
      setup: 'npm install --save-dev @wdio/cli',
      features: ['WebDriver standard', 'Multi-browser', 'Real mobile', 'Appium support', 'Plugins'],
      languageSupport: 'JavaScript, TypeScript',
      pros: ['WebDriver standard', 'Mobile testing', 'Real browsers', 'Mature ecosystem'],
      cons: ['Slower', 'More complex', 'Steeper learning curve'],
      example: 'browser.url("https://example.com"); $("input").setValue("text"); $("button").click();'
    },
    {
      name: 'Nightwatch.js',
      website: 'nightwatchjs.org',
      description: 'Automated testing framework for web applications',
      setup: 'npm install --save-dev nightwatch',
      features: ['Selenium/WebDriver', 'Built-in reports', 'Parallel execution', 'Cloud integration'],
      languageSupport: 'JavaScript, TypeScript',
      pros: ['Mature', 'Good documentation', 'Built-in reporter', 'Cloud platform support'],
      cons: ['Slower development', 'Less community', 'Outdated feel'],
      example: 'browser.url("https://example.com").setValue("input", "text").click("button");'
    },
    {
      name: 'Protractor',
      website: 'protractortest.org',
      description: 'E2E testing framework for Angular applications (legacy)',
      setup: 'npm install --save-dev protractor',
      features: ['Angular-specific', 'Sync with Angular', 'Jasmine integration'],
      languageSupport: 'JavaScript, TypeScript',
      pros: ['Angular integration', 'Familiar for Angular devs'],
      cons: ['Deprecated', 'Slow', 'Maintenance concerns'],
      example: 'browser.get("https://example.com"); element(by.model("name")).sendKeys("text");'
    }
  ];

  e2eScenarios = [
    {
      scenario: 'User Authentication',
      description: 'Test login/logout flows and session management',
      steps: [
        'Navigate to login page',
        'Fill email and password fields',
        'Submit form',
        'Verify redirect to dashboard',
        'Verify user info displayed',
        'Logout and verify redirect'
      ],
      assertions: ['Login successful', 'Dashboard visible', 'User data correct', 'Logout works'],
      coverage: 'Critical'
    },
    {
      scenario: 'Data Table Operations',
      description: 'Test table interactions: sorting, filtering, pagination',
      steps: [
        'Load data table',
        'Click column header to sort',
        'Verify data sorted correctly',
        'Apply filter',
        'Verify filtered results',
        'Change page number'
      ],
      assertions: ['Data sorted', 'Filter applied', 'Pagination works', 'No data loss'],
      coverage: 'High'
    },
    {
      scenario: 'Form Submission with Validation',
      description: 'Test form validation, error handling, success',
      steps: [
        'Navigate to form page',
        'Try submit with empty fields',
        'Fill required fields',
        'Submit form',
        'Verify success message',
        'Verify data saved'
      ],
      assertions: ['Validation shows errors', 'Form submits', 'Message displayed', 'Redirect works'],
      coverage: 'Critical'
    },
    {
      scenario: 'Search and Navigation',
      description: 'Test search functionality and page navigation',
      steps: [
        'Enter search term',
        'Verify results displayed',
        'Click result item',
        'Verify detail page loaded',
        'Navigate back',
        'Verify list page restored'
      ],
      assertions: ['Results found', 'Detail page correct', 'Navigation works', 'State preserved'],
      coverage: 'High'
    },
    {
      scenario: 'Real-time Updates',
      description: 'Test real-time data updates and notifications',
      steps: [
        'Load page with live data',
        'Trigger data update from another session',
        'Verify UI updates automatically',
        'Verify notification shown',
        'Test multiple updates'
      ],
      assertions: ['Data updates in real-time', 'Notification shown', 'UI responsive'],
      coverage: 'Medium'
    },
    {
      scenario: 'Error Handling',
      description: 'Test application behavior during errors',
      steps: [
        'Simulate API error',
        'Verify error message displayed',
        'Verify user can retry',
        'Test network failure',
        'Verify offline handling'
      ],
      assertions: ['Error message clear', 'Retry works', 'App stable after error'],
      coverage: 'High'
    }
  ];

  bestPractices = [
    {
      title:'Test user journeys, not implementation details',
      description:'Focus on testing the end-to-end behavior of the application from the user\'s perspective'
    },
    {
      title:'Use page object models to organize test code',
      description:'Create reusable abstractions for page elements and actions to improve test maintainability'
    },
    {
      title:'Make tests independent and order-agnostic',
      description:'Ensure each test can run independently and in any order without affecting others'
    },
    {
      title:'Use meaningful assertions that describe expected behavior',
      description:'Write assertions that clearly communicate what is being tested and what the expected outcome is'
    },
    {
      title:'Handle async operations explicitly (wait, polling)',
      description:'Ensure tests properly wait for asynchronous operations to complete'
    },
    {
      title:'Mock external services when appropriate',
      description:'Isolate tests from external dependencies by using mocks or stubs'
    },
    {
      title:'Run tests in parallel for faster execution',
      description:'Execute tests concurrently to reduce overall test suite runtime'
    },
    {
      title:'Include both happy paths and error scenarios',
      description:'Test the application under normal conditions as well as failure cases'
    },
    {
      title:'Keep tests maintainable with DRY principles',
      description:'Avoid code duplication in tests by reusing common setup and assertion logic'
    },
    {
      title:'Run E2E tests in CI/CD pipeline before deployment',
      description:'Integrate end-to-end tests into the continuous integration and deployment process'
    }
  ];

  pageObjectPattern = [
    {
      component: 'Page Class',
      description: 'Encapsulates page elements and actions',
      example: 'class LoginPage { constructor(page) { this.page = page; } async login(user, pass) { ... } }'
    },
    {
      component: 'Element Locators',
      description: 'Centralized selectors for page elements',
      example: 'this.emailInput = page.locator("#email"); this.submitBtn = page.locator("button[type=submit]");'
    },
    {
      component: 'User Actions',
      description: 'Methods representing user interactions',
      example: 'async fillEmail(email) { await this.emailInput.fill(email); }'
    },
    {
      component: 'Assertions',
      description: 'Methods to verify expected state',
      example: 'async expectLoginSuccess() { await this.page.waitForURL("/dashboard"); }'
    }
  ];

  debuggingTechniques = [
    {
      technique: 'Screenshots',
      description: 'Capture page state at specific moments',
      usage: 'cy.screenshot("login-form"); await page.screenshot({ path: "screenshot.png" });',
      usecase: 'Debugging visual issues, CI failure investigation'
    },
    {
      technique: 'Video Recording',
      description: 'Record entire test execution',
      usage: 'Cypress records automatically; Playwright: recordVideo: { dir: "videos" }',
      usecase: 'Understanding test failures, sharing with team'
    },
    {
      technique: 'Console Logs',
      description: 'Print debugging information during test',
      usage: 'cy.log("User logged in"); console.log(testData);',
      usecase: 'Tracking test flow, verifying data'
    },
    {
      technique: 'Debugger Breakpoints',
      description: 'Pause test execution to inspect state',
      usage: 'cy.debug(); await page.pause();',
      usecase: 'Interactive debugging, inspection'
    },
    {
      technique: 'Network Inspection',
      description: 'Monitor and inspect network requests',
      usage: 'cy.intercept("GET", "/api/**"); page.on("request", ...)',
      usecase: 'Debugging API issues, mocking responses'
    }
  ];

  ciCdIntegration = [
    {
      platform: 'GitHub Actions',
      setup: 'Create .github/workflows/e2e.yml with test commands',
      config: 'runs-on: ubuntu-latest; run: npm run e2e',
      benefits: ['Free for public', 'Deep GitHub integration', 'Good documentation']
    },
    {
      platform: 'Jenkins',
      setup: 'Create Jenkins pipeline with test stages',
      config: 'stage("E2E Tests") { steps { sh "npm run e2e" } }',
      benefits: ['Self-hosted option', 'Powerful', 'Mature ecosystem']
    },
    {
      platform: 'GitLab CI',
      setup: 'Configure .gitlab-ci.yml with e2e job',
      config: 'e2e: script: - npm run e2e',
      benefits: ['Native integration', 'Good performance', 'Free tier']
    },
    {
      platform: 'CircleCI',
      setup: 'Create .circleci/config.yml workflow',
      config: 'step: run: npm run e2e',
      benefits: ['Fast execution', 'Good docs', 'Free tier available']
    }
  ];
}
