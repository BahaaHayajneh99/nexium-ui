export interface NxSearchItem {
  label: string;
  path: string;
  group: string;
}

export const SEARCH_INDEX: NxSearchItem[] = [
  { label: 'Getting Started', path: '/getting-started', group: 'General' },
  { label: 'Icons', path: '/icons', group: 'General' },
  { label: 'Translate', path: '/translate', group: 'General' },

  { label: 'Introduction', path: '/guide/introduction', group: 'Guide' },
  { label: 'Installation', path: '/guide/installation', group: 'Guide' },
  { label: 'Theming', path: '/guide/theming', group: 'Guide' },
  { label: 'Accessibility', path: '/guide/accessibility', group: 'Guide' },

  { label: 'Button', path: '/button', group: 'Buttons' },

  { label: 'Table', path: '/table', group: 'Data Display' },
  { label: 'List', path: '/list', group: 'Data Display' },
  { label: 'Chip', path: '/chip', group: 'Data Display' },
  { label: 'Badge', path: '/badge', group: 'Data Display' },
  { label: 'Avatar', path: '/avatar', group: 'Data Display' },
  { label: 'Icon', path: '/icon', group: 'Data Display' },
  { label: 'Timeline', path: '/timeline', group: 'Data Display' },
  { label: 'Tree', path: '/tree', group: 'Data Display' },
  { label: 'Progress Bar', path: '/progress-bar', group: 'Data Display' },
  { label: 'Spinner', path: '/spinner', group: 'Data Display' },
  { label: 'Skeleton', path: '/skeleton', group: 'Data Display' },

  { label: 'Accordion', path: '/accordion', group: 'Panels' },
  { label: 'Tabs', path: '/tabs', group: 'Panels' },
  { label: 'Collapse', path: '/collapse', group: 'Panels' },
  { label: 'Panel', path: '/panel', group: 'Panels' },
  { label: 'Card', path: '/card', group: 'Panels' },

  { label: 'Alert', path: '/alert', group: 'Feedback' },
  { label: 'Tooltip', path: '/tooltip', group: 'Feedback' },
  { label: 'Popover', path: '/popover', group: 'Feedback' },
  { label: 'Modal', path: '/modal', group: 'Feedback' },
  { label: 'Toast', path: '/toast', group: 'Feedback' },
  { label: 'Dialog', path: '/dialog', group: 'Feedback' },

  { label: 'Input', path: '/input', group: 'Forms' },
  { label: 'Textarea', path: '/textarea', group: 'Forms' },
  { label: 'Select', path: '/select', group: 'Forms' },
  { label: 'AutoComplete', path: '/autocomplete', group: 'Forms' },
  { label: 'Checkbox', path: '/checkbox', group: 'Forms' },
  { label: 'Radio', path: '/radio', group: 'Forms' },
  { label: 'Switch', path: '/switch', group: 'Forms' },
  { label: 'Toggle', path: '/toggle', group: 'Forms' },
  { label: 'Slider', path: '/slider', group: 'Forms' },
  { label: 'DatePicker', path: '/datepicker', group: 'Forms' },
  { label: 'Form Builder', path: '/form-builder', group: 'Forms' },
  { label: 'Advanced Form Builder', path: '/form-builder-advanced', group: 'Forms' },

  { label: 'File Upload', path: '/file-upload', group: 'Uploads' },
  { label: 'Image Upload', path: '/image-upload', group: 'Uploads' },
  { label: 'Video Upload', path: '/video-upload', group: 'Uploads' },
  { label: 'Audio Upload', path: '/audio-upload', group: 'Uploads' },
  { label: 'Document Upload', path: '/document-upload', group: 'Uploads' },

  { label: 'Gallery', path: '/gallery', group: 'Media' },
  { label: 'Preview', path: '/preview', group: 'Media' },
  { label: 'Carousel', path: '/carousel', group: 'Media' },

  { label: 'Breadcrumb', path: '/breadcrumb', group: 'Navigation' },
  { label: 'Pagination', path: '/pagination', group: 'Navigation' },
  { label: 'Stepper', path: '/stepper', group: 'Navigation' },
  { label: 'Sidebar', path: '/sidebar', group: 'Navigation' },

  { label: 'Who We Are', path: '/about/who-we-are', group: 'About' },
  { label: 'Changelog', path: '/about/changelog', group: 'About' },
  { label: 'License', path: '/about/license', group: 'About' },
];
