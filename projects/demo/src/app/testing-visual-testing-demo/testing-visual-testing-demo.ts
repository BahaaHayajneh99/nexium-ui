import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-testing-visual-testing-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './testing-visual-testing-demo.html',
  styleUrls: ['./testing-visual-testing-demo.scss'],
})
export class TestingVisualTestingDemo {
  commonService = inject(CommonService);

  visualTestingTools = [
    {
      name: 'Chromatic',
      type: 'Cloud-based',
      website: 'chromatic.com',
      description: 'Visual regression testing for UI components with Storybook integration',
      features: ['Snapshot testing', 'Auto-detection', 'Collaboration', 'CI/CD integration'],
      setup: 'npm install chromatic --save-dev',
      pros: ['Easy setup', 'Cloud-based', 'Great for Storybook', 'Team collaboration'],
      cons: ['Paid service', 'Cloud dependency', 'Learning curve']
    },
    {
      name: 'Percy',
      type: 'Cloud-based',
      website: 'percy.io',
      description: 'Visual testing and monitoring across browsers and devices',
      features: ['Multi-browser', 'Responsive', 'Collaboration', 'Integration SDKs'],
      setup: 'npm install @percy/cli --save-dev',
      pros: ['Multi-browser testing', 'Mobile testing', 'Team workflows', 'Historical tracking'],
      cons: ['Paid service', 'Setup complexity', 'Cloud-dependent']
    },
    {
      name: 'Pixelmatch',
      type: 'Open Source',
      website: 'github.com/mapbox/pixelmatch',
      description: 'Lightweight JavaScript pixel-level image comparison library',
      features: ['Pixel-perfect', 'Small size', 'Configurable', 'No dependencies'],
      setup: 'npm install pixelmatch --save-dev',
      pros: ['Free', 'Lightweight', 'Flexible', 'High precision'],
      cons: ['Manual setup', 'No cloud features', 'Baseline management']
    },
    {
      name: 'Puppeteer + Screenshot Comparison',
      type: 'Open Source',
      website: 'pptr.dev',
      description: 'Headless browser automation with custom screenshot comparison logic',
      features: ['Full browser control', 'Customizable', 'Fast', 'Flexible'],
      setup: 'npm install puppeteer --save-dev',
      pros: ['Free', 'Full control', 'Works with any framework'],
      cons: ['Manual setup', 'Maintenance overhead', 'Learning curve']
    },
    {
      name: 'WebdriverIO',
      type: 'Open Source',
      website: 'webdriver.io',
      description: 'WebDriver standard implementation with visual testing plugins',
      features: ['Visual assertions', 'Multi-browser', 'Flexible', 'Good documentation'],
      setup: 'npm install @wdio/cli --save-dev',
      pros: ['WebDriver standard', 'Multi-browser', 'Community support'],
      cons: ['Setup complexity', 'Slower than headless', 'Learning curve']
    }
  ];

  visualTestingApproaches = [
    {
      approach: 'Snapshot Testing',
      description: 'Compare current screenshot with baseline/approved version',
      useCases: ['Regression detection', 'Design consistency', 'Cross-browser', 'Responsive design'],
      tools: ['Chromatic', 'Percy', 'Pixelmatch'],
      workflow: '1. Generate baseline 2. Run tests 3. Compare results 4. Approve changes',
      pros: ['Simple concept', 'Automated', 'Visual verification'],
      cons: ['Flaky tests', 'Environment sensitivity', 'Change management']
    },
    {
      approach: 'Pixel-Perfect Testing',
      description: 'Verify UI matches design with pixel-level precision',
      useCases: ['Design compliance', 'Responsive validation', 'Cross-browser', 'Pixel distances'],
      tools: ['Pixelmatch', 'BackstopJS', 'Puppeteer'],
      workflow: '1. Define regions 2. Capture baseline 3. Run test 4. Compare pixels',
      pros: ['Very precise', 'Catch small changes', 'Reproducible'],
      cons: ['Environment sensitive', 'Slow', 'Difficult to maintain']
    },
    {
      approach: 'Cross-Browser Testing',
      description: 'Verify UI renders correctly across multiple browsers',
      useCases: ['Browser compatibility', 'Layout variations', 'Feature support'],
      tools: ['Chromatic', 'Percy', 'BrowserStack'],
      workflow: '1. Define browsers 2. Run tests 3. Compare results 4. Debug issues',
      pros: ['Comprehensive coverage', 'Real browsers', 'Easy to spot issues'],
      cons: ['Slow', 'Expensive', 'Complex setup']
    },
    {
      approach: 'Responsive Design Testing',
      description: 'Verify UI works correctly at different screen sizes',
      useCases: ['Mobile testing', 'Tablet testing', 'Desktop testing', 'Breakpoint validation'],
      tools: ['Chromatic', 'Percy', 'Puppeteer with viewport'],
      workflow: '1. Define viewports 2. Capture screenshots 3. Compare layouts 4. Verify responsive',
      pros: ['Catches layout issues', 'Mobile-first validation', 'Automated'],
      cons: ['Device limitations', 'Need multiple baselines', 'Maintenance']
    }
  ];

