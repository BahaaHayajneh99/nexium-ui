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
    version: '0.1.7',
    date: 'Unreleased',
    changes: [
      { type: 'feature', description: 'Added a new Todo List component (NxTodoList) - a self-contained task list with adding, checking off and removing tasks built in, plus itemsChange/itemAdded/itemToggled/itemRemoved outputs to react to changes.' },
      // { type: 'feature', description: 'Added a "Reactive form (constructor DI)" example and a "Todo list (helper service + DI)" example to the Try It playground, demonstrating constructor-based dependency injection and a standalone @Injectable() service.' },
      // { type: 'improvement', description: 'Clarified in the Try It playground that helper functions, interfaces, enums and extra classes (including your own services) are fully supported above the component class - not just a single class.' },
      { type: 'feature', description: 'Added a new Back to Top component (NxBackToTop) - a smart scroll-to-top button that appears past a configurable scroll threshold, with an option to only show while scrolling up.' },
      { type: 'feature', description: 'Added a new Resizable component (NxResizable) - wrap any content in resize handles (right, bottom, or corner) with min/max size constraints and resize events.' },
      { type: 'feature', description: 'Added a new Unit Input component (NxUnitInput) - a numeric input with a prefix or suffix unit that is fully dynamic, driven entirely by a units list you supply (currency, weight, percentage, or anything else).' },
      { type: 'feature', description: 'Added a new Notes App component (NxNotesApp) - a complete notes app in one tag, with live search, category filtering and an add-note form, composed from Search, Chip, Card, Select and Empty State. Configurable via categories/notes inputs and notesChange/noteAdded/noteRemoved outputs.' },
      { type: 'feature', description: 'Added a "Notes App with Search & Categories" how-to page showing how to build the same app from individual components, alongside the new all-in-one NxNotesApp component.' },
      { type: 'feature', description: 'Added a real interactive map to the Notes App how-to page (Leaflet + OpenStreetMap, loaded from a CDN - no API key needed) - notes are pinned at a location, and clicking the map chooses where the next note goes.' },
      { type: 'improvement', description: 'Added a new nx-new icon, used to flag newly-added items in the nav.' },
    ],
  },
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
