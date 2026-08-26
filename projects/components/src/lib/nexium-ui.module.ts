import { NgModule } from '@angular/core';

import { NxAvatar } from './data-display/ui-avatar';
import { NxBadge } from './data-display/ui-badge';
import {
  NxCard,
  NxCardImage,
  NxCardHeader,
  NxCardTitle,
  NxCardSubtitle,
  NxCardContent,
  NxCardActions,
  NxCardFooter,
} from './data-display/ui-card';
import { NxChip } from './data-display/ui-chip';
import { NxEmoji } from './data-display/ui-emoji';
import { NxIcon } from './data-display/ui-icon';
import { NxKeyValueList } from './data-display/ui-key-value-list';
import { NxList } from './data-display/ui-list';
import { NxProgressBarComponent } from './data-display/ui-progress-bar';
import { NxSkeleton } from './data-display/ui-skeleton';
import { NxSpinnerComponent } from './data-display/ui-spinner';
import { NxStatistic } from './data-display/ui-statistic';
import { NxTable } from './data-display/ui-table';
import { NxTag } from './data-display/ui-tag';
import { NxTimeline } from './data-display/ui-timeline';
import { NxTreeNode, NxTree } from './data-display/ui-tree';

import { NxAlert } from './feedback/ui-alert';
import { NxCommandPalette } from './feedback/ui-command-palette';
import { NxDialog } from './feedback/ui-dialog';
import { NxDrawer } from './feedback/ui-drawer';
import { NxModal } from './feedback/ui-modal';
import { NxNotificationCenter } from './feedback/ui-notification-center';
import { NxPopover } from './feedback/ui-popover';
import { NxToastContainer } from './feedback/ui-toast';
import { NxTooltip } from './feedback/ui-tooltip';

import { NxAutocomplete } from './forms/ui-autocomplete';
import { NxButton } from './forms/ui-button';
import { NxCheckbox } from './forms/ui-checkbox';
import { NxColorPicker } from './forms/ui-color-picker';
import { NxDatepicker } from './forms/ui-datepicker';
import { NxInput } from './forms/ui-input';
import { NxMention } from './forms/ui-mention';
import { NxOtpInput } from './forms/ui-otp-input';
import { NxRadioGroup } from './forms/ui-radio-group';
import { NxRating } from './forms/ui-rating';
import { NxRichTextEditor } from './forms/ui-rich-text-editor';
import { NxSelect } from './forms/ui-select';
import { NxSlider } from './forms/ui-slider';
import { NxSwitch } from './forms/ui-switch';
import { NxTextarea } from './forms/ui-textarea';
import { NxToggle } from './forms/ui-toggle';

import { NxFileUpload } from './uploads/ui-file-upload';

import { NxCarousel, NxCarouselSlideDirective } from './media/ui-carousel';
import { NxGallery } from './media/ui-gallery';
import { NxPreview } from './media/ui-preview';

import { NxSidebar, NxSidebarItemComponent } from './navigation/nx-sidebar';
import { NxBottomNavigation } from './navigation/ui-bottom-navigation';
import { NxBreadcrumb } from './navigation/ui-breadcrumb';
import { NxContextMenu } from './navigation/ui-context-menu';
import { NxDropdownMenu } from './navigation/ui-dropdown-menu';
import { NxMegaMenu } from './navigation/ui-mega-menu';
import { NxMenu } from './navigation/ui-menu';
import { NxMenubar } from './navigation/ui-menubar';
import { NxNavbar } from './navigation/ui-navbar';
import { NxPagination } from './navigation/ui-pagination';
import { NxStepper } from './navigation/ui-stepper';

import {
  NxAccordionComponent,
  NxAccordionContentComponent,
  NxAccordionHeaderComponent,
  NxAccordionItemComponent,
} from './panels/nx-accordion';
import { NxTabsComponent, NxTabComponent, NxTabLabelDirective } from './panels/nx-tabs';
import { NxCollapse } from './panels/ui-collapse';
import { NxPanel } from './panels/ui-panel';

import { NxAspectRatio } from './layout/ui-aspect-ratio';
import { NxContainer } from './layout/ui-container';
import { NxDivider } from './layout/ui-divider';
import { NxFlex } from './layout/ui-flex';
import { NxGrid, NxGridItem } from './layout/ui-grid';
import { NxMasonry } from './layout/ui-masonry';
import { NxSpacer } from './layout/ui-spacer';
import { NxSplitter } from './layout/ui-splitter';
import { NxStack } from './layout/ui-stack';

