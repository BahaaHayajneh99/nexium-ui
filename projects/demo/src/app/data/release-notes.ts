export type ReleaseChangeType = 'feature' | 'improvement' | 'fix';

export interface ReleaseChange {
  type: ReleaseChangeType;
  description: string;
}

export interface ReleaseNote {
  version: string;
  date: string;
  changes: ReleaseChange[];
}

/** Single source of truth for the Changelog and What's New pages - add new entries to the top. */
export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: '0.1.6',
    date: 'Unreleased',
    changes: [
      { type: 'feature', description: 'Added isRequired and pattern validation to form components (Input, Textarea, Select, Checkbox, Radio Group, Datepicker and more), with built-in Reactive Forms validator support.' },
      { type: 'feature', description: 'New components: Empty State, Result, Search (with a results dropdown), Time Picker, Date Range Picker, Number Input, Password Input and Input Mask.' },
      { type: 'feature', description: 'New pipes: nxDateFormat, nxTruncate and nxFileSize.' },
      { type: 'fix', description: 'Fixed the Masonry layout not responding to responsive column-count overrides.' },
      { type: 'fix', description: 'Fixed the Datepicker calendar icon never rendering because of an unsanitized innerHTML binding.' },
      { type: 'improvement', description: 'Converted every component in the library (and the demo app) from compile-time Sass variables to runtime CSS custom properties, so any consumer can theme components at runtime without rebuilding the package.' },
      { type: 'feature', description: 'Added a "What\'s New" page with a version picker to browse release notes by version.' },
      { type: 'fix', description: 'Replaced the Date Range Picker demo\'s "Display Variants" section with real, live examples instead of unsupported placeholder variants.' },
      { type: 'feature', description: 'Added a draggable input to File Upload - set it to false to restrict selection to click-to-browse only, disabling drag-and-drop.' },
      { type: 'improvement', description: 'File Upload\'s built-in file list now shows each file\'s size alongside its name.' },
      { type: 'improvement', description: 'Added Single File, Reacting to filesSelected and Click to Browse Only examples across all upload demos (File, Image, Video, Audio, Document), plus multi-image preview support for Image Upload.' },
      { type: 'fix', description: 'Fixed several design-system demo pages (Overview, Design Tokens, Shadows, Typography) where dropped or mistyped CSS selectors caused broken card layouts and unstyled text.' },
      { type: 'fix', description: 'Fixed the upload demo pages showing an internal build path instead of the public nexium-ui import in their code samples.' },
    ],
  },
  {
    version: '0.1.0',
    date: 'Unreleased',
    changes: [
      { type: 'feature', description: 'Initial set of data-display, forms, feedback, navigation, panels, media and upload components.' },
      { type: 'feature', description: 'Shared design-token system in variables.scss for colors, spacing, radius, typography and motion.' },
      { type: 'feature', description: 'Demo application showcasing every component with copyable HTML/TS snippets.' },
    ],
  },
];
