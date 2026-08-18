import { NgModule } from '@angular/core';

import { UiAvatar } from './data-display/ui-avatar';
import { UiBadge } from './data-display/ui-badge';
import {
  UiCard,
  UiCardImage,
  UiCardHeader,
  UiCardTitle,
  UiCardSubtitle,
  UiCardContent,
  UiCardActions,
  UiCardFooter,
} from './data-display/ui-card';
import { UiChip } from './data-display/ui-chip';
import { UiIcon } from './data-display/ui-icon';
import { UiKeyValueList } from './data-display/ui-key-value-list';
import { UiList } from './data-display/ui-list';
import { UiProgressBarComponent } from './data-display/ui-progress-bar';
import { NxSkeleton } from './data-display/ui-skeleton';
import { NxSpinnerComponent } from './data-display/ui-spinner';
import { UiStatistic } from './data-display/ui-statistic';
import { UiTable } from './data-display/ui-table';
import { UiTag } from './data-display/ui-tag';
import { UiTimeline } from './data-display/ui-timeline';
import { NxTreeNode, UiTree } from './data-display/ui-tree';

import { UiAlert } from './feedback/ui-alert';
import { UiCommandPalette } from './feedback/ui-command-palette';
import { UiDialog } from './feedback/ui-dialog';
import { UiDrawer } from './feedback/ui-drawer';
import { UiModal } from './feedback/ui-modal';
import { UiNotificationCenter } from './feedback/ui-notification-center';
import { UiPopover } from './feedback/ui-popover';
import { UiToastContainer } from './feedback/ui-toast';
import { NxTooltip } from './feedback/ui-tooltip';

import { UiAutocomplete } from './forms/ui-autocomplete';
import { UiButton } from './forms/ui-button';
import { UiCheckbox } from './forms/ui-checkbox';
import { UiColorPicker } from './forms/ui-color-picker';
import { UiDatepicker } from './forms/ui-datepicker';
import { UiInput } from './forms/ui-input';
import { UiMention } from './forms/ui-mention';
import { UiOtpInput } from './forms/ui-otp-input';
import { UiRadioGroup } from './forms/ui-radio-group';
import { UiRating } from './forms/ui-rating';
import { UiRichTextEditor } from './forms/ui-rich-text-editor';
import { UiSelect } from './forms/ui-select';
import { UiSlider } from './forms/ui-slider';
import { UiSwitch } from './forms/ui-switch';
import { UiTextarea } from './forms/ui-textarea';
import { UiToggle } from './forms/ui-toggle';

import { UiFileUpload } from './uploads/ui-file-upload';

import { UiCarousel, NxCarouselSlideDirective } from './media/ui-carousel';
import { UiGallery } from './media/ui-gallery';
import { UiPreview } from './media/ui-preview';

import { NxSidebar, NxSidebarItemComponent } from './navigation/nx-sidebar';
import { UiBottomNavigation } from './navigation/ui-bottom-navigation';
import { UiBreadcrumb } from './navigation/ui-breadcrumb';
import { UiContextMenu } from './navigation/ui-context-menu';
import { UiDropdownMenu } from './navigation/ui-dropdown-menu';
import { UiMegaMenu } from './navigation/ui-mega-menu';
import { UiMenu } from './navigation/ui-menu';
import { UiMenubar } from './navigation/ui-menubar';
import { UiNavbar } from './navigation/ui-navbar';
import { UiPagination } from './navigation/ui-pagination';
import { UiStepper } from './navigation/ui-stepper';

import {
  NxAccordionComponent,
  NxAccordionContentComponent,
  NxAccordionHeaderComponent,
  NxAccordionItemComponent,
} from './panels/nx-accordion';
import { NxTabsComponent, NxTabComponent, NxTabLabelDirective } from './panels/nx-tabs';
import { UiCollapse } from './panels/ui-collapse';
import { UiPanel } from './panels/ui-panel';

import { UiAspectRatio } from './layout/ui-aspect-ratio';
import { UiContainer } from './layout/ui-container';
import { UiDivider } from './layout/ui-divider';
import { UiFlex } from './layout/ui-flex';
import { UiGrid, UiGridItem } from './layout/ui-grid';
import { UiMasonry } from './layout/ui-masonry';
import { UiSpacer } from './layout/ui-spacer';
import { UiSplitter } from './layout/ui-splitter';
import { UiStack } from './layout/ui-stack';

