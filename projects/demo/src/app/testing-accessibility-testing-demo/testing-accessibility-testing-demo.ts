import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-testing-accessibility-testing-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './testing-accessibility-testing-demo.html',
  styleUrls: ['./testing-accessibility-testing-demo.scss'],
})
export class TestingAccessibilityTestingDemo {
  commonService = inject(CommonService);

  accessibilityTestingTools = [
    {
      name: 'axe DevTools',
      type: 'Automated Testing',
      website: 'axe-core.org',
      description: 'Browser extension and NPM package for automated accessibility scanning',
      features: ['WCAG 2.1 compliance', 'Real-time scanning', 'Detailed reports', 'API for CI/CD'],
      installation: 'npm install --save-dev @axe-core/react',
      pros: ['Comprehensive', 'Industry standard', 'Regular updates'],
      cons: ['Can\'t catch all issues', 'False positives']
    },
    {
      name: 'WebAIM Contrast Checker',
      type: 'Color Contrast',
      website: 'webaim.org/resources/contrastchecker/',
      description: 'Check color contrast ratios for WCAG compliance',
      features: ['WCAG AA/AAA', 'Suggestions', 'Link sharing', 'API'],
      installation: 'Online tool or npm package: pa11y',
      pros: ['Simple', 'Accurate', 'Free'],
      cons: ['Manual checking needed']
    },
    {
      name: 'Jest-axe',
      type: 'Unit Testing',
      website: 'github.com/nickcolley/jest-axe',
      description: 'Combine Jest with axe-core for testing accessibility in unit tests',
      features: ['Jest integration', 'Snapshot testing', 'Custom rules'],
      installation: 'npm install --save-dev jest-axe',
      pros: ['CI/CD integration', 'Automated', 'Development workflow'],
      cons: ['Needs setup', 'Complements manual testing']
    },
    {
      name: 'Lighthouse',
      type: 'Auditing',
      website: 'developers.google.com/web/tools/lighthouse',
      description: 'Google\'s comprehensive performance and accessibility auditing tool',
      features: ['WCAG 2.1', 'Performance', 'SEO', 'Best practices'],
      installation: 'Built into Chrome, available via npm',
      pros: ['Holistic', 'Built-in browser', 'Reporting'],
      cons: ['Not designed for component testing']
    }
  ];

  wcagGuidelines = [
    {
      principle: 'Perceivable (1.x)',
      description: 'Information must be presentable to users in ways they can perceive',
      guidelines: [
        '1.1 Text Alternatives: Provide alt text for images',
        '1.3 Adaptable: Present content without relying on shape/size/orientation',
        '1.4 Distinguishable: Make text/images easier to see and hear'
      ]
    },
    {
      principle: 'Operable (2.x)',
      description: 'Components must be operable via keyboard and other input methods',
      guidelines: [
        '2.1 Keyboard Accessible: Full functionality available via keyboard',
        '2.4 Navigable: Help users navigate and find content',
        '2.5 Input Modalities: Support multiple input types beyond keyboard'
      ]
    },
    {
      principle: 'Understandable (3.x)',
      description: 'Text and operations must be understandable to all users',
      guidelines: [
        '3.1 Readable: Make text readable and understandable',
        '3.2 Predictable: Make behavior predictable and consistent',
        '3.3 Input Assistance: Help users avoid and correct mistakes'
      ]
    },
    {
      principle: 'Robust (4.x)',
      description: 'Content must be robust for interpretation by assistive technologies',
      guidelines: [
        '4.1 Compatible: Ensure maximum compatibility with assistive technologies',
        '4.1.2 Name, Role, Value: Expose semantics properly via ARIA',
        '4.1.3 Status Messages: Announce dynamic changes to assistive tech'
      ]
    }
  ];

  commonAccessibilityIssues = [
    {
      issue: 'Missing Alt Text',
      impact: 'High',
      wcag: '1.1.1',
      description: 'Images without descriptive alt text are invisible to screen readers',
      test: 'expect(img.getAttribute("alt")).toBeTruthy();',
      fix: '<img src="logo.png" alt="Company Logo" />'
    },
    {
      issue: 'Insufficient Color Contrast',
      impact: 'High',
      wcag: '1.4.3',
      description: 'Text and background colors don\'t meet WCAG AA/AAA ratios',
      test: 'axe.run().then(results => { expect(results.violations.length).toBe(0); });',
      fix: 'Use color contrast checker tool, aim for 4.5:1 minimum'
    },
    {
      issue: 'Keyboard Navigation Issues',
      impact: 'Critical',
      wcag: '2.1.1',
      description: 'Users cannot navigate with keyboard or tab order is illogical',
      test: 'Simulate Tab key presses, verify focus moves correctly',
      fix: 'Add tabindex, use semantic HTML, manage focus properly'
    },
    {
      issue: 'Missing Form Labels',
      impact: 'High',
      wcag: '1.3.1',
      description: 'Form inputs not associated with descriptive labels',
      test: 'expect(input.getAttribute("aria-label")).toBeTruthy();',
      fix: '<label for="input">Field Name</label><input id="input" />'
    },
    {
      issue: 'Missing ARIA Labels',
      impact: 'Medium',
      wcag: '4.1.2',
      description: 'Interactive elements lack accessible name for screen readers',
      test: 'expect(button.getAttribute("aria-label")).toBeTruthy();',
      fix: '<button aria-label="Close dialog">×</button>'
    },
    {
      issue: 'No Focus Indicator',
      impact: 'High',
      wcag: '2.4.7',
      description: 'Keyboard users can\'t see where they are on the page',
      test: 'Verify :focus styles are visible on all interactive elements',
      fix: 'button:focus { outline: 2px solid #4A90E2; }'
    }
  ];

