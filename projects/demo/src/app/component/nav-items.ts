export interface NxNavLink {
  label: string;
  path: string;
  /** Marks this component as a paid/licensed feature - renders a small "PRO" badge and gates the route behind checkout. */
  isPro?: boolean;
  /** Marks this component as newly added since the last major release - renders a small "NEW" badge. */
  isNew?: boolean;
}

export interface NxNavGroup {
  /** Omit for a flat list of links with no sub-heading. */
  heading?: string;
  links: NxNavLink[];
}

export interface NxNavItem {
  /** Stable identity used for expand/collapse state - not displayed. */
  key: string;
  label: string;
  icon: string;
  /** Set for a direct link with no expand/collapse chevron. */
  path?: string;
  /** Set for an expandable item; rendered as one or more grouped/headed sections. */
  groups?: NxNavGroup[];
  /** Marks this direct (flat) nav item as newly added - renders a small "NEW" badge. */
  isNew?: boolean;
}

export const NAV_ITEMS: NxNavItem[] = [
  {
    key: 'Getting Started',
    label: 'Getting Started',
    icon: 'nx-rocket',
    groups: [
      {
        links: [
          { label: 'Introduction', path: '/getting-started/introduction' },
          { label: 'Quick Start', path: '/getting-started/quick-start' },
          { label: 'Installation', path: '/installation/requirements' },
          { label: 'Configuration', path: '/getting-started/configuration' },
          { label: 'First Component', path: '/getting-started/first-component' },
          { label: 'Migration Guide', path: '/getting-started/migration-guide' },
        ],
      },
    ],
  },
  {
    key: 'Design System',
    label: 'Design System',
    icon: 'nx-palette',
    groups: [
      {
        links: [
          { label: 'Overview', path: '/design-system/overview' },
          { label: 'Design Tokens', path: '/design-system/design-tokens' },
          { label: 'Colors', path: '/guide/colors' },
          { label: 'Typography', path: '/guide/typography' },
          { label: 'Spacing', path: '/guide/spacing' },
          { label: 'Border Radius', path: '/design-system/border-radius' },
          { label: 'Shadows', path: '/design-system/shadows' },
          { label: 'Elevation', path: '/design-system/elevation' },
          { label: 'Breakpoints', path: '/design-system/breakpoints' },
          { label: 'Motion & Animation', path: '/design-system/motion-animation' },
        ],
      },
    ],
  },
  {
    key: 'Components',
    label: 'Components',
    icon: 'nx-grid',
    groups: [
      {
        heading: 'Forms',
        links: [
          { label: 'Input', path: '/input' },
          { label: 'Textarea', path: '/textarea' },
          { label: 'Select', path: '/select' },
          { label: 'AutoComplete', path: '/autocomplete' },
          { label: 'Combobox', path: '/combobox', isNew: true },
          { label: 'Checkbox', path: '/checkbox' },
          { label: 'Radio', path: '/radio' },
          { label: 'Switch', path: '/switch' },
          { label: 'Toggle', path: '/toggle' },
          { label: 'Segmented Control', path: '/segmented-control', isNew: true },
          { label: 'Slider', path: '/slider' },
          // { label: 'Form Builder', path: '/form-builder', isPro: true },
          // { label: 'Advanced Form Builder', path: '/form-builder-advanced', isPro: true },
          { label: 'Color Picker', path: '/color-picker' },
          { label: 'Rating', path: '/rating' },
          { label: 'Rich Text Editor', path: '/rich-text-editor', isPro: true },
          { label: 'Address Input', path: '/address-input', isNew: true },
          { label: 'JSON Editor', path: '/json-editor', isPro: true, isNew: true },
        ],
      },
      {
        heading: 'Date & Time',
        links: [
          { label: 'DatePicker', path: '/datepicker' },
          { label: 'Date Range Picker', path: '/date-range-picker' },
          { label: 'TimePicker', path: '/time-picker' },
        ],
      },
      {
        heading: 'Advanced Inputs',
        links: [
          { label: 'Number Input', path: '/number-input' },
          { label: 'Input Mask', path: '/input-mask', isPro: true },
          { label: 'Password Input', path: '/password-input', isPro: true },
          { label: 'Phone Input', path: '/phone-input' },
          { label: 'Search Input', path: '/search-input' },
          { label: 'OTP Input', path: '/otp-input', isPro: true },
          { label: 'Mention', path: '/mention', isPro: true },
          { label: 'Formula Input', path: '/formula-input', isPro: true, isNew: true },
          { label: 'Unit Input', path: '/unit-input', isPro: true },
        ],
      },
      {
        heading: 'Data Display',
        links: [
          { label: 'Table', path: '/table' },
          { label: 'Tree Table', path: '/tree-table', isPro: true, isNew: true },
          { label: 'List', path: '/list' },
          { label: 'Chip', path: '/chip' },
          { label: 'Badge', path: '/badge' },
          { label: 'Tag', path: '/tag' },
          { label: 'Avatar', path: '/avatar' },
          { label: 'Icon', path: '/icon' },
          { label: 'Timeline', path: '/timeline' },
          { label: 'Tree', path: '/tree', isPro: true },
          { label: 'Progress Bar', path: '/progress-bar' },
          { label: 'Spinner', path: '/spinner' },
          { label: 'Skeleton', path: '/skeleton', isPro: true },
          { label: 'Statistic', path: '/statistic' },
          { label: 'Key-Value List', path: '/key-value-list' },
          { label: 'Todo List', path: '/todo-list', isPro: true },
          { label: 'Notes App', path: '/notes-app', isPro: true },
          { label: 'Filter Chip Group', path: '/filter-chip-group', isNew: true },
          { label: 'Color Contrast Checker', path: '/color-contrast-checker', isPro: true, isNew: true },
          { label: 'Version Badge', path: '/version-badge', isNew: true },
          { label: 'Changelog Widget', path: '/changelog-widget', isNew: true },
          { label: 'Activity Timeline', path: '/activity-timeline', isNew: true },
          { label: 'Activity Feed', path: '/activity-feed', isNew: true },
          { label: 'Audit Timeline', path: '/audit-timeline', isNew: true },
          // { label: 'Code Block', path: '/code-block' },
          { label: 'Copyable Text', path: '/copyable-text', isNew: true },
          { label: 'Keyboard Shortcut', path: '/keyboard-shortcut', isNew: true },
          { label: 'JSON Viewer', path: '/json-viewer', isPro: true, isNew: true },
          { label: 'Diff Viewer', path: '/diff-viewer', isPro: true, isNew: true },
          { label: 'Before / After', path: '/before-after', isPro: true, isNew: true },
        ],
      },
      {
        heading: 'Feedback',
        links: [
          { label: 'Alert', path: '/alert' },
          { label: 'Toast', path: '/toast' },
          { label: 'Notification Center', path: '/notification-center' },
          { label: 'Modal', path: '/modal' },
          { label: 'Confirm Dialog', path: '/dialog' },
          { label: 'Drawer', path: '/drawer' },
          { label: 'Tooltip', path: '/tooltip' },
          { label: 'Popover', path: '/popover' },
          { label: 'Empty State', path: '/empty-state' },
          { label: 'Result', path: '/result' },
          { label: 'Command Palette', path: '/command-palette', isPro: true },
          { label: 'Loading', path: '/loading', isNew: true },
          { label: 'Loading Button', path: '/loading-button', isNew: true },
          { label: 'Status Indicator', path: '/status-indicator', isNew: true },
          { label: 'Connection Status', path: '/connection-status', isNew: true },
          { label: 'Not Found', path: '/not-found', isNew: true },
          { label: 'Permission Denied', path: '/permission-denied', isNew: true },
          { label: 'Maintenance State', path: '/maintenance-state', isNew: true },
          { label: 'Unsaved Changes Dialog', path: '/unsaved-changes-dialog', isNew: true },
        ],
      },
      {
        heading: 'Overlay / Interaction',
        links: [
          { label: 'Popover Menu', path: '/popover-menu', isNew: true },
          { label: 'Hover Card', path: '/hover-card', isNew: true },
          { label: 'Lightbox', path: '/lightbox', isNew: true },
          { label: 'Fullscreen Dialog', path: '/fullscreen-dialog', isNew: true },
          { label: 'Loading Overlay', path: '/loading-overlay', isNew: true },
          { label: 'Tour', path: '/tour', isNew: true },
          { label: 'Spotlight', path: '/spotlight', isNew: true },
        ],
      },
      {
        heading: 'Navigation',
        links: [
          { label: 'Breadcrumb', path: '/breadcrumb' },
          { label: 'Pagination', path: '/pagination' },
          { label: 'Stepper', path: '/stepper' },
          { label: 'Sidebar', path: '/sidebar' },
          { label: 'Menu', path: '/menu' },
          { label: 'Dropdown Menu', path: '/dropdown-menu' },
          { label: 'Context Menu', path: '/context-menu' },
          { label: 'Menubar', path: '/menubar' },
          { label: 'Mega Menu', path: '/mega-menu' },
          { label: 'Navbar', path: '/navbar' },
          { label: 'Bottom Navigation', path: '/bottom-navigation' },
          { label: 'Back to Top', path: '/back-to-top' },
          { label: 'Navigation Rail', path: '/navigation-rail', isNew: true },
          { label: 'Back Button', path: '/back-button', isNew: true },
          { label: 'Nav Group', path: '/nav-group', isNew: true },
          { label: 'Command Bar', path: '/command-bar', isNew: true },
          { label: 'Navigation Progress', path: '/navigation-progress', isNew: true },
        ],
      },
      {
        heading: 'Panels',
        links: [
          { label: 'Accordion', path: '/accordion' },
          { label: 'Tabs', path: '/tabs' },
          { label: 'Collapse', path: '/collapse' },
          { label: 'Panel', path: '/panel' },
          { label: 'Card', path: '/card' },
        ],
      },
      {
        heading: 'Layout',
        links: [
          { label: 'Container', path: '/layout/container' },
          { label: 'Grid', path: '/layout/grid' },
          { label: 'Flex', path: '/layout/flex' },
          { label: 'Stack', path: '/layout/stack' },
          { label: 'Divider', path: '/layout/divider' },
          { label: 'Spacer', path: '/layout/spacer' },
          { label: 'Splitter', path: '/layout/splitter' },
          { label: 'Aspect Ratio', path: '/layout/aspect-ratio' },
          { label: 'Masonry', path: '/layout/masonry' },
          { label: 'Resizable', path: '/layout/resizable', isPro: true },
          { label: 'App Shell', path: '/layout/app-shell', isNew: true },
          { label: 'Page Header', path: '/layout/page-header', isNew: true },
          { label: 'Page Actions', path: '/layout/page-actions', isNew: true },
          { label: 'Responsive Preview', path: '/layout/responsive-preview', isNew: true },
          { label: 'Device Frame', path: '/layout/device-frame', isNew: true },
          { label: 'Layout Preview', path: '/layout/layout-preview', isNew: true },
        ],
      },
      {
        heading: 'Uploads',
        links: [
          { label: 'File Upload', path: '/file-upload' },
          { label: 'Image Upload', path: '/image-upload' },
          { label: 'Video Upload', path: '/video-upload' },
          { label: 'Audio Upload', path: '/audio-upload' },
          { label: 'Document Upload', path: '/document-upload' },
        ],
      },
      {
        heading: 'Media',
        links: [
          { label: 'Gallery', path: '/gallery', isPro: true },
          { label: 'Preview', path: '/preview' },
          { label: 'Carousel', path: '/carousel', isPro: true },
        ],
      },
      {
        heading: 'Advanced Interaction',
        links: [
          { label: 'Virtual Scroll', path: '/virtual-scroll', isPro: true, isNew: true },
          { label: 'Sortable List', path: '/sortable-list', isPro: true, isNew: true },
          { label: 'Kanban Board', path: '/kanban', isPro: true, isNew: true },
          { label: 'Resizable Panels', path: '/resizable-panels', isNew: true },
          { label: 'Column Selector', path: '/column-selector', isPro: true, isNew: true },
          { label: 'Filter Builder', path: '/filter-builder', isPro: true, isNew: true },
          { label: 'Query Builder', path: '/query-builder', isPro: true, isNew: true },
        ],
      },
      {
        heading: 'Collaboration & Activity',
        links: [
          { label: 'Chat', path: '/chat', isPro: true, isNew: true },
          { label: 'Command History', path: '/command-history', isPro: true, isNew: true },
          { label: 'Version Timeline', path: '/version-timeline', isPro: true, isNew: true },
          { label: 'Audit Log', path: '/audit-log', isPro: true, isNew: true },
        ],
      },
      {
        heading: 'Design Tools',
        links: [
          { label: 'Color Gradient', path: '/design-tools/color-gradient', isPro: true, isNew: true },
          { label: 'Color Gradient Editor', path: '/design-tools/color-gradient-editor', isPro: true, isNew: true },
          { label: 'Shadow Editor', path: '/design-tools/shadow-editor', isPro: true, isNew: true },
          { label: 'Border Editor', path: '/design-tools/border-editor', isPro: true, isNew: true },
          { label: 'Transform Editor', path: '/design-tools/transform-editor', isPro: true, isNew: true },
          { label: 'Spacing Editor', path: '/design-tools/spacing-editor', isPro: true, isNew: true },
          { label: 'Property Editor', path: '/design-tools/property-editor', isPro: true, isNew: true },
          { label: 'Theme Editor', path: '/design-tools/theme-editor', isPro: true, isNew: true },
        ],
      },
      {
        heading: 'Dashboard',
        links: [
          { label: 'Metric Card', path: '/dashboard/metric-card', isNew: true },
          { label: 'Metric Grid', path: '/dashboard/metric-grid', isNew: true },
          { label: 'Sparkline Card', path: '/dashboard/sparkline-card', isNew: true },
          { label: 'KPI Card', path: '/dashboard/kpi-card', isNew: true },
          { label: 'Comparison Card', path: '/dashboard/comparison-card', isNew: true },
          { label: 'Goal Progress', path: '/dashboard/goal-progress', isNew: true },
          { label: 'Ranking List', path: '/dashboard/ranking-list', isNew: true },
          { label: 'Leaderboard', path: '/dashboard/leaderboard', isNew: true },
          { label: 'Statistic Group', path: '/dashboard/statistic-group', isPro: true, isNew: true },
          { label: 'Dashboard Widget', path: '/dashboard/dashboard-widget', isNew: true },
        ],
      },
      {
        heading: 'Developer Tools',
        links: [
          { label: 'HTTP Status', path: '/devtools/http-status', isNew: true },
          { label: 'Environment Switcher', path: '/devtools/environment-switcher', isNew: true },
          // { label: 'Terminal', path: '/devtools/terminal', isPro: true },
          // { label: 'Log Viewer', path: '/devtools/log-viewer', isPro: true },
          // { label: 'API Response Viewer', path: '/devtools/api-response-viewer', isPro: true },
          // { label: 'Request Builder', path: '/devtools/request-builder', isPro: true },
          { label: 'Regex Tester', path: '/devtools/regex-tester', isPro: true, isNew: true },
          { label: 'Cron Builder', path: '/devtools/cron-builder', isPro: true, isNew: true },
          // { label: 'Code Editor', path: '/devtools/code-editor', isPro: true },
        ],
      },
      {
        heading: 'Enterprise / Pro',
        links: [
          { label: 'Advanced Data Grid', path: '/enterprise/advanced-data-grid', isPro: true, isNew: true },
          { label: 'Scheduler', path: '/enterprise/scheduler', isPro: true, isNew: true },
          { label: 'Gantt Chart', path: '/enterprise/gantt-chart', isPro: true, isNew: true },
          // { label: 'Permission Matrix', path: '/enterprise/permission-matrix', isPro: true },
          { label: 'Workflow Builder', path: '/enterprise/workflow-builder', isPro: true, isNew: true },
        ],
      },
      {
        heading: 'Other',
        links: [{ label: 'Button', path: '/button' }],
      },
    ],
  },
  {
    key: 'Directives',
    label: 'Directives',
    icon: 'nx-external-link',
    groups: [
      {
        links: [
          { label: 'Click Outside', path: '/directives/click-outside' },
          { label: 'Autofocus', path: '/directives/autofocus' },
          { label: 'Copy to Clipboard', path: '/directives/copy-to-clipboard' },
          { label: 'Long Press', path: '/directives/long-press' },
          { label: 'Debounce Click', path: '/directives/debounce-click' },
          { label: 'Has Permission', path: '/directives/has-permission' },
          { label: 'Feature Flag', path: '/directives/feature-flag' },
          { label: 'Permission Gate', path: '/directives/permission-gate' },
          { label: 'Drag & Drop', path: '/directives/drag-drop' },
          { label: 'Infinite Scroll', path: '/directives/infinite-scroll' },
        ],
      },
    ],
  },
  {
    key: 'Charts',
    label: 'Charts',
    icon: 'nx-chart-bar',
    groups: [
      {
        links: [
          { label: 'Bar Chart', path: '/charts/bar' },
          { label: 'Line Chart', path: '/charts/line' },
          { label: 'Area Chart', path: '/charts/area' },
          { label: 'Pie Chart', path: '/charts/pie' },
          { label: 'Doughnut', path: '/charts/doughnut' },
          { label: 'Radar', path: '/charts/radar' },
          { label: 'Scatter', path: '/charts/scatter' },
          { label: 'Bubble', path: '/charts/bubble' },
          { label: 'Gauge', path: '/charts/gauge', isPro: true },
          { label: 'Heatmap', path: '/charts/heatmap' },
          { label: 'Funnel', path: '/charts/funnel' },
          { label: 'Stacked Bar', path: '/charts/stacked-bar', isPro: true },
          { label: 'Mixed Chart', path: '/charts/mixed', isPro: true },
          { label: 'Sparkline', path: '/charts/sparkline' },
        ],
      },
    ],
  },
  { key: 'Pipes', label: 'Pipes', icon: 'nx-filter', path: '/pipes' },
  { key: 'Icons', label: 'Icons', icon: 'nx-star', path: '/icons' },
  { key: 'Emoji', label: 'Emoji', icon: 'nx-heart', path: '/emoji' },
  {
    key: 'Blocks',
    label: 'Blocks',
    icon: 'nx-copy',
    groups: [
      {
        links: [
          { label: 'Hero Sections', path: '/blocks/hero-sections' },
          { label: 'Headers', path: '/blocks/headers' },
          { label: 'Footers', path: '/blocks/footers' },
          { label: 'Pricing', path: '/blocks/pricing' },
          { label: 'Feature Sections', path: '/blocks/feature-sections' },
          { label: 'Testimonials', path: '/blocks/testimonials' },
          { label: 'CTA Sections', path: '/blocks/cta-sections' },
          { label: 'Login', path: '/blocks/login' },
          { label: 'Register', path: '/blocks/register' },
          { label: 'Contact', path: '/blocks/contact' },
          { label: 'FAQ', path: '/blocks/faq' },
          { label: 'About', path: '/blocks/about' },
          { label: 'Team', path: '/blocks/team' },
          { label: 'Newsletter', path: '/blocks/newsletter' },
          { label: 'Blog', path: '/blocks/blog' },
          { label: 'Dashboard', path: '/blocks/dashboard' },
          { label: 'Statistics', path: '/blocks/statistics' },
          { label: 'Landing Pages', path: '/blocks/landing-pages' },
        ],
      },
    ],
  },
  {
    key: 'Templates',
    label: 'Templates',
    icon: 'nx-file',
    groups: [
      {
        links: [
          { label: 'Login', path: '/templates/login' },
          { label: 'Register', path: '/templates/register' },
          { label: 'Forgot Password', path: '/templates/forgot-password' },
          { label: 'Dashboard', path: '/templates/dashboard' },
          { label: 'Profile', path: '/templates/profile' },
          { label: 'Settings', path: '/templates/settings' },
          { label: 'Admin Dashboard', path: '/templates/admin-dashboard' },
          { label: 'CRM', path: '/templates/crm' },
          { label: 'HR Portal', path: '/templates/hr-portal' },
          { label: 'E-commerce', path: '/templates/ecommerce' },
          { label: 'Project Management', path: '/templates/project-management' },
          { label: 'Analytics Dashboard', path: '/templates/analytics-dashboard' },
          { label: 'Risk Management Dashboard', path: '/templates/risk-management' },
          { label: 'Document Management', path: '/templates/document-management' },
          { label: 'User Management', path: '/templates/user-management' },
          { label: 'Notifications', path: '/templates/notifications' },
        ],
      },
    ],
  },
  {
    key: 'How To',
    label: 'How To',
    icon: 'nx-help-circle',
    groups: [
      {
        links: [
          { label: 'Portfolio Gallery', path: '/how-to/portfolio-gallery' },
          { label: 'Buy Product', path: '/how-to/buy-product' },
          { label: 'Blog Post', path: '/how-to/blog-post' },
          { label: 'User Onboarding Flow', path: '/how-to/onboarding-flow' },
          { label: 'Multi-Step Signup Wizard', path: '/how-to/signup-wizard' },
          { label: 'Search & Filter Results', path: '/how-to/search-filter' },
          { label: 'File Manager', path: '/how-to/file-manager' },
          { label: 'Chat / Messaging UI', path: '/how-to/chat-messaging' },
          { label: 'Booking / Reservation Flow', path: '/how-to/booking-flow' },
          { label: 'Job Application Form', path: '/how-to/job-application' },
          { label: 'Support Ticket System', path: '/how-to/support-tickets' },
          { label: 'Real-time Notification Feed', path: '/how-to/notification-feed' },
          { label: 'Kanban Task Board', path: '/how-to/kanban-board' },
          { label: 'Subscription / Plan Comparison', path: '/how-to/plan-comparison' },
          { label: 'Media Player / Video Course', path: '/how-to/media-player' },
          { label: 'Notes App with Search & Categories', path: '/how-to/map-notes' },
        ],
      },
    ],
  },
  {
    key: 'Accessibility',
    label: 'Accessibility',
    icon: 'nx-accessibility',
    groups: [
      {
        links: [
          { label: 'WCAG', path: '/accessibility/wcag' },
          { label: 'Keyboard Navigation', path: '/accessibility/keyboard-navigation' },
          { label: 'Screen Readers', path: '/accessibility/screen-readers' },
          { label: 'Focus Management', path: '/accessibility/focus-management' },
          { label: 'ARIA', path: '/accessibility/aria' },
          { label: 'Color Contrast', path: '/accessibility/color-contrast' },
          { label: 'Accessibility Testing', path: '/accessibility/accessibility-testing' },
        ],
      },
    ],
  },
  {
    key: 'Internationalization',
    label: 'Internationalization',
    icon: 'nx-globe',
    groups: [
      {
        links: [
          { label: 'RTL Support', path: '/guide/rtl-support' },
          { label: 'Translation', path: '/translate' },
        ],
      },
    ],
  },
  {
    key: 'Testing',
    label: 'Testing',
    icon: 'nx-check-circle',
    groups: [
      {
        links: [
          { label: 'Unit Testing', path: '/testing/unit-testing' },
          { label: 'Component Testing', path: '/testing/component-testing' },
          { label: 'Accessibility Testing', path: '/testing/accessibility-testing' },
          { label: 'Visual Testing', path: '/testing/visual-testing' },
          { label: 'E2E Testing', path: '/testing/e2e-testing' },
        ],
      },
    ],
  },
  { key: 'Playground', label: 'Playground', icon: 'nx-fire', path: '/playground' },
  {
    key: 'API Reference',
    label: 'API Reference',
    icon: 'nx-book',
    groups: [
      {
        links: [
          { label: 'API Reference', path: '/developer/api-reference' },
          { label: 'Angular Compatibility', path: '/developer/angular-compatibility' },
          { label: 'TypeScript', path: '/developer/typescript' },
          { label: 'Configuration', path: '/developer/configuration' },
          { label: 'Theming API', path: '/developer/theming-api' },
          { label: 'Customization', path: '/developer/customization' },
          { label: 'SSR', path: '/developer/ssr' },
          { label: 'Troubleshooting', path: '/developer/troubleshooting' },
        ],
      },
    ],
  },
  { key: 'Utilities', label: 'Utilities', icon: 'nx-settings', path: '/developer/css-utilities' },
  { key: "What's New", label: "What's New", icon: 'nx-new', path: '/about/releases' },
  { key: 'Get PRO License', label: 'Get PRO License', icon: 'nx-gift', path: '/pro-upgrade', isNew: true },
  {
    key: 'About',
    label: 'About',
    icon: 'nx-info-circle',
    groups: [
      {
        links: [
          { label: 'Who We Are', path: '/about/who-we-are' },
          { label: 'Changelog', path: '/about/changelog' },
          { label: 'Roadmap', path: '/about/roadmap' },
          { label: 'Contributing', path: '/about/contributing' },
          { label: 'License', path: '/about/license' },
          { label: 'Contact', path: '/about/contact' },
        ],
      },
    ],
  },
];

/** Route paths (no leading slash, matching `Routes[].path`) gated behind a PRO license - derived from `isPro` links above. */
export const PRO_PATHS: ReadonlySet<string> = new Set(
  NAV_ITEMS.flatMap(
    (item) =>
      item.groups?.flatMap((group) =>
        group.links.filter((link) => link.isPro).map((link) => link.path.replace(/^\//, '')),
      ) ?? [],
  ),
);
