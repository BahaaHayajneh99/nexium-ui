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
import { NxEmptyState } from './data-display/ui-empty-state';
import { NxResult } from './data-display/ui-result';
import { NxNotFound } from './data-display/ui-not-found';
import { NxPermissionDenied } from './data-display/ui-permission-denied';
import { NxMaintenanceState } from './data-display/ui-maintenance-state';
import { NxLoadingState } from './data-display/ui-loading-state';
import { NxStatusIndicator } from './data-display/ui-status-indicator';
import { NxVersionBadge } from './data-display/ui-version-badge';
import { NxChangelogWidget } from './data-display/ui-changelog-widget';
import { NxActivityTimeline } from './data-display/ui-activity-timeline';
import { NxActivityFeed } from './data-display/ui-activity-feed';
import { NxAuditTimeline } from './data-display/ui-audit-timeline';
import { NxFilterChipGroup } from './data-display/ui-filter-chip-group';
import { NxColorContrastChecker } from './data-display/ui-color-contrast-checker';
import { NxIcon } from './data-display/ui-icon';
import { NxKeyValueList } from './data-display/ui-key-value-list';
import { NxTodoList } from './data-display/ui-todo-list';
import { NxNotesApp } from './data-display/ui-notes-app';
import { NxBackToTop } from './navigation/ui-back-to-top';
import { NxResizable } from './layout/ui-resizable';
import { NxUnitInput } from './forms/ui-unit-input';
import { NxAddressInput } from './forms/ui-address-input';
import { NxJsonEditor } from './forms/ui-json-editor';
import { NxList } from './data-display/ui-list';
import { NxProgressBarComponent } from './data-display/ui-progress-bar';
import { NxSkeleton } from './data-display/ui-skeleton';
import { NxSpinnerComponent } from './data-display/ui-spinner';
import { NxStatistic } from './data-display/ui-statistic';
import { NxTable } from './data-display/ui-table';
import { NxTag } from './data-display/ui-tag';
import { NxTimeline } from './data-display/ui-timeline';
import { NxTreeNode, NxTree } from './data-display/ui-tree';
import { NxTreeTable } from './data-display/ui-tree-table';
import { NxCodeBlock } from './data-display/ui-code-block';
import { NxCopyableText } from './data-display/ui-copyable-text';
import { NxKeyboardShortcut } from './data-display/ui-keyboard-shortcut';
import { NxJsonViewer } from './data-display/ui-json-viewer';
import { NxDiffViewer } from './data-display/ui-diff-viewer';
import { NxBeforeAfter } from './data-display/ui-before-after';
import { NxChat } from './data-display/ui-chat';
import { NxCommandHistory } from './data-display/ui-command-history';
import { NxVersionTimeline } from './data-display/ui-version-timeline';
import { NxAuditLog } from './data-display/ui-audit-log';
import { NxColorGradient } from './design-tools/ui-color-gradient';
import { NxColorGradientEditor } from './design-tools/ui-color-gradient-editor';
import { NxShadowEditor } from './design-tools/ui-shadow-editor';
import { NxBorderEditor } from './design-tools/ui-border-editor';
import { NxTransformEditor } from './design-tools/ui-transform-editor';
import { NxSpacingEditor } from './design-tools/ui-spacing-editor';
import { NxPropertyEditor } from './design-tools/ui-property-editor';
import { NxThemeEditor } from './design-tools/ui-theme-editor';
import { NxMetricCard } from './dashboard/ui-metric-card';
import { NxMetricGrid } from './dashboard/ui-metric-grid';
import { NxSparklineCard } from './dashboard/ui-sparkline-card';
import { NxKpiCard } from './dashboard/ui-kpi-card';
import { NxComparisonCard } from './dashboard/ui-comparison-card';
import { NxGoalProgress } from './dashboard/ui-goal-progress';
import { NxRankingList } from './dashboard/ui-ranking-list';
import { NxLeaderboard } from './dashboard/ui-leaderboard';
import { NxStatisticGroup } from './dashboard/ui-statistic-group';
import { NxDashboardWidget } from './dashboard/ui-dashboard-widget';
import { NxHttpStatus } from './devtools/ui-http-status';
import { NxEnvironmentSwitcher } from './devtools/ui-environment-switcher';
import { NxTerminal } from './devtools/ui-terminal';
import { NxLogViewer } from './devtools/ui-log-viewer';
import { NxApiResponseViewer } from './devtools/ui-api-response-viewer';
import { NxRequestBuilder } from './devtools/ui-request-builder';
import { NxRegexTester } from './devtools/ui-regex-tester';
import { NxCronBuilder } from './devtools/ui-cron-builder';
import { NxCodeEditor } from './devtools/ui-code-editor';