import { UiAreaChart } from './charts/ui-area-chart';
import { UiBarChart } from './charts/ui-bar-chart';
import { UiBubbleChart } from './charts/ui-bubble-chart';
import { UiFunnelChart } from './charts/ui-funnel-chart';
import { UiGaugeChart } from './charts/ui-gauge-chart';
import { UiHeatmapChart } from './charts/ui-heatmap-chart';
import { UiLineChart } from './charts/ui-line-chart';
import { UiMixedChart } from './charts/ui-mixed-chart';
import { UiPieChart } from './charts/ui-pie-chart';
import { UiRadarChart } from './charts/ui-radar-chart';
import { UiScatterChart } from './charts/ui-scatter-chart';
import { UiSparkline } from './charts/ui-sparkline';

// Every standalone component/directive the library ships, gathered in one
// place so NexiumUiModule (below) and anyone hand-rolling a similar aggregate
// stay in sync with a single source of truth.
const NEXIUM_UI_DECLARATIONS = [
  // Data display
  UiAvatar,
  UiBadge,
  UiCard,
  UiCardImage,
  UiCardHeader,
  UiCardTitle,
  UiCardSubtitle,
  UiCardContent,
  UiCardActions,
  UiCardFooter,
  UiChip,
  UiIcon,
  UiKeyValueList,
  UiList,
  UiProgressBarComponent,
  NxSkeleton,
  NxSpinnerComponent,
  UiStatistic,
  UiTable,
  UiTag,
  UiTimeline,
  NxTreeNode,
  UiTree,

  // Feedback
  UiAlert,
  UiCommandPalette,
  UiDialog,
  UiDrawer,
  UiModal,
  UiNotificationCenter,
  UiPopover,
  UiToastContainer,
  NxTooltip,

  // Forms
  UiAutocomplete,
  UiButton,
  UiCheckbox,
  UiColorPicker,
  UiDatepicker,
  UiInput,
  UiMention,
  UiOtpInput,
  UiRadioGroup,
  UiRating,
  UiRichTextEditor,
  UiSelect,
  UiSlider,
  UiSwitch,
  UiTextarea,
  UiToggle,

  // Uploads
  UiFileUpload,

  // Media
  UiCarousel,
  NxCarouselSlideDirective,
  UiGallery,
  UiPreview,

  // Navigation
  NxSidebar,
  NxSidebarItemComponent,
  UiBottomNavigation,
  UiBreadcrumb,
  UiContextMenu,
  UiDropdownMenu,
  UiMegaMenu,
  UiMenu,
  UiMenubar,
  UiNavbar,
  UiPagination,
  UiStepper,

  // Panels
  NxAccordionComponent,
  NxAccordionContentComponent,
  NxAccordionHeaderComponent,
  NxAccordionItemComponent,
  NxTabsComponent,
  NxTabComponent,
  NxTabLabelDirective,
  UiCollapse,
  UiPanel,

  // Layout
  UiAspectRatio,
  UiContainer,
  UiDivider,
  UiFlex,
  UiGrid,
  UiGridItem,
  UiMasonry,
  UiSpacer,
  UiSplitter,
  UiStack,

  // Charts
  UiAreaChart,
  UiBarChart,
  UiBubbleChart,
  UiFunnelChart,
  UiGaugeChart,
  UiHeatmapChart,
  UiLineChart,
  UiMixedChart,
  UiPieChart,
  UiRadarChart,
  UiScatterChart,
  UiSparkline,
] as const;

/**
 * Aggregates every NexaUI standalone component/directive into a single
 * NgModule, for apps that still assemble their feature modules the
 * `@NgModule({ imports: [...] })` way rather than importing each standalone
 * component individually:
 *
 * ```ts
 * import { NexiumUiModule } from 'nexium-ui';
 *
 * @NgModule({ imports: [NexiumUiModule] })
 * export class AppModule {}
 * ```
 *
 * Standalone components/directives can be used directly instead — import
 * only `UiChip`, `UiButton`, etc. from 'nexium-ui' into your own standalone
 * component's `imports` array — which keeps bundles smaller since unused
 * components get tree-shaken. Reach for NexiumUiModule when you want the
 * whole library available at once, or your app hasn't migrated off
 * NgModules yet.
 */
@NgModule({
  imports: [...NEXIUM_UI_DECLARATIONS],
  exports: [...NEXIUM_UI_DECLARATIONS],
})
export class NexiumUiModule {}
