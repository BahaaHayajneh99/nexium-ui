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
  { label: 'Checkbox', path: '/checkbox', group: 'Components' },
  { label: 'Radio', path: '/radio', group: 'Components' },
  { label: 'Switch', path: '/switch', group: 'Components' },
  { label: 'Toggle', path: '/toggle', group: 'Components' },
  { label: 'Slider', path: '/slider', group: 'Components' },
  { label: 'DatePicker', path: '/datepicker', group: 'Components' },
  { label: 'DateRange Picker', path: '/date-range-picker', group: 'Components' },
  { label: 'TimePicker', path: '/time-picker', group: 'Components' },
  { label: 'Form Builder', path: '/form-builder', group: 'Components' },
  { label: 'Color Picker', path: '/color-picker', group: 'Components' },
  { label: 'Rich Text Editor', path: '/rich-text-editor', group: 'Components' },

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

  // ===== COMPONENTS - FEEDBACK =====
  { label: 'Alert', path: '/alert', group: 'Components' },
  { label: 'Message', path: '/message', group: 'Components' },
  { label: 'Toast', path: '/toast', group: 'Components' },
  { label: 'Notification', path: '/notification', group: 'Components' },
  { label: 'Tooltip', path: '/tooltip', group: 'Components' },
  { label: 'Popover', path: '/popover', group: 'Components' },
  { label: 'Modal', path: '/modal', group: 'Components' },
  { label: 'Dialog', path: '/dialog', group: 'Components' },
  { label: 'Drawer', path: '/drawer', group: 'Components' },
  { label: 'Result', path: '/result', group: 'Components' },
  { label: 'Empty State', path: '/empty-state', group: 'Components' },

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

  // ===== ABOUT =====
  { label: 'Who We Are', path: '/about/who-we-are', group: 'About' },
  { label: 'License', path: '/about/license', group: 'About' },
  { label: 'Contributing', path: '/about/contributing', group: 'About' },
];