  commonVisualIssues = [
    {
      issue: 'Layout Shift',
      description: 'Content moves unexpectedly on page',
      detection: 'Visual regression test detects position changes',
      prevention: 'Reserve space for images/ads, use CSS containment',
      tool: 'Chromatic, Percy'
    },
    {
      issue: 'Broken Styling',
      description: 'CSS changes cause visual degradation',
      detection: 'Screenshot comparison shows style differences',
      prevention: 'Test CSS changes with visual tests before merge',
      tool: 'Percy, Chromatic'
    },
    {
      issue: 'Font Loading Issues',
      description: 'Text appears in wrong font or causes flash',
      detection: 'Screenshot timing variations, FOUT/FOIT',
      prevention: 'Use font-display: swap, preload fonts',
      tool: 'Puppeteer with timing control'
    },
    {
      issue: 'Color Rendering Differences',
      description: 'Colors look different across browsers/monitors',
      detection: 'Pixel comparison fails with color variance',
      prevention: 'Test on multiple devices, use standard colors',
      tool: 'Cross-browser testing tools'
    },
    {
      issue: 'Responsive Breakpoint Issues',
      description: 'Layout breaks at certain screen sizes',
      detection: 'Screenshot at breakpoint size shows problems',
      prevention: 'Test all defined breakpoints systematically',
      tool: 'Puppeteer, Percy with viewport config'
    },
    {
      issue: 'Image Loading Problems',
      description: 'Missing, broken, or incorrectly scaled images',
      detection: 'Visual test shows image placeholders or broken state',
      prevention: 'Mock images in tests, verify img src attributes',
      tool: 'Visual regression tools'
    }
  ];

  bestPractices = [
    {
      title: 'Keep visual tests focused on critical UI components',
      description: 'Prioritize testing of key user interface elements that impact user experience and functionality.',
    },
    {
      title: 'Start with a single baseline screenshot for comparison',
      description: 'Establish a reference image to compare against future test runs to detect visual regressions.'},
    {
      title: 'Use stable environments to reduce false positives',
      description: 'Run tests in consistent environments (fixed seed, same machine)'
    },
    {
      title: 'Combine visual testing with functional testing',
      description: 'Ensure both visual and functional aspects of the application are tested'
    },
    {
      title: 'Test critical user paths and key UI components',
      description: 'Prioritize testing of the most important user journeys and interface elements'
    },
    {
      title: 'Review visual changes carefully, not automatically',
      description: 'Manually inspect visual differences to ensure they are intentional and acceptable'
    },
    {
      title: 'Update baselines when intentional design changes occur',
      description: 'Regularly update the reference images to reflect approved design modifications'
    },
    {
      title: 'Test across multiple browsers and screen sizes',
      description: 'Ensure consistent appearance and behavior across different environments'
    },
    {
      title: 'Automate visual tests in CI/CD pipeline',
      description: 'Integrate visual testing into the continuous integration and deployment process'
    },
    {
      title: 'Use visual testing for regression detection, not primary validation',
      description: 'Leverage visual testing to catch unintended changes, rather than as the main validation method'
    },
    {
      title: 'Keep visual test suites focused and maintainable',
      description: 'Organize tests to ensure they are easy to understand, modify, and maintain'
    }
  ];

  implementationSteps = [
    {
      step: '1. Setup Test Infrastructure',
      details: 'Install testing tool (Chromatic, Percy, Puppeteer)',
      command: 'npm install --save-dev <tool-name>'
    },
    {
      step: '2. Create Test Baseline',
      details: 'Capture initial screenshots of components/pages',
      command: 'npm run visual:baseline'
    },
    {
      step: '3. Configure Test Settings',
      details: 'Define browsers, viewports, delays, comparison threshold',
      code: 'percySnapshot("login-form", { widths: [375, 768, 1280] })'
    },
    {
      step: '4. Write Visual Tests',
      details: 'Navigate to page and capture screenshot',
      code: 'page.goto(url); await percySnapshot("page")'
    },
    {
      step: '5. Run Tests',
      details: 'Execute test suite and generate comparisons',
      command: 'npm run visual:test'
    },
    {
      step: '6. Review Results',
      details: 'Examine differences and approve/reject changes',
      action: 'Review changes in visual testing dashboard'
    },
    {
      step: '7. Integrate into CI/CD',
      details: 'Run tests automatically on pull requests',
      command: 'Add to GitHub Actions, Jenkins, etc.'
    }
  ];

  crossBrowserMatrix = [
    { browser: 'Chrome', versions: ['Latest', 'Latest-1'], mobileSupport: 'Chrome Mobile' },
    { browser: 'Firefox', versions: ['Latest', 'Latest-1'], mobileSupport: 'Firefox Mobile' },
    { browser: 'Safari', versions: ['Latest', 'Latest-1'], mobileSupport: 'Safari iOS' },
    { browser: 'Edge', versions: ['Latest', 'Latest-1'], mobileSupport: 'Edge Mobile' }
  ];
}