import { NxAlert } from './feedback/ui-alert';
import { NxBanner } from './feedback/ui-banner';
import { NxCommandPalette } from './feedback/ui-command-palette';
import { NxConnectionStatus } from './feedback/ui-connection-status';
import { NxUnsavedChangesDialog } from './feedback/ui-unsaved-changes-dialog';
import { NxDialog } from './feedback/ui-dialog';
import { NxDrawer } from './feedback/ui-drawer';
import { NxFullscreenDialog } from './feedback/ui-fullscreen-dialog';
import { NxHoverCard } from './feedback/ui-hover-card';
import { NxLightbox } from './feedback/ui-lightbox';
import { NxLoadingOverlay } from './feedback/ui-loading-overlay';
import { NxModal } from './feedback/ui-modal';
import { NxNotificationCenter } from './feedback/ui-notification-center';
import { NxPopover } from './feedback/ui-popover';
import { NxPopoverMenu } from './feedback/ui-popover-menu';
import { NxSpotlight } from './feedback/ui-spotlight';
import { NxToastContainer } from './feedback/ui-toast';
import { NxTooltip } from './feedback/ui-tooltip';
import { NxTour } from './feedback/ui-tour';

import { NxAutocomplete } from './forms/ui-autocomplete';
import { NxButton } from './forms/ui-button';
import { NxCheckbox } from './forms/ui-checkbox';
import { NxColorPicker } from './forms/ui-color-picker';
import { NxCombobox } from './forms/ui-combobox';
import { NxDateRangePicker } from './forms/ui-date-range-picker';
import { NxDatepicker } from './forms/ui-datepicker';
import { NxFormulaInput } from './forms/ui-formula-input';
import { NxInput } from './forms/ui-input';
import { NxMention } from './forms/ui-mention';
import { NxMask } from './forms/ui-mask';
import { NxNumber } from './forms/ui-number';
import { NxPassword } from './forms/ui-password';
import { NxOtpInput } from './forms/ui-otp-input';
import { NxRadioGroup } from './forms/ui-radio-group';
import { NxRating } from './forms/ui-rating';
import { NxRichTextEditor } from './forms/ui-rich-text-editor';
import { NxSegmentedControl } from './forms/ui-segmented-control';
import { NxSelect } from './forms/ui-select';
import { NxSearch } from './forms/ui-search';
import { NxSlider } from './forms/ui-slider';
import { NxSwitch } from './forms/ui-switch';
import { NxTextarea } from './forms/ui-textarea';
import { NxToggle } from './forms/ui-toggle';
import { NxTimePicker } from './forms/ui-time-picker';

import { NxFileUpload } from './uploads/ui-file-upload';

import { NxCarousel, NxCarouselSlideDirective } from './media/ui-carousel';
import { NxGallery } from './media/ui-gallery';
import { NxPreview } from './media/ui-preview';

import { NxSidebar, NxSidebarItemComponent } from './navigation/nx-sidebar';
import { NxBottomNavigation } from './navigation/ui-bottom-navigation';
import { NxNavigationRail } from './navigation/ui-navigation-rail';
import { NxBackButton } from './navigation/ui-back-button';
import { NxNavGroup } from './navigation/ui-nav-group';
import { NxCommandBar } from './navigation/ui-command-bar';
import { NxNavigationProgress } from './navigation/ui-navigation-progress';
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
import { NxAppShell } from './layout/ui-app-shell';
import { NxPageHeader } from './layout/ui-page-header';
import { NxPageActions } from './layout/ui-page-actions';
import { NxResponsivePreview } from './layout/ui-responsive-preview';
import { NxDeviceFrame } from './layout/ui-device-frame';
import { NxLayoutPreview } from './layout/ui-layout-preview';
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
import { NxFeatureFlag } from './directives/nx-feature-flag';
import { NxPermissionGate } from './directives/nx-permission-gate';
import { NxDateFormatPipe, NxTruncatePipe, NxFileSizePipe } from './pipes';

