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
    version: '0.1.8',
    date: '26-09-2026',
    changes: [
      { type: 'feature', description: 'Added a new Try It page - a live playground where you write a real Angular component (an HTML template plus a TypeScript class, including your own imports, helper functions/interfaces, and constructor or functional inject() dependency injection) and see it rendered instantly, compiled right in the browser.' },
      { type: 'feature', description: 'Added three new form components: Combobox (a searchable single-select dropdown that, unlike Autocomplete, always resolves to one of the listed options), Segmented Control (a compact connected-button alternative to Radio Group), and Formula Input (a single-line expression field with {{field}} token autocomplete, custom delimiters, and inline flagging of unknown references).' },
      { type: 'feature', description: 'Added seven new overlay/interaction components: Popover Menu, Hover Card, Lightbox, Fullscreen Dialog, Loading Overlay, Spotlight and Tour - covering full 8-way-placement floating menus, rich hover previews, a full-viewport image viewer, full-screen dialogs, section-blocking loading states, and guided onboarding (a single highlighted element, or a full multi-step walkthrough).' },
      { type: 'feature', description: 'Added a real Tree Table component (NxTreeTable) - hierarchical rows of any depth driven by an expandedIds list rather than hand-written nesting levels, with optional single-row selection and custom columns.' },
      { type: 'feature', description: 'Added new Feedback/Status pages: Loading (NxLoadingState, a full-section placeholder for an initial fetch), Loading Button (a loading input on NxButton itself), Status Indicator (NxStatusIndicator, a small colored dot with an optional pulse), Offline State and Connection Status (both NxConnectionStatus, which auto-detects via navigator.onLine or can be driven manually).' },
      { type: 'feature', description: 'Added NxBanner - a full-width, dismissible page-level announcement strip (info/success/warning/danger), for notices that span the whole page rather than one section.' },
      { type: 'feature', description: 'Added Error State, Warning and Success pages - rather than new components, these show the already-existing Result/Alert/Banner components used in that specific mode, so there\'s nothing duplicated.' },
      { type: 'feature', description: 'Added Not Found and Permission Denied - presets of nx-result with sensible 404/403 defaults (icon, title, description, action) that stay fully overridable, so there\'s nothing duplicated against Result itself.' },
      { type: 'feature', description: 'Added Maintenance State (NxMaintenanceState) - another nx-result preset, for a temporarily-unavailable page with an optional action (e.g. a status page link).' },
      { type: 'feature', description: 'Added Unsaved Changes Dialog (NxUnsavedChangesDialog) - a three-way confirmation (Save / Discard / Cancel) for leaving a form or editor with in-progress work, complementing nx-dialog\'s simple confirm/cancel case.' },
      { type: 'feature', description: 'Added a catch-all "**" wildcard route so any unmatched URL now renders a real 404 page (built on the new Not Found component) instead of a blank screen, with a link back to the homepage.' },
      { type: 'fix', description: 'Added Data Grid and Tree Table links to the sidebar navigation - both pages already existed but weren\'t reachable from the nav.' },
      { type: 'fix', description: 'Fixed Formula Input occasionally inserting a duplicated closing delimiter when picking a suggestion, by resolving the insertion point from the live cursor position instead of a value cached from the previous keystroke.' },
      { type: 'fix', description: 'Fixed Hover Card never opening, and Combobox/Popover Menu/Spotlight/Tour not reliably rendering position or state changes driven by a timer or async callback - the app runs zoneless, so these now explicitly notify change detection instead of relying on an unrelated click to happen to pick up the change.' },
      { type: 'fix', description: 'Fixed Connection Status not showing its "back online" flash when driven manually via the status input - only auto-detection got the reconnect animation before.' },
      { type: 'fix', description: 'Rebuilt the Data Grid demo page: it previously referenced an nx-data-grid component that never existed in the library. It\'s now backed by the real nx-table component, showcasing sorting, global search, pagination, row selection, inline editing and CSV export together on a realistic dataset.' },
      { type: 'fix', description: 'Rewrote the Tree Table demo page to use live, working examples of the new NxTreeTable component instead of static placeholder markup.' },
      { type: 'fix', description: 'Visitor tracking now also deduplicates by IP address, not just the per-browser id - clearing storage or opening a private window no longer counts the same visitor twice.' },
    ],
  },
  {
    version: '0.1.7',
    date: '14-09-2026',
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
    date: '07-09-2026',
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