import { NxAreaChart } from './charts/ui-area-chart';
import { NxBarChart } from './charts/ui-bar-chart';
import { NxBubbleChart } from './charts/ui-bubble-chart';
import { NxFunnelChart } from './charts/ui-funnel-chart';
import { NxGaugeChart } from './charts/ui-gauge-chart';
import { NxHeatmapChart } from './charts/ui-heatmap-chart';
import { NxLineChart } from './charts/ui-line-chart';
import { NxMixedChart } from './charts/ui-mixed-chart';
import { NxPieChart } from './charts/ui-pie-chart';
import { NxRadarChart } from './charts/ui-radar-chart';
import { NxScatterChart } from './charts/ui-scatter-chart';
import { NxSparkline } from './charts/ui-sparkline';

import { NxClickOutside } from './directives/nx-click-outside';
import { NxAutofocus } from './directives/nx-autofocus';
import { NxCopyToClipboard } from './directives/nx-copy-to-clipboard';
import { NxLongPress } from './directives/nx-long-press';
import { NxDebounceClick } from './directives/nx-debounce-click';
import { NxHasPermission } from './directives/nx-has-permission';

// Every standalone component/directive the library ships, gathered in one
// place so NexiumUiModule (below) and anyone hand-rolling a similar aggregate
// stay in sync with a single source of truth.
const NEXIUM_UI_DECLARATIONS = [
  // Data display
  NxAvatar,
  NxBadge,
  NxCard,
  NxCardImage,
  NxCardHeader,
  NxCardTitle,
  NxCardSubtitle,
  NxCardContent,
  NxCardActions,
  NxCardFooter,
  NxChip,
  NxEmoji,
  NxIcon,
  NxKeyValueList,
  NxList,
  NxProgressBarComponent,
  NxSkeleton,
  NxSpinnerComponent,
  NxStatistic,
  NxTable,
  NxTag,
  NxTimeline,
  NxTreeNode,
  NxTree,

  // Feedback
  NxAlert,
  NxCommandPalette,
  NxDialog,
  NxDrawer,
  NxModal,
  NxNotificationCenter,
  NxPopover,
  NxToastContainer,
  NxTooltip,

  // Forms
  NxAutocomplete,
  NxButton,
  NxCheckbox,
  NxColorPicker,
  NxDatepicker,
  NxInput,
  NxMention,
  NxOtpInput,
  NxRadioGroup,
  NxRating,
  NxRichTextEditor,
  NxSelect,
  NxSlider,
  NxSwitch,
  NxTextarea,
  NxToggle,

  // Uploads
  NxFileUpload,

  // Media
  NxCarousel,
  NxCarouselSlideDirective,
  NxGallery,
  NxPreview,

  // Navigation
  NxSidebar,
  NxSidebarItemComponent,
  NxBottomNavigation,
  NxBreadcrumb,
  NxContextMenu,
  NxDropdownMenu,
  NxMegaMenu,
  NxMenu,
  NxMenubar,
  NxNavbar,
  NxPagination,
  NxStepper,

  // Panels
  NxAccordionComponent,
  NxAccordionContentComponent,
  NxAccordionHeaderComponent,
  NxAccordionItemComponent,
  NxTabsComponent,
  NxTabComponent,
  NxTabLabelDirective,
  NxCollapse,
  NxPanel,

  // Layout
  NxAspectRatio,
  NxContainer,
  NxDivider,
  NxFlex,
  NxGrid,
  NxGridItem,
  NxMasonry,
  NxSpacer,
  NxSplitter,
  NxStack,

  // Charts
  NxAreaChart,
  NxBarChart,
  NxBubbleChart,
  NxFunnelChart,
  NxGaugeChart,
  NxHeatmapChart,
  NxLineChart,
  NxMixedChart,
  NxPieChart,
  NxRadarChart,
  NxScatterChart,
  NxSparkline,

  // Directives
  NxClickOutside,
  NxAutofocus,
  NxCopyToClipboard,
  NxLongPress,
  NxDebounceClick,
  NxHasPermission,
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
 * only `NxChip`, `NxButton`, etc. from 'nexium-ui' into your own standalone
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