  testingApproaches = [
    {
      approach: 'Automated Testing',
      tools: ['axe-core', 'jest-axe', 'Lighthouse'],
      advantages: ['Fast', 'Consistent', 'CI/CD ready', 'Catches common issues'],
      limitations: ['Can\'t catch all issues', 'Needs human review', 'Configuration required'],
      coverage: '~30-50% of accessibility issues'
    },
    {
      approach: 'Manual Testing',
      tools: ['Screen readers', 'Keyboard navigation', 'Browser DevTools'],
      advantages: ['Comprehensive', 'Real user experience', 'Catches contextual issues'],
      limitations: ['Time-consuming', 'Requires expertise', 'Less consistent'],
      coverage: '~80-90% of accessibility issues'
    },
    {
      approach: 'Assistive Technology Testing',
      tools: ['NVDA', 'JAWS', 'VoiceOver', 'TalkBack'],
      advantages: ['Real experience', 'Complex interactions', 'Authentic scenarios'],
      limitations: ['Expensive', 'Time-intensive', 'Requires training'],
      coverage: '~95% of actual user experience'
    },
    {
      approach: 'User Testing',
      tools: ['Interviews', 'Usability studies', 'Feedback sessions'],
      advantages: ['Authentic insights', 'Unexpected issues', 'User perspective'],
      limitations: ['Expensive', 'Time-intensive', 'Limited sample size'],
      coverage: 'Best for validation and edge cases'
    }
  ];

  ariaRoles = [
    { role: 'button', usage: 'Make non-button elements act like buttons', example: '<div role="button" tabindex="0">Click me</div>' },
    { role: 'navigation', usage: 'Mark main navigation regions', example: '<nav role="navigation">...</nav>' },
    { role: 'main', usage: 'Mark main content region', example: '<main role="main">...</main>' },
    { role: 'complementary', usage: 'Mark sidebar/supplementary content', example: '<aside role="complementary">...</aside>' },
    { role: 'contentinfo', usage: 'Mark footer/copyright info', example: '<footer role="contentinfo">...</footer>' },
    { role: 'search', usage: 'Mark search functionality', example: '<div role="search">...</div>' },
    { role: 'alert', usage: 'Announce important messages immediately', example: '<div role="alert" aria-live="assertive">Error!</div>' },
    { role: 'dialog', usage: 'Mark modal dialogs', example: '<div role="dialog" aria-modal="true">...</div>' },
    { role: 'progressbar', usage: 'Indicate progress', example: '<div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>' },
    { role: 'tab', usage: 'Mark tab interface', example: '<button role="tab" aria-selected="true">Tab 1</button>' }
  ];

  bestPractices = [
    {
      title: 'Start with semantic HTML (button, nav, main, etc.) before ARIA',
      description: 'Use semantic HTML elements when possible to provide inherent accessibility features.'
    },
    {
      title: 'Test with real assistive technologies, not just automated tools',
      description: 'Ensure your application works well with actual screen readers and other assistive technologies.'
    },
    {
      title: 'Include accessibility requirements in acceptance criteria',
      description: 'Make accessibility a measurable part of your development process.'
    },
    {
      title: 'Make accessibility testing part of CI/CD pipeline',
      description: 'Integrate accessibility checks into your continuous integration and deployment process.'
    },
    {
      title: 'Involve actual users with disabilities in testing',
      description: 'Include people with disabilities in your testing process to get authentic feedback.'
    },
    {
      title: 'Test keyboard navigation with Tab, Enter, Escape keys',
      description: 'Ensure all interactive elements can be accessed and operated using only the keyboard.'
    },
    {
      title: 'Ensure proper heading hierarchy (h1, h2, h3 in order)',
      description: 'Use headings in a logical order to create a clear document structure.'
    },
    {
      title: 'Provide alt text that describes images, not just says "image"',
      description: 'Write descriptive alternative text for images to convey their meaning to users who cannot see them.'
    },
    {
      title: 'Use color as supplementary, not the only way to convey information',
      description: 'Ensure that information is conveyed through multiple means, not just color alone.'
    },
    {
      title: 'Test with screen readers in multiple browsers',
      description: 'Verify that your application works well with different screen readers and browsers.'
    }
  ];
}
