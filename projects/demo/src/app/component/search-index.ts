export interface NxSearchItem {
  label: string;
  path?: string;
  group: string;
  type?: 'navigation' | 'action'; // 'action' for commands
  action?: () => void; // For action items
  icon?: string;
}

export const SEARCH_INDEX: NxSearchItem[] = [
  // ===== QUICK LINKS (Top Priority) =====
  { label: 'Playground', path: '/playground', group: 'Quick Links', icon: 'nx-fire' },
  // { label: 'Try It', path: '/try-it', group: 'Quick Links', icon: 'nx-edit' },
  { label: 'NPM Package', path: 'https://www.npmjs.com/package/nexium-ui', group: 'Quick Links', icon: 'nx-external-link' },
  { label: 'GitHub Repository', path: 'https://github.com/nexiumui/nexium-ui', group: 'Quick Links', icon: 'nx-github' },
  { label: 'Changelog', path: '/about/changelog', group: 'Quick Links', icon: 'nx-history' },
  { label: 'Roadmap', path: '/about/roadmap', group: 'Quick Links', icon: 'nx-map' },

  // ===== DOCUMENTATION =====
  { label: 'Getting Started', path: '/getting-started/introduction', group: 'Documentation' },
  { label: 'Installation', path: '/installation/requirements', group: 'Documentation' },
  { label: 'Quick Start', path: '/getting-started/quick-start', group: 'Documentation' },
  { label: 'Configuration', path: '/getting-started/configuration', group: 'Documentation' },
  { label: 'Migration Guide', path: '/getting-started/migration-guide', group: 'Documentation' },
  { label: 'Design System', path: '/design-system/overview', group: 'Documentation' },
  { label: 'Design Tokens', path: '/design-system/design-tokens', group: 'Documentation' },
  { label: 'Colors', path: '/guide/colors', group: 'Documentation' },
  { label: 'Typography', path: '/guide/typography', group: 'Documentation' },
  { label: 'Spacing', path: '/guide/spacing', group: 'Documentation' },
  { label: 'Theming', path: '/design-system/overview', group: 'Documentation' },
  { label: 'Accessibility', path: '/accessibility/wcag', group: 'Documentation' },
  { label: 'Internationalization', path: '/internationalization/i18n', group: 'Documentation' },
  { label: 'Icons', path: '/icons', group: 'Documentation' },

  // ===== COMPONENTS - FORMS =====
  { label: 'Button', path: '/button', group: 'Components' },
  { label: 'Input', path: '/input', group: 'Components' },
  { label: 'Textarea', path: '/textarea', group: 'Components' },
  { label: 'Select', path: '/select', group: 'Components' },
  { label: 'AutoComplete', path: '/autocomplete', group: 'Components' },
  { label: 'Combobox', path: '/combobox', group: 'Components' },
  { label: 'Checkbox', path: '/checkbox', group: 'Components' },
  { label: 'Radio', path: '/radio', group: 'Components' },
  { label: 'Switch', path: '/switch', group: 'Components' },
  { label: 'Toggle', path: '/toggle', group: 'Components' },
  { label: 'Segmented Control', path: '/segmented-control', group: 'Components' },
  { label: 'Slider', path: '/slider', group: 'Components' },
  { label: 'Mention', path: '/mention', group: 'Components' },
  { label: 'Formula Input', path: '/formula-input', group: 'Components' },
  { label: 'DatePicker', path: '/datepicker', group: 'Components' },
  { label: 'DateRange Picker', path: '/date-range-picker', group: 'Components' },
  { label: 'TimePicker', path: '/time-picker', group: 'Components' },
  { label: 'Form Builder', path: '/form-builder', group: 'Components' },
  { label: 'Color Picker', path: '/color-picker', group: 'Components' },
  { label: 'Rich Text Editor', path: '/rich-text-editor', group: 'Components' },
  { label: 'Unit Input', path: '/unit-input', group: 'Components' },

  // ===== COMPONENTS - DATA DISPLAY =====
  { label: 'Table', path: '/table', group: 'Components' },
  { label: 'List', path: '/list', group: 'Components' },
  { label: 'Chip', path: '/chip', group: 'Components' },
  { label: 'Badge', path: '/badge', group: 'Components' },
  { label: 'Tag', path: '/tag', group: 'Components' },
  { label: 'Avatar', path: '/avatar', group: 'Components' },
  { label: 'Icon', path: '/icon', group: 'Components' },
  { label: 'Timeline', path: '/timeline', group: 'Components' },
  { label: 'Tree', path: '/tree', group: 'Components' },
  { label: 'Progress Bar', path: '/progress-bar', group: 'Components' },
  { label: 'Spinner', path: '/spinner', group: 'Components' },
  { label: 'Skeleton', path: '/skeleton', group: 'Components' },
  { label: 'Statistic', path: '/statistic', group: 'Components' },
  { label: 'Key-Value List', path: '/key-value-list', group: 'Components' },
  { label: 'Todo List', path: '/todo-list', group: 'Components' },
  { label: 'Notes App', path: '/notes-app', group: 'Components' },

  // ===== COMPONENTS - FEEDBACK =====
  { label: 'Alert', path: '/alert', group: 'Components' },
  { label: 'Message', path: '/message', group: 'Components' },
  { label: 'Toast', path: '/toast', group: 'Components' },
  { label: 'Notification', path: '/notification', group: 'Components' },
  { label: 'Tooltip', path: '/tooltip', group: 'Components' },
  { label: 'Popover', path: '/popover', group: 'Components' },
  { label: 'Popover Menu', path: '/popover-menu', group: 'Components' },
  { label: 'Hover Card', path: '/hover-card', group: 'Components' },
  { label: 'Modal', path: '/modal', group: 'Components' },
  { label: 'Fullscreen Dialog', path: '/fullscreen-dialog', group: 'Components' },
  { label: 'Dialog', path: '/dialog', group: 'Components' },
  { label: 'Drawer', path: '/drawer', group: 'Components' },
  { label: 'Lightbox', path: '/lightbox', group: 'Components' },
  { label: 'Loading Overlay', path: '/loading-overlay', group: 'Components' },
  { label: 'Tour', path: '/tour', group: 'Components' },
  { label: 'Spotlight', path: '/spotlight', group: 'Components' },
  { label: 'Result', path: '/result', group: 'Components' },
  { label: 'Empty State', path: '/empty-state', group: 'Components' },
  { label: 'Loading', path: '/loading', group: 'Components' },
  { label: 'Loading Button', path: '/loading-button', group: 'Components' },
  { label: 'Status Indicator', path: '/status-indicator', group: 'Components' },
  { label: 'Error State', path: '/error-state', group: 'Components' },
  { label: 'Warning', path: '/warning', group: 'Components' },
  { label: 'Success', path: '/success', group: 'Components' },
  { label: 'Offline State', path: '/offline', group: 'Components' },
  { label: 'Connection Status', path: '/connection-status', group: 'Components' },
  { label: 'Not Found', path: '/not-found', group: 'Components' },
  { label: 'Permission Denied', path: '/permission-denied', group: 'Components' },
  { label: 'Maintenance State', path: '/maintenance-state', group: 'Components' },
  { label: 'Unsaved Changes Dialog', path: '/unsaved-changes-dialog', group: 'Components' },

  // ===== COMPONENTS - PANELS =====
  { label: 'Accordion', path: '/accordion', group: 'Components' },
  { label: 'Tabs', path: '/tabs', group: 'Components' },
  { label: 'Collapse', path: '/collapse', group: 'Components' },
  { label: 'Panel', path: '/panel', group: 'Components' },
  { label: 'Card', path: '/card', group: 'Components' },

  // ===== COMPONENTS - NAVIGATION =====
  { label: 'Breadcrumb', path: '/breadcrumb', group: 'Components' },
  { label: 'Pagination', path: '/pagination', group: 'Components' },
  { label: 'Stepper', path: '/stepper', group: 'Components' },
  { label: 'Sidebar', path: '/sidebar', group: 'Components' },
  { label: 'Menu', path: '/menu', group: 'Components' },
  { label: 'Navbar', path: '/navbar', group: 'Components' },
  { label: 'Back to Top', path: '/back-to-top', group: 'Components' },
  { label: 'Resizable', path: '/layout/resizable', group: 'Components' },

  // ===== COMPONENTS - UPLOADS & MEDIA =====
  { label: 'File Upload', path: '/file-upload', group: 'Components' },
  { label: 'Image Upload', path: '/image-upload', group: 'Components' },
  { label: 'Video Upload', path: '/video-upload', group: 'Components' },
  { label: 'Gallery', path: '/gallery', group: 'Components' },
  { label: 'Carousel', path: '/carousel', group: 'Components' },

  // ===== PATTERNS & HOW-TO =====
  { label: 'Authentication Pattern', path: '/patterns/authentication', group: 'Patterns' },
  { label: 'CRUD Operations', path: '/patterns/crud', group: 'Patterns' },
  { label: 'Search & Filter', path: '/patterns/search-filter', group: 'Patterns' },
  { label: 'Dashboard', path: '/patterns/dashboard', group: 'Patterns' },
  { label: 'Data Management', path: '/patterns/data-management', group: 'Patterns' },
  { label: 'User Management', path: '/patterns/user-management', group: 'Patterns' },
  { label: 'Error Handling', path: '/patterns/error-handling', group: 'Patterns' },
  { label: 'Notes App with Search & Categories', path: '/how-to/map-notes', group: 'Patterns' },

  // ===== TESTING & QUALITY =====
  { label: 'Unit Testing', path: '/testing/unit-testing', group: 'Testing' },
  { label: 'Component Testing', path: '/testing/component-testing', group: 'Testing' },
  { label: 'E2E Testing', path: '/testing/e2e-testing', group: 'Testing' },
  { label: 'Visual Testing', path: '/testing/visual-testing', group: 'Testing' },

  // ===== CHARTS =====
  { label: 'Bar Chart', path: '/charts/bar', group: 'Charts' },
  { label: 'Line Chart', path: '/charts/line', group: 'Charts' },
  { label: 'Pie Chart', path: '/charts/pie', group: 'Charts' },
  { label: 'Area Chart', path: '/charts/area', group: 'Charts' },

  // ===== MISC / APP META =====
  { label: 'Address Input', path: '/address-input', group: 'Components' },
  { label: 'Filter Chip Group', path: '/filter-chip-group', group: 'Components' },
  { label: 'Color Contrast Checker', path: '/color-contrast-checker', group: 'Components' },
  { label: 'Version Badge', path: '/version-badge', group: 'Components' },
  { label: 'Changelog Widget', path: '/changelog-widget', group: 'Components' },
  { label: 'Feature Flag', path: '/directives/feature-flag', group: 'Components' },
  { label: 'Permission Gate', path: '/directives/permission-gate', group: 'Components' },
  { label: 'Activity Timeline', path: '/activity-timeline', group: 'Components' },
  { label: 'Activity Feed', path: '/activity-feed', group: 'Components' },
  { label: 'Audit Timeline', path: '/audit-timeline', group: 'Components' },

  // ===== DEVELOPER & CONTENT DISPLAY =====
  { label: 'Code Block', path: '/code-block', group: 'Components' },
  { label: 'Copyable Text', path: '/copyable-text', group: 'Components' },
  { label: 'Keyboard Shortcut', path: '/keyboard-shortcut', group: 'Components' },
  { label: 'JSON Viewer', path: '/json-viewer', group: 'Components' },
  { label: 'Diff Viewer', path: '/diff-viewer', group: 'Components' },
  { label: 'Before / After', path: '/before-after', group: 'Components' },
  { label: 'JSON Editor', path: '/json-editor', group: 'Components' },

  // ===== NAVIGATION & LAYOUT =====
  { label: 'Navigation Rail', path: '/navigation-rail', group: 'Components' },
  { label: 'Back Button', path: '/back-button', group: 'Components' },
  { label: 'Nav Group', path: '/nav-group', group: 'Components' },
  { label: 'Command Bar', path: '/command-bar', group: 'Components' },
  { label: 'Navigation Progress', path: '/navigation-progress', group: 'Components' },
  { label: 'App Shell', path: '/layout/app-shell', group: 'Components' },
  { label: 'Page Header', path: '/layout/page-header', group: 'Components' },
  { label: 'Page Actions', path: '/layout/page-actions', group: 'Components' },
  { label: 'Responsive Preview', path: '/layout/responsive-preview', group: 'Components' },
  { label: 'Device Frame', path: '/layout/device-frame', group: 'Components' },
  { label: 'Layout Preview', path: '/layout/layout-preview', group: 'Components' },

  // ===== ADVANCED INTERACTION =====
  { label: 'Virtual Scroll', path: '/virtual-scroll', group: 'Components' },
  { label: 'Sortable List', path: '/sortable-list', group: 'Components' },
  { label: 'Kanban Board', path: '/kanban', group: 'Components' },
  { label: 'Resizable Panels', path: '/resizable-panels', group: 'Components' },
  { label: 'Column Selector', path: '/column-selector', group: 'Components' },
  { label: 'Filter Builder', path: '/filter-builder', group: 'Components' },
  { label: 'Query Builder', path: '/query-builder', group: 'Components' },
  { label: 'Drag & Drop', path: '/directives/drag-drop', group: 'Components' },
  { label: 'Infinite Scroll', path: '/directives/infinite-scroll', group: 'Components' },

  // ===== COLLABORATION & ACTIVITY =====
  { label: 'Chat', path: '/chat', group: 'Components' },
  { label: 'Command History', path: '/command-history', group: 'Components' },
  { label: 'Version Timeline', path: '/version-timeline', group: 'Components' },
  { label: 'Audit Log', path: '/audit-log', group: 'Components' },

  // ===== DESIGN TOOLS =====
  { label: 'Color Gradient', path: '/design-tools/color-gradient', group: 'Components' },
  { label: 'Color Gradient Editor', path: '/design-tools/color-gradient-editor', group: 'Components' },
  { label: 'Shadow Editor', path: '/design-tools/shadow-editor', group: 'Components' },
  { label: 'Border Editor', path: '/design-tools/border-editor', group: 'Components' },
  { label: 'Transform Editor', path: '/design-tools/transform-editor', group: 'Components' },
  { label: 'Spacing Editor', path: '/design-tools/spacing-editor', group: 'Components' },
  { label: 'Property Editor', path: '/design-tools/property-editor', group: 'Components' },
  { label: 'Theme Editor', path: '/design-tools/theme-editor', group: 'Components' },

  // ===== DASHBOARD =====
  { label: 'Metric Card', path: '/dashboard/metric-card', group: 'Components' },
  { label: 'Metric Grid', path: '/dashboard/metric-grid', group: 'Components' },
  { label: 'Sparkline Card', path: '/dashboard/sparkline-card', group: 'Components' },
  { label: 'KPI Card', path: '/dashboard/kpi-card', group: 'Components' },
  { label: 'Comparison Card', path: '/dashboard/comparison-card', group: 'Components' },
  { label: 'Goal Progress', path: '/dashboard/goal-progress', group: 'Components' },
  { label: 'Ranking List', path: '/dashboard/ranking-list', group: 'Components' },
  { label: 'Leaderboard', path: '/dashboard/leaderboard', group: 'Components' },
  { label: 'Statistic Group', path: '/dashboard/statistic-group', group: 'Components' },
  { label: 'Dashboard Widget', path: '/dashboard/dashboard-widget', group: 'Components' },

  // ===== DEVELOPER TOOLS =====
  { label: 'HTTP Status', path: '/devtools/http-status', group: 'Components' },
  { label: 'Environment Switcher', path: '/devtools/environment-switcher', group: 'Components' },
  { label: 'Terminal', path: '/devtools/terminal', group: 'Components' },
  { label: 'Log Viewer', path: '/devtools/log-viewer', group: 'Components' },
  { label: 'API Response Viewer', path: '/devtools/api-response-viewer', group: 'Components' },
  { label: 'Request Builder', path: '/devtools/request-builder', group: 'Components' },
  { label: 'Regex Tester', path: '/devtools/regex-tester', group: 'Components' },
  { label: 'Cron Builder', path: '/devtools/cron-builder', group: 'Components' },
  { label: 'Code Editor', path: '/devtools/code-editor', group: 'Components' },

  // ===== ENTERPRISE / PRO =====
  { label: 'Advanced Data Grid', path: '/enterprise/advanced-data-grid', group: 'Components' },
  { label: 'Scheduler', path: '/enterprise/scheduler', group: 'Components' },
  { label: 'Gantt Chart', path: '/enterprise/gantt-chart', group: 'Components' },
  { label: 'Permission Matrix', path: '/enterprise/permission-matrix', group: 'Components' },
  { label: 'Workflow Builder', path: '/enterprise/workflow-builder', group: 'Components' },

  // ===== ABOUT =====
  { label: 'Who We Are', path: '/about/who-we-are', group: 'About' },
  { label: 'License', path: '/about/license', group: 'About' },
  { label: 'Contributing', path: '/about/contributing', group: 'About' },
];