import { NxDraggable, NxDropZone } from './interaction/nx-drag-drop';
import { NxInfiniteScroll } from './interaction/nx-infinite-scroll';
import { NxVirtualScroll } from './interaction/ui-virtual-scroll';
import { NxSortableList } from './interaction/ui-sortable-list';
import { NxKanban } from './interaction/ui-kanban';
import { NxResizablePanels, NxResizablePanel } from './interaction/ui-resizable-panels';
import { NxColumnSelector } from './interaction/ui-column-selector';
import { NxFilterBuilder } from './interaction/ui-filter-builder';
import { NxQueryBuilder, NxQueryBuilderGroup } from './interaction/ui-query-builder';
import { NxProLocked } from './licensing/ui-pro-locked/ui-pro-locked';
import { NxPermissionMatrix } from './enterprise/ui-permission-matrix';
import { NxAdvancedDataGrid } from './enterprise/ui-advanced-data-grid';
import { NxGanttChart } from './enterprise/ui-gantt-chart';
import { NxScheduler } from './enterprise/ui-scheduler';
import { NxWorkflowBuilder } from './enterprise/ui-workflow-builder';

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
  NxEmptyState,
  NxResult,
  NxNotFound,
  NxPermissionDenied,
  NxMaintenanceState,
  NxLoadingState,
  NxStatusIndicator,
  NxVersionBadge,
  NxChangelogWidget,
  NxActivityTimeline,
  NxActivityFeed,
  NxAuditTimeline,
  NxFilterChipGroup,
  NxColorContrastChecker,
  NxIcon,
  NxKeyValueList,
  NxTodoList,
  NxNotesApp,
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
  NxTreeTable,
  NxCodeBlock,
  NxCopyableText,
  NxKeyboardShortcut,
  NxJsonViewer,
  NxDiffViewer,
  NxBeforeAfter,
  NxChat,
  NxCommandHistory,
  NxVersionTimeline,
  NxAuditLog,
  NxColorGradient,
  NxColorGradientEditor,
  NxShadowEditor,
  NxBorderEditor,
  NxTransformEditor,
  NxSpacingEditor,
  NxPropertyEditor,
  NxThemeEditor,
  NxMetricCard,
  NxMetricGrid,
  NxSparklineCard,
  NxKpiCard,
  NxComparisonCard,
  NxGoalProgress,
  NxRankingList,
  NxLeaderboard,
  NxStatisticGroup,
  NxDashboardWidget,
  NxHttpStatus,
  NxEnvironmentSwitcher,
  NxTerminal,
  NxLogViewer,
  NxApiResponseViewer,
  NxRequestBuilder,
  NxRegexTester,
  NxCronBuilder,
  NxCodeEditor,

  // Feedback
  NxAlert,
  NxBanner,
  NxCommandPalette,
  NxConnectionStatus,
  NxUnsavedChangesDialog,
  NxDialog,
  NxDrawer,
  NxFullscreenDialog,
  NxHoverCard,
  NxLightbox,
  NxLoadingOverlay,
  NxModal,
  NxNotificationCenter,
  NxPopover,
  NxPopoverMenu,
  NxSpotlight,
  NxToastContainer,
  NxTooltip,
  NxTour,

  // Forms
  NxAutocomplete,
  NxButton,
  NxCheckbox,
  NxColorPicker,
  NxCombobox,
  NxDateRangePicker,
  NxDatepicker,
  NxFormulaInput,
  NxInput,
  NxMention,
  NxMask,
  NxNumber,
  NxPassword,
  NxOtpInput,
  NxRadioGroup,
  NxRating,
  NxRichTextEditor,
  NxSegmentedControl,
  NxSelect,
  NxSearch,
  NxSlider,
  NxSwitch,
  NxTextarea,
  NxToggle,
  NxTimePicker,
  NxUnitInput,
  NxAddressInput,
  NxJsonEditor,

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
  NxBackToTop,
  NxNavigationRail,
  NxBackButton,
  NxNavGroup,
  NxCommandBar,
  NxNavigationProgress,

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
  NxResizable,
  NxAppShell,
  NxPageHeader,
  NxPageActions,
  NxResponsivePreview,
  NxDeviceFrame,
  NxLayoutPreview,

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
  NxFeatureFlag,
  NxPermissionGate,

  // Pipes
  NxDateFormatPipe,
  NxTruncatePipe,
  NxFileSizePipe,

  // Interaction
  NxDraggable,
  NxDropZone,
  NxInfiniteScroll,
  NxVirtualScroll,
  NxSortableList,
  NxKanban,
  NxResizablePanels,
  NxResizablePanel,
  NxColumnSelector,
  NxFilterBuilder,
  NxQueryBuilder,
  NxQueryBuilderGroup,
  NxProLocked,
  NxPermissionMatrix,
  NxAdvancedDataGrid,
  NxGanttChart,
  NxScheduler,
  NxWorkflowBuilder,
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
