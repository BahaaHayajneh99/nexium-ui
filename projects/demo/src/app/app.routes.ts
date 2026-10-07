import { Routes } from '@angular/router';
import { NotFoundPage } from './not-found-page/not-found-page';
import { ShowcaseLayout } from './showcase/showcase-layout/showcase-layout';
import { ShowcaseIndex } from './showcase/showcase-index/showcase-index';
import { ShowcaseDashboard } from './showcase/showcase-dashboard/showcase-dashboard';
import { ShowcaseAnalytics } from './showcase/showcase-analytics/showcase-analytics';
import { ShowcaseOrders } from './showcase/showcase-orders/showcase-orders';
import { ShowcaseCustomers } from './showcase/showcase-customers/showcase-customers';
import { ShowcaseInvoices } from './showcase/showcase-invoices/showcase-invoices';
import { ShowcaseProjects } from './showcase/showcase-projects/showcase-projects';
import { ShowcaseTeam } from './showcase/showcase-team/showcase-team';
import { ShowcaseSettings } from './showcase/showcase-settings/showcase-settings';
import { ShowcaseMarketing } from './showcase/showcase-marketing/showcase-marketing';
import { ShowcaseEcommerce } from './showcase/showcase-ecommerce/showcase-ecommerce';
import { ShowcaseSupport } from './showcase/showcase-support/showcase-support';
import { ShowcaseCrm } from './showcase/showcase-crm/showcase-crm';
import { ShowcaseBooking } from './showcase/showcase-booking/showcase-booking';
import { ShowcaseLms } from './showcase/showcase-lms/showcase-lms';
import { ShowcaseRealestate } from './showcase/showcase-realestate/showcase-realestate';
import { ShowcaseJobs } from './showcase/showcase-jobs/showcase-jobs';
import { ShowcaseEvents } from './showcase/showcase-events/showcase-events';
import { ShowcaseRecipes } from './showcase/showcase-recipes/showcase-recipes';
import { ProUpgrade } from './pro-upgrade/pro-upgrade';
import { UiPermissionMatrixDemo } from './ui-permission-matrix-demo/ui-permission-matrix-demo';
import { UiPivotTableDemo } from './ui-pivot-table-demo/ui-pivot-table-demo';
import { UiEmailTemplateBuilderDemo } from './ui-email-template-builder-demo/ui-email-template-builder-demo';
import { UiFileManagerDemo } from './ui-file-manager-demo/ui-file-manager-demo';
import { UiSpreadsheetDemo } from './ui-spreadsheet-demo/ui-spreadsheet-demo';
import { UiAdvancedDataGridDemo } from './ui-advanced-data-grid-demo/ui-advanced-data-grid-demo';
import { UiGanttChartDemo } from './ui-gantt-chart-demo/ui-gantt-chart-demo';
import { UiSchedulerDemo } from './ui-scheduler-demo/ui-scheduler-demo';
import { UiWorkflowBuilderDemo } from './ui-workflow-builder-demo/ui-workflow-builder-demo';
import { UiHttpStatusDemo } from './ui-http-status-demo/ui-http-status-demo';
import { UiEnvironmentSwitcherDemo } from './ui-environment-switcher-demo/ui-environment-switcher-demo';
import { UiTerminalDemo } from './ui-terminal-demo/ui-terminal-demo';
import { UiLogViewerDemo } from './ui-log-viewer-demo/ui-log-viewer-demo';
import { UiApiResponseViewerDemo } from './ui-api-response-viewer-demo/ui-api-response-viewer-demo';
import { UiRequestBuilderDemo } from './ui-request-builder-demo/ui-request-builder-demo';
import { UiRegexTesterDemo } from './ui-regex-tester-demo/ui-regex-tester-demo';
import { UiCronBuilderDemo } from './ui-cron-builder-demo/ui-cron-builder-demo';
import { UiCalculatorDemo } from './ui-calculator-demo/ui-calculator-demo';
import { UiImageCropperDemo } from './ui-image-cropper-demo/ui-image-cropper-demo';
import { UiSignaturePadDemo } from './ui-signature-pad-demo/ui-signature-pad-demo';
import { UiTransferBoxDemo } from './ui-transfer-box-demo/ui-transfer-box-demo';
import { UiTagInputDemo } from './ui-tag-input-demo/ui-tag-input-demo';
import { UiVirtualGridDemo } from './ui-virtual-grid-demo/ui-virtual-grid-demo';
import { UiContributionGraphDemo } from './ui-contribution-graph-demo/ui-contribution-graph-demo';
import { UiTreeSelectDemo } from './ui-tree-select-demo/ui-tree-select-demo';
import { UiBottomSheetDemo } from './ui-bottom-sheet-demo/ui-bottom-sheet-demo';
import { UiFabDemo } from './ui-fab-demo/ui-fab-demo';
import { UiTableOfContentsDemo } from './ui-table-of-contents-demo/ui-table-of-contents-demo';
import { UiCookieBannerDemo } from './ui-cookie-banner-demo/ui-cookie-banner-demo';
import { UiPromptInputDemo } from './ui-prompt-input-demo/ui-prompt-input-demo';
import { UiChatStreamDemo } from './ui-chat-stream-demo/ui-chat-stream-demo';
import { UiTokenCounterDemo } from './ui-token-counter-demo/ui-token-counter-demo';
import { UiModelSelectorDemo } from './ui-model-selector-demo/ui-model-selector-demo';
import { UiMarkdownCodeRunnerDemo } from './ui-markdown-code-runner-demo/ui-markdown-code-runner-demo';
import { UiDropzoneDemo } from './ui-dropzone-demo/ui-dropzone-demo';
import { UiSankeyChartDemo } from './ui-sankey-chart-demo/ui-sankey-chart-demo';
import { UiTreemapDemo } from './ui-treemap-demo/ui-treemap-demo';
import { UiCandlestickChartDemo } from './ui-candlestick-chart-demo/ui-candlestick-chart-demo';
import { UiPolarAreaChartDemo } from './ui-polar-area-chart-demo/ui-polar-area-chart-demo';
import { UiSunburstChartDemo } from './ui-sunburst-chart-demo/ui-sunburst-chart-demo';
import { DirectiveInViewDemo } from './directive-in-view-demo/directive-in-view-demo';
import { DirectiveScrollLockDemo } from './directive-scroll-lock-demo/directive-scroll-lock-demo';
import { DirectiveFocusTrapDemo } from './directive-focus-trap-demo/directive-focus-trap-demo';
import { DirectiveHotkeyDemo } from './directive-hotkey-demo/directive-hotkey-demo';
import { UiCodeEditorDemo } from './ui-code-editor-demo/ui-code-editor-demo';
import { UiResponsivePreviewDemo } from './ui-responsive-preview-demo/ui-responsive-preview-demo';
import { UiDeviceFrameDemo } from './ui-device-frame-demo/ui-device-frame-demo';
import { UiLayoutPreviewDemo } from './ui-layout-preview-demo/ui-layout-preview-demo';
import { UiAddressInputDemo } from './ui-address-input-demo/ui-address-input-demo';
import { UiFilterChipGroupDemo } from './ui-filter-chip-group-demo/ui-filter-chip-group-demo';
import { UiColorContrastCheckerDemo } from './ui-color-contrast-checker-demo/ui-color-contrast-checker-demo';
import { UiVersionBadgeDemo } from './ui-version-badge-demo/ui-version-badge-demo';
import { UiChangelogWidgetDemo } from './ui-changelog-widget-demo/ui-changelog-widget-demo';
import { DirectiveFeatureFlagDemo } from './directive-feature-flag-demo/directive-feature-flag-demo';
import { DirectivePermissionGateDemo } from './directive-permission-gate-demo/directive-permission-gate-demo';
import { UiActivityTimelineDemo } from './ui-activity-timeline-demo/ui-activity-timeline-demo';
import { UiActivityFeedDemo } from './ui-activity-feed-demo/ui-activity-feed-demo';
import { UiAuditTimelineDemo } from './ui-audit-timeline-demo/ui-audit-timeline-demo';
import { UiVirtualScrollDemo } from './ui-virtual-scroll-demo/ui-virtual-scroll-demo';
import { UiSortableListDemo } from './ui-sortable-list-demo/ui-sortable-list-demo';
import { UiKanbanDemo } from './ui-kanban-demo/ui-kanban-demo';
import { UiResizablePanelsDemo } from './ui-resizable-panels-demo/ui-resizable-panels-demo';
import { UiColumnSelectorDemo } from './ui-column-selector-demo/ui-column-selector-demo';
import { UiFilterBuilderDemo } from './ui-filter-builder-demo/ui-filter-builder-demo';
import { UiQueryBuilderDemo } from './ui-query-builder-demo/ui-query-builder-demo';
import { DirectiveDragDropDemo } from './directive-drag-drop-demo/directive-drag-drop-demo';
import { DirectiveInfiniteScrollDemo } from './directive-infinite-scroll-demo/directive-infinite-scroll-demo';
import { UiChatDemo } from './ui-chat-demo/ui-chat-demo';
import { UiCommandHistoryDemo } from './ui-command-history-demo/ui-command-history-demo';
import { UiVersionTimelineDemo } from './ui-version-timeline-demo/ui-version-timeline-demo';
import { UiAuditLogDemo } from './ui-audit-log-demo/ui-audit-log-demo';
import { UiActivityExplorerDemo } from './ui-activity-explorer-demo/ui-activity-explorer-demo';
import { UiColorGradientDemo } from './ui-color-gradient-demo/ui-color-gradient-demo';
import { UiColorGradientEditorDemo } from './ui-color-gradient-editor-demo/ui-color-gradient-editor-demo';
import { UiShadowEditorDemo } from './ui-shadow-editor-demo/ui-shadow-editor-demo';
import { UiBorderEditorDemo } from './ui-border-editor-demo/ui-border-editor-demo';
import { UiTransformEditorDemo } from './ui-transform-editor-demo/ui-transform-editor-demo';
import { UiSpacingEditorDemo } from './ui-spacing-editor-demo/ui-spacing-editor-demo';
import { UiPropertyEditorDemo } from './ui-property-editor-demo/ui-property-editor-demo';
import { UiThemeEditorDemo } from './ui-theme-editor-demo/ui-theme-editor-demo';
import { UiColorTokenGeneratorDemo } from './ui-color-token-generator-demo/ui-color-token-generator-demo';
import { UiMetricCardDemo } from './ui-metric-card-demo/ui-metric-card-demo';
import { UiMetricGridDemo } from './ui-metric-grid-demo/ui-metric-grid-demo';
import { UiSparklineCardDemo } from './ui-sparkline-card-demo/ui-sparkline-card-demo';
import { UiKpiCardDemo } from './ui-kpi-card-demo/ui-kpi-card-demo';
import { UiComparisonCardDemo } from './ui-comparison-card-demo/ui-comparison-card-demo';
import { UiGoalProgressDemo } from './ui-goal-progress-demo/ui-goal-progress-demo';
import { UiRankingListDemo } from './ui-ranking-list-demo/ui-ranking-list-demo';
import { UiLeaderboardDemo } from './ui-leaderboard-demo/ui-leaderboard-demo';
import { UiStatisticGroupDemo } from './ui-statistic-group-demo/ui-statistic-group-demo';
import { UiDashboardWidgetDemo } from './ui-dashboard-widget-demo/ui-dashboard-widget-demo';
import { UiCodeBlockDemo } from './ui-code-block-demo/ui-code-block-demo';
import { UiCopyableTextDemo } from './ui-copyable-text-demo/ui-copyable-text-demo';
import { UiKeyboardShortcutDemo } from './ui-keyboard-shortcut-demo/ui-keyboard-shortcut-demo';
import { UiJsonViewerDemo } from './ui-json-viewer-demo/ui-json-viewer-demo';
import { UiDiffViewerDemo } from './ui-diff-viewer-demo/ui-diff-viewer-demo';
import { UiTextViewerDemo } from './ui-text-viewer-demo/ui-text-viewer-demo';
import { UiPdfViewerDemo } from './ui-pdf-viewer-demo/ui-pdf-viewer-demo';
import { UiWordViewerDemo } from './ui-word-viewer-demo/ui-word-viewer-demo';
import { UiExcelViewerDemo } from './ui-excel-viewer-demo/ui-excel-viewer-demo';
import { UiMarkdownViewerDemo } from './ui-markdown-viewer-demo/ui-markdown-viewer-demo';
import { UiTextStatisticsDemo } from './ui-text-statistics-demo/ui-text-statistics-demo';
import { UiBeforeAfterDemo } from './ui-before-after-demo/ui-before-after-demo';
import { UiJsonEditorDemo } from './ui-json-editor-demo/ui-json-editor-demo';
import { UiNavigationRailDemo } from './ui-navigation-rail-demo/ui-navigation-rail-demo';
import { UiBackButtonDemo } from './ui-back-button-demo/ui-back-button-demo';
import { UiNavGroupDemo } from './ui-nav-group-demo/ui-nav-group-demo';
import { UiCommandBarDemo } from './ui-command-bar-demo/ui-command-bar-demo';
import { UiNavigationProgressDemo } from './ui-navigation-progress-demo/ui-navigation-progress-demo';
import { UiAppShellDemo } from './ui-app-shell-demo/ui-app-shell-demo';
import { UiPageHeaderDemo } from './ui-page-header-demo/ui-page-header-demo';
import { UiPageActionsDemo } from './ui-page-actions-demo/ui-page-actions-demo';
import { GettingStartedDemo } from './getting-started-demo/getting-started-demo';
import { DirectiveClickOutsideDemo } from './directive-click-outside-demo/directive-click-outside-demo';
import { DirectiveAutofocusDemo } from './directive-autofocus-demo/directive-autofocus-demo';
import { DirectiveCopyToClipboardDemo } from './directive-copy-to-clipboard-demo/directive-copy-to-clipboard-demo';
import { DirectiveLongPressDemo } from './directive-long-press-demo/directive-long-press-demo';
import { DirectiveDebounceClickDemo } from './directive-debounce-click-demo/directive-debounce-click-demo';
import { DirectiveHasPermissionDemo } from './directive-has-permission-demo/directive-has-permission-demo';
import { UiButtonDemo } from './ui-button-demo/ui-button-demo';
import { UiCardDemo } from './ui-card-demo/ui-card-demo';
import { UiChipDemo } from './ui-chip-demo/ui-chip-demo';
import { UiProgressBarDemo } from './ui-progress-bar-demo/ui-progress-bar-demo';
import { UiSpinnerDemo } from './ui-spinner-demo/ui-spinner-demo';
import { UiSkeletonDemo } from './ui-skeleton-demo/ui-skeleton-demo';
import { UiAccordionDemo } from './ui-accordion-demo/ui-accordion-demo';
import { UiTabsDemo } from './ui-tabs-demo/ui-tabs-demo';
import { UiBadgeDemo } from './ui-badge-demo/ui-badge-demo';
import { UiIconDemo } from './ui-icon-demo/ui-icon-demo';
import { UiAvatarDemo } from './ui-avatar-demo/ui-avatar-demo';
import { UiTagDemo } from './ui-tag-demo/ui-tag-demo';
import { UiTableDemo } from './ui-table-demo/ui-table-demo';
import { UiListDemo } from './ui-list-demo/ui-list-demo';
import { UiTimelineDemo } from './ui-timeline-demo/ui-timeline-demo';
import { UiTreeDemo } from './ui-tree-demo/ui-tree-demo';
import { UiCollapseDemo } from './ui-collapse-demo/ui-collapse-demo';
import { UiPanelDemo } from './ui-panel-demo/ui-panel-demo';
import { UiTooltipDemo } from './ui-tooltip-demo/ui-tooltip-demo';
import { UiPopoverDemo } from './ui-popover-demo/ui-popover-demo';
import { UiModalDemo } from './ui-modal-demo/ui-modal-demo';
import { UiFullscreenDialogDemo } from './ui-fullscreen-dialog-demo/ui-fullscreen-dialog-demo';
import { UiPopoverMenuDemo } from './ui-popover-menu-demo/ui-popover-menu-demo';
import { UiHoverCardDemo } from './ui-hover-card-demo/ui-hover-card-demo';
import { UiLightboxDemo } from './ui-lightbox-demo/ui-lightbox-demo';
import { UiLoadingOverlayDemo } from './ui-loading-overlay-demo/ui-loading-overlay-demo';
import { UiSpotlightDemo } from './ui-spotlight-demo/ui-spotlight-demo';
import { UiTourDemo } from './ui-tour-demo/ui-tour-demo';
import { UiToastDemo } from './ui-toast-demo/ui-toast-demo';
import { UiDialogDemo } from './ui-dialog-demo/ui-dialog-demo';
import { UiAlertDemo } from './ui-alert-demo/ui-alert-demo';
import { UiLoadingDemo } from './ui-loading-demo/ui-loading-demo';
import { UiLoadingButtonDemo } from './ui-loading-button-demo/ui-loading-button-demo';
import { UiStatusIndicatorDemo } from './ui-status-indicator-demo/ui-status-indicator-demo';
import { UiErrorStateDemo } from './ui-error-state-demo/ui-error-state-demo';
import { UiNotFoundDemo } from './ui-not-found-demo/ui-not-found-demo';
import { UiPermissionDeniedDemo } from './ui-permission-denied-demo/ui-permission-denied-demo';
import { UiMaintenanceStateDemo } from './ui-maintenance-state-demo/ui-maintenance-state-demo';
import { UiUnsavedChangesDialogDemo } from './ui-unsaved-changes-dialog-demo/ui-unsaved-changes-dialog-demo';
import { UiWarningDemo } from './ui-warning-demo/ui-warning-demo';
import { UiSuccessDemo } from './ui-success-demo/ui-success-demo';
import { UiOfflineStateDemo } from './ui-offline-state-demo/ui-offline-state-demo';
import { UiConnectionStatusDemo } from './ui-connection-status-demo/ui-connection-status-demo';
import { UiInputDemo } from './ui-input-demo/ui-input-demo';
import { UiTextareaDemo } from './ui-textarea-demo/ui-textarea-demo';
import { UiSelectDemo } from './ui-select-demo/ui-select-demo';
import { UiAutocompleteDemo } from './ui-autocomplete-demo/ui-autocomplete-demo';
import { UiComboboxDemo } from './ui-combobox-demo/ui-combobox-demo';
import { UiCheckboxDemo } from './ui-checkbox-demo/ui-checkbox-demo';
import { UiRadioDemo } from './ui-radio-demo/ui-radio-demo';
import { UiSwitchDemo } from './ui-switch-demo/ui-switch-demo';
import { UiToggleDemo } from './ui-toggle-demo/ui-toggle-demo';
import { UiSegmentedControlDemo } from './ui-segmented-control-demo/ui-segmented-control-demo';
import { HowToPortfolioGalleryDemo } from './how-to-portfolio-gallery-demo/how-to-portfolio-gallery-demo';
import { HowToBuyProductDemo } from './how-to-buy-product-demo/how-to-buy-product-demo';
import { HowToBlogPostDemo } from './how-to-blog-post-demo/how-to-blog-post-demo';
import { HowToOnboardingFlowDemo } from './how-to-onboarding-flow-demo/how-to-onboarding-flow-demo';
import { HowToSignupWizardDemo } from './how-to-signup-wizard-demo/how-to-signup-wizard-demo';
import { HowToSearchFilterDemo } from './how-to-search-filter-demo/how-to-search-filter-demo';
import { HowToFileManagerDemo } from './how-to-file-manager-demo/how-to-file-manager-demo';
import { HowToChatMessagingDemo } from './how-to-chat-messaging-demo/how-to-chat-messaging-demo';
import { HowToBookingFlowDemo } from './how-to-booking-flow-demo/how-to-booking-flow-demo';
import { HowToJobApplicationDemo } from './how-to-job-application-demo/how-to-job-application-demo';
import { HowToSupportTicketsDemo } from './how-to-support-tickets-demo/how-to-support-tickets-demo';
import { HowToNotificationFeedDemo } from './how-to-notification-feed-demo/how-to-notification-feed-demo';
import { HowToKanbanBoardDemo } from './how-to-kanban-board-demo/how-to-kanban-board-demo';
import { HowToPlanComparisonDemo } from './how-to-plan-comparison-demo/how-to-plan-comparison-demo';
import { HowToMediaPlayerDemo } from './how-to-media-player-demo/how-to-media-player-demo';
import { UiSliderDemo } from './ui-slider-demo/ui-slider-demo';
import { UiDatepickerDemo } from './ui-datepicker-demo/ui-datepicker-demo';
import { UiCalendarDemo } from './ui-calendar-demo/ui-calendar-demo';
import { UiColorPickerDemo } from './ui-color-picker-demo/ui-color-picker-demo';
import { UiRatingDemo } from './ui-rating-demo/ui-rating-demo';
import { UiOtpInputDemo } from './ui-otp-input-demo/ui-otp-input-demo';
import { UiStatisticDemo } from './ui-statistic-demo/ui-statistic-demo';
import { UiKeyValueListDemo } from './ui-key-value-list-demo/ui-key-value-list-demo';
import { UiTodoListDemo } from './ui-todo-list-demo/ui-todo-list-demo';
import { UiNotesAppDemo } from './ui-notes-app-demo/ui-notes-app-demo';
import { UiPinnedListDemo } from './ui-pinned-list-demo/ui-pinned-list-demo';
import { UiBackToTopDemo } from './ui-back-to-top-demo/ui-back-to-top-demo';
import { UiResizableDemo } from './ui-resizable-demo/ui-resizable-demo';
import { UiUnitInputDemo } from './ui-unit-input-demo/ui-unit-input-demo';
import { HowToMapNotesDemo } from './how-to-map-notes-demo/how-to-map-notes-demo';
import { UiNotificationCenterDemo } from './ui-notification-center-demo/ui-notification-center-demo';
import { UiMentionDemo } from './ui-mention-demo/ui-mention-demo';
import { UiFormulaInputDemo } from './ui-formula-input-demo/ui-formula-input-demo';
import { UiRichTextEditorDemo } from './ui-rich-text-editor-demo/ui-rich-text-editor-demo';
import { UiMenuDemo } from './ui-menu-demo/ui-menu-demo';
import { UiDropdownMenuDemo } from './ui-dropdown-menu-demo/ui-dropdown-menu-demo';
import { UiContextMenuDemo } from './ui-context-menu-demo/ui-context-menu-demo';
import { UiMenubarDemo } from './ui-menubar-demo/ui-menubar-demo';
import { UiMegaMenuDemo } from './ui-mega-menu-demo/ui-mega-menu-demo';
import { UiNavbarDemo } from './ui-navbar-demo/ui-navbar-demo';
import { UiBottomNavigationDemo } from './ui-bottom-navigation-demo/ui-bottom-navigation-demo';
import { UiDrawerDemo } from './ui-drawer-demo/ui-drawer-demo';
import { UiCommandPaletteDemo } from './ui-command-palette-demo/ui-command-palette-demo';
import { UiFormBuilderDemo } from './ui-form-builder-demo/ui-form-builder-demo';
import { UiFormRendererDemo } from './ui-form-renderer-demo/ui-form-renderer-demo';
import { UiDataGridDemo } from './ui-data-grid-demo/ui-data-grid-demo';
import { UiColumnManagerDemo } from './ui-column-manager-demo/ui-column-manager-demo';
import { UiAdvancedFiltersDemo } from './ui-advanced-filters-demo/ui-advanced-filters-demo';
import { UiDocumentViewerDemo } from './ui-document-viewer-demo/ui-document-viewer-demo';
import { UiWidgetGridDemo } from './ui-widget-grid-demo/ui-widget-grid-demo';
import { UiDashboardBuilderDemo } from './ui-dashboard-builder-demo/ui-dashboard-builder-demo';
import { UiDashboardFiltersDemo } from './ui-dashboard-filters-demo/ui-dashboard-filters-demo';
import { UiImageEditorDemo } from './ui-image-editor-demo/ui-image-editor-demo';
import { UiPdfAnnotatorDemo } from './ui-pdf-annotator-demo/ui-pdf-annotator-demo';
import { UiDocumentScannerDemo } from './ui-document-scanner-demo/ui-document-scanner-demo';
import { UiAiChatDemo } from './ui-ai-chat-demo/ui-ai-chat-demo';
import { UiAiPromptBuilderDemo } from './ui-ai-prompt-builder-demo/ui-ai-prompt-builder-demo';
import { UiAiResponseViewerDemo } from './ui-ai-response-viewer-demo/ui-ai-response-viewer-demo';
import { UiAiTokenUsageDemo } from './ui-ai-token-usage-demo/ui-ai-token-usage-demo';
import { UiAiModelPlaygroundDemo } from './ui-ai-model-playground-demo/ui-ai-model-playground-demo';
import { FileUploadDemo } from './file-upload-demo/file-upload-demo';
import { ImageUploadDemo } from './image-upload-demo/image-upload-demo';
import { VideoUploadDemo } from './video-upload-demo/video-upload-demo';
import { AudioUploadDemo } from './audio-upload-demo/audio-upload-demo';
import { DocumentUploadDemo } from './document-upload-demo/document-upload-demo';
import { UiGalleryDemo } from './ui-gallery-demo/ui-gallery-demo';
import { UiPreviewDemo } from './ui-preview-demo/ui-preview-demo';
import { UiQrCodeDemo } from './ui-qr-code-demo/ui-qr-code-demo';
import { UiCarouselDemo } from './ui-carousel-demo/ui-carousel-demo';
import { UiBreadcrumbDemo } from './ui-breadcrumb-demo/ui-breadcrumb-demo';
import { UiPaginationDemo } from './ui-pagination-demo/ui-pagination-demo';
import { UiStepperDemo } from './ui-stepper-demo/ui-stepper-demo';
import { GuideIntroductionDemo } from './guide-introduction-demo/guide-introduction-demo';
import { GuideInstallationDemo } from './guide-installation-demo/guide-installation-demo';
import { GuideThemingDemo } from './guide-theming-demo/guide-theming-demo';
import { GuideAccessibilityDemo } from './guide-accessibility-demo/guide-accessibility-demo';
import { AboutWhoWeAreDemo } from './about-who-we-are-demo/about-who-we-are-demo';
import { AboutChangelogDemo } from './about-changelog-demo/about-changelog-demo';
import { AboutReleasesDemo } from './about-releases-demo/about-releases-demo';
import { AboutLicenseDemo } from './about-license-demo/about-license-demo';
import { AboutContactDemo } from './about-contact-demo/about-contact-demo';
import { PipesDemo } from './pipes-demo/pipes-demo';
import { IconsDemo } from './icons-demo/icons-demo';
import { EmojiDemo } from './emoji-demo/emoji-demo';
import { NxTranslateDemo } from './nx-translate-demo/nx-translate-demo';
import { NxSidebarDemo } from './nx-sidebar-demo/nx-sidebar-demo';
import { GuideColorsDemo } from './guide-colors-demo/guide-colors-demo';
import { GuideTypographyDemo } from './guide-typography-demo/guide-typography-demo';
import { GuideSpacingDemo } from './guide-spacing-demo/guide-spacing-demo';
import { GuideResponsiveDesignDemo } from './guide-responsive-design-demo/guide-responsive-design-demo';
import { GuideRtlSupportDemo } from './guide-rtl-support-demo/guide-rtl-support-demo';
import { InternationalizationI18nDemo } from './internationalization-i18n-demo/internationalization-i18n-demo';
import { InternationalizationLocalizationDemo } from './internationalization-localization-demo/internationalization-localization-demo';
import { InternationalizationDateNumberFormatsDemo } from './internationalization-date-number-formats-demo/internationalization-date-number-formats-demo';
import { TestingUnitTestingDemo } from './testing-unit-testing-demo/testing-unit-testing-demo';
import { TestingComponentTestingDemo } from './testing-component-testing-demo/testing-component-testing-demo';
import { TestingAccessibilityTestingDemo } from './testing-accessibility-testing-demo/testing-accessibility-testing-demo';
import { TestingVisualTestingDemo } from './testing-visual-testing-demo/testing-visual-testing-demo';
import { TestingE2eTestingDemo } from './testing-e2e-testing-demo/testing-e2e-testing-demo';
import { GuideFormsDemo } from './guide-forms-demo/guide-forms-demo';
import { AboutRoadmapDemo } from './about-roadmap-demo/about-roadmap-demo';
import { GettingStartedIntroductionDemo } from './getting-started-introduction-demo/getting-started-introduction-demo';
import { GettingStartedQuickStartDemo } from './getting-started-quick-start-demo/getting-started-quick-start-demo';
import { GettingStartedConfigurationDemo } from './getting-started-configuration-demo/getting-started-configuration-demo';
import { GettingStartedFirstComponentDemo } from './getting-started-first-component-demo/getting-started-first-component-demo';
import { GettingStartedMigrationGuideDemo } from './getting-started-migration-guide-demo/getting-started-migration-guide-demo';
import { GettingStartedUsingProDemo } from './getting-started-using-pro-demo/getting-started-using-pro-demo';
import { DesignSystemOverviewDemo } from './design-system-overview-demo/design-system-overview-demo';
import { DesignSystemDesignTokensDemo } from './design-system-design-tokens-demo/design-system-design-tokens-demo';
import { DesignSystemBorderRadiusDemo } from './design-system-border-radius-demo/design-system-border-radius-demo';
import { DesignSystemShadowsDemo } from './design-system-shadows-demo/design-system-shadows-demo';
import { DesignSystemElevationDemo } from './design-system-elevation-demo/design-system-elevation-demo';
import { DesignSystemBreakpointsDemo } from './design-system-breakpoints-demo/design-system-breakpoints-demo';
import { DesignSystemMotionAnimationDemo } from './design-system-motion-animation-demo/design-system-motion-animation-demo';
import { AboutContributingDemo } from './about-contributing-demo/about-contributing-demo';
import { UtilitiesColorsDemo } from './utilities-colors-demo/utilities-colors-demo';
import { UtilitiesTypographyDemo } from './utilities-typography-demo/utilities-typography-demo';
import { UtilitiesSpacingDemo } from './utilities-spacing-demo/utilities-spacing-demo';
import { UtilitiesShadowsDemo } from './utilities-shadows-demo/utilities-shadows-demo';
import { UtilitiesBorderRadiusDemo } from './utilities-border-radius-demo/utilities-border-radius-demo';
import { UtilitiesBreakpointsDemo } from './utilities-breakpoints-demo/utilities-breakpoints-demo';
import { PlaygroundDemo } from './playground-demo/playground-demo';
import { TryItDemo } from './try-it-demo/try-it-demo';
import { TemplatesLoginDemo } from './templates-login-demo/templates-login-demo';
import { TemplatesRegisterDemo } from './templates-register-demo/templates-register-demo';
import { TemplatesForgotPasswordDemo } from './templates-forgot-password-demo/templates-forgot-password-demo';
import { TemplatesDashboardDemo } from './templates-dashboard-demo/templates-dashboard-demo';
import { TemplatesProfileDemo } from './templates-profile-demo/templates-profile-demo';
import { TemplatesSettingsDemo } from './templates-settings-demo/templates-settings-demo';
import { TemplatesErrorPagesDemo } from './templates-error-pages-demo/templates-error-pages-demo';
import { TemplatesEmptyStatesDemo } from './templates-empty-states-demo/templates-empty-states-demo';
import { BlocksHeroSectionsDemo } from './blocks-hero-sections-demo/blocks-hero-sections-demo';
import { BlocksHeadersDemo } from './blocks-headers-demo/blocks-headers-demo';
import { BlocksFootersDemo } from './blocks-footers-demo/blocks-footers-demo';
import { BlocksPricingDemo } from './blocks-pricing-demo/blocks-pricing-demo';
import { BlocksFeatureSectionsDemo } from './blocks-feature-sections-demo/blocks-feature-sections-demo';
import { BlocksTestimonialsDemo } from './blocks-testimonials-demo/blocks-testimonials-demo';
import { BlocksCtaSectionsDemo } from './blocks-cta-sections-demo/blocks-cta-sections-demo';
import { ChartsBarDemo } from './charts-bar-demo/charts-bar-demo';
import { ChartsLineDemo } from './charts-line-demo/charts-line-demo';
import { ChartsAreaDemo } from './charts-area-demo/charts-area-demo';
import { ChartsPieDemo } from './charts-pie-demo/charts-pie-demo';
import { LayoutContainerDemo } from './layout-container-demo/layout-container-demo';
import { LayoutGridDemo } from './layout-grid-demo/layout-grid-demo';
import { LayoutFlexDemo } from './layout-flex-demo/layout-flex-demo';
import { LayoutStackDemo } from './layout-stack-demo/layout-stack-demo';
import { LayoutDividerDemo } from './layout-divider-demo/layout-divider-demo';
import { LayoutSpacerDemo } from './layout-spacer-demo/layout-spacer-demo';
import { LayoutSplitterDemo } from './layout-splitter-demo/layout-splitter-demo';
import { LayoutAspectRatioDemo } from './layout-aspect-ratio-demo/layout-aspect-ratio-demo';
import { LayoutMasonryDemo } from './layout-masonry-demo/layout-masonry-demo';
import { InstallationRequirementsDemo } from './installation-requirements-demo/installation-requirements-demo';
import { InstallationInstallDemo } from './installation-install-demo/installation-install-demo';
import { InstallationConfigureDemo } from './installation-configure-demo/installation-configure-demo';
import { InstallationImportComponentsDemo } from './installation-import-components-demo/installation-import-components-demo';
import { InstallationThemeSetupDemo } from './installation-theme-setup-demo/installation-theme-setup-demo';
import { InstallationIconsSetupDemo } from './installation-icons-setup-demo/installation-icons-setup-demo';
import { InstallationVerifyDemo } from './installation-verify-demo/installation-verify-demo';
import { AccessibilityWcagDemo } from './accessibility-wcag-demo/accessibility-wcag-demo';
import { AccessibilityKeyboardNavigationDemo } from './accessibility-keyboard-navigation-demo/accessibility-keyboard-navigation-demo';
import { AccessibilityScreenReadersDemo } from './accessibility-screen-readers-demo/accessibility-screen-readers-demo';
import { AccessibilityFocusManagementDemo } from './accessibility-focus-management-demo/accessibility-focus-management-demo';
import { AccessibilityAriaDemo } from './accessibility-aria-demo/accessibility-aria-demo';
import { AccessibilityColorContrastDemo } from './accessibility-color-contrast-demo/accessibility-color-contrast-demo';
import { AccessibilityTestingDemo } from './accessibility-testing-demo/accessibility-testing-demo';
import { BlocksLoginDemo } from './blocks-login-demo/blocks-login-demo';
import { BlocksRegisterDemo } from './blocks-register-demo/blocks-register-demo';
import { BlocksContactDemo } from './blocks-contact-demo/blocks-contact-demo';
import { BlocksFaqDemo } from './blocks-faq-demo/blocks-faq-demo';
import { BlocksAboutDemo } from './blocks-about-demo/blocks-about-demo';
import { BlocksTeamDemo } from './blocks-team-demo/blocks-team-demo';
import { BlocksNewsletterDemo } from './blocks-newsletter-demo/blocks-newsletter-demo';
import { BlocksBlogDemo } from './blocks-blog-demo/blocks-blog-demo';
import { BlocksDashboardDemo } from './blocks-dashboard-demo/blocks-dashboard-demo';
import { BlocksStatisticsDemo } from './blocks-statistics-demo/blocks-statistics-demo';
import { BlocksLandingPagesDemo } from './blocks-landing-pages-demo/blocks-landing-pages-demo';
import { ChartsDoughnutDemo } from './charts-doughnut-demo/charts-doughnut-demo';
import { ChartsRadarDemo } from './charts-radar-demo/charts-radar-demo';
import { ChartsScatterDemo } from './charts-scatter-demo/charts-scatter-demo';
import { ChartsBubbleDemo } from './charts-bubble-demo/charts-bubble-demo';
import { ChartsGaugeDemo } from './charts-gauge-demo/charts-gauge-demo';
import { ChartsHeatmapDemo } from './charts-heatmap-demo/charts-heatmap-demo';
import { ChartsFunnelDemo } from './charts-funnel-demo/charts-funnel-demo';
import { ChartsStackedBarDemo } from './charts-stacked-bar-demo/charts-stacked-bar-demo';
import { ChartsMixedDemo } from './charts-mixed-demo/charts-mixed-demo';
import { ChartsSparklineDemo } from './charts-sparkline-demo/charts-sparkline-demo';
import { TemplatesAdminDashboardDemo } from './templates-admin-dashboard-demo/templates-admin-dashboard-demo';
import { TemplatesCrmDemo } from './templates-crm-demo/templates-crm-demo';
import { TemplatesHrPortalDemo } from './templates-hr-portal-demo/templates-hr-portal-demo';
import { TemplatesEcommerceDemo } from './templates-ecommerce-demo/templates-ecommerce-demo';
import { TemplatesProjectManagementDemo } from './templates-project-management-demo/templates-project-management-demo';
import { TemplatesAnalyticsDashboardDemo } from './templates-analytics-dashboard-demo/templates-analytics-dashboard-demo';
import { TemplatesRiskManagementDemo } from './templates-risk-management-demo/templates-risk-management-demo';
import { TemplatesDocumentManagementDemo } from './templates-document-management-demo/templates-document-management-demo';
import { TemplatesUserManagementDemo } from './templates-user-management-demo/templates-user-management-demo';
import { TemplatesNotificationsDemo } from './templates-notifications-demo/templates-notifications-demo';
import { DataEntryDateRangePickerDemo } from './data-entry-date-range-picker-demo/data-entry-date-range-picker-demo';
import { DataEntryTimePickerDemo } from './data-entry-time-picker-demo/data-entry-time-picker-demo';
import { DataEntryNumberInputDemo } from './data-entry-number-input-demo/data-entry-number-input-demo';
import { DataEntryInputMaskDemo } from './data-entry-input-mask-demo/data-entry-input-mask-demo';
import { DataEntryPasswordInputDemo } from './data-entry-password-input-demo/data-entry-password-input-demo';
import { DataEntryPhoneInputDemo } from './data-entry-phone-input-demo/data-entry-phone-input-demo';
import { DataEntrySearchInputDemo } from './data-entry-search-input-demo/data-entry-search-input-demo';
import { DataDisplayDataGridDemo } from './data-display-data-grid-demo/data-display-data-grid-demo';
import { DataDisplayDataTableDemo } from './data-display-data-table-demo/data-display-data-table-demo';
import { DataDisplayTreeTableDemo } from './data-display-tree-table-demo/data-display-tree-table-demo';
import { DataDisplayDescriptionListDemo } from './data-display-description-list-demo/data-display-description-list-demo';
import { DataDisplayCalendarDemo } from './data-display-calendar-demo/data-display-calendar-demo';
import { DataDisplayStatCardDemo } from './data-display-stat-card-demo/data-display-stat-card-demo';
import { DataDisplayEmptyStateDemo } from './data-display-empty-state-demo/data-display-empty-state-demo';
import { DataDisplayResultDemo } from './data-display-result-demo/data-display-result-demo';
import { PatternFormsDemo } from './pattern-forms-demo/pattern-forms-demo';
import { PatternAuthenticationDemo } from './pattern-authentication-demo/pattern-authentication-demo';
import { PatternSearchFilterDemo } from './pattern-search-filter-demo/pattern-search-filter-demo';
import { PatternCrudDemo } from './pattern-crud-demo/pattern-crud-demo';
import { PatternPaginationDemo } from './pattern-pagination-demo/pattern-pagination-demo';
import { PatternDataManagementDemo } from './pattern-data-management-demo/pattern-data-management-demo';
import { PatternFileManagementDemo } from './pattern-file-management-demo/pattern-file-management-demo';
import { PatternNotificationsDemo } from './pattern-notifications-demo/pattern-notifications-demo';
import { PatternUserManagementDemo } from './pattern-user-management-demo/pattern-user-management-demo';
import { PatternDashboardDemo } from './pattern-dashboard-demo/pattern-dashboard-demo';
import { PatternErrorHandlingDemo } from './pattern-error-handling-demo/pattern-error-handling-demo';
import { DeveloperApiReferenceDemo } from './developer-api-reference-demo/developer-api-reference-demo';
import { DeveloperAngularCompatibilityDemo } from './developer-angular-compatibility-demo/developer-angular-compatibility-demo';
import { DeveloperTypescriptDemo } from './developer-typescript-demo/developer-typescript-demo';
import { DeveloperConfigurationDemo } from './developer-configuration-demo/developer-configuration-demo';
import { DeveloperThemingApiDemo } from './developer-theming-api-demo/developer-theming-api-demo';
import { DeveloperCssUtilitiesDemo } from './developer-css-utilities-demo/developer-css-utilities-demo';
import { DeveloperCustomizationDemo } from './developer-customization-demo/developer-customization-demo';
import { DeveloperSsrDemo } from './developer-ssr-demo/developer-ssr-demo';
import { DeveloperTroubleshootingDemo } from './developer-troubleshooting-demo/developer-troubleshooting-demo';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'getting-started'
    },
    {
        path: 'showcase-marketing',
        component: ShowcaseMarketing
    },
    {
        path: 'showcase-ecommerce',
        component: ShowcaseEcommerce
    },
    {
        path: 'showcase-support',
        component: ShowcaseSupport
    },
    {
        path: 'showcase-crm',
        component: ShowcaseCrm
    },
    {
        path: 'showcase-booking',
        component: ShowcaseBooking
    },
    {
        path: 'showcase-lms',
        component: ShowcaseLms
    },
    {
        path: 'showcase-realestate',
        component: ShowcaseRealestate
    },
    {
        path: 'showcase-jobs',
        component: ShowcaseJobs
    },
    {
        path: 'showcase-events',
        component: ShowcaseEvents
    },
    {
        path: 'showcase-recipes',
        component: ShowcaseRecipes
    },
    {
        path: 'showcase',
        pathMatch: 'full',
        component: ShowcaseIndex
    },
    {
        path: 'showcase',
        component: ShowcaseLayout,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: ShowcaseDashboard },
            { path: 'analytics', component: ShowcaseAnalytics },
            { path: 'orders', component: ShowcaseOrders },
            { path: 'customers', component: ShowcaseCustomers },
            { path: 'invoices', component: ShowcaseInvoices },
            { path: 'projects', component: ShowcaseProjects },
            { path: 'team', component: ShowcaseTeam },
            { path: 'settings', component: ShowcaseSettings },
        ]
    },
    {
        path: 'pro-upgrade',
        component: ProUpgrade
    },
    {
        path: 'getting-started',
        component: GettingStartedDemo
    },
    {
        path: 'getting-started/introduction',
        component: GettingStartedIntroductionDemo
    },
    {
        path: 'getting-started/quick-start',
        component: GettingStartedQuickStartDemo
    },
    {
        path: 'getting-started/configuration',
        component: GettingStartedConfigurationDemo
    },
    {
        path: 'getting-started/using-pro',
        component: GettingStartedUsingProDemo
    },
    {
        path: 'getting-started/first-component',
        component: GettingStartedFirstComponentDemo
    },
    {
        path: 'getting-started/migration-guide',
        component: GettingStartedMigrationGuideDemo
    },
    {
        path: 'translate',
        component: NxTranslateDemo
    },
    {
        path: 'button',
        component: UiButtonDemo
    },
    {
        path: 'card',
        component: UiCardDemo
    },
    {
        path: 'chip',
        component: UiChipDemo
    },
    {
        path: 'tag',
        component: UiTagDemo
    },
    {
        path: 'color-picker',
        component: UiColorPickerDemo
    },
    {
        path: 'rating',
        component: UiRatingDemo
    },
    {
        path: 'otp-input',
        component: UiOtpInputDemo
    },
    {
        path: 'mention',
        component: UiMentionDemo
    },
    {
        path: 'formula-input',
        component: UiFormulaInputDemo
    },
    {
        path: 'unit-input',
        component: UiUnitInputDemo
    },
    {
        path: 'rich-text-editor',
        component: UiRichTextEditorDemo
    },
    {
        path: 'menu',
        component: UiMenuDemo
    },
    {
        path: 'dropdown-menu',
        component: UiDropdownMenuDemo
    },
    {
        path: 'context-menu',
        component: UiContextMenuDemo
    },
    {
        path: 'menubar',
        component: UiMenubarDemo
    },
    {
        path: 'mega-menu',
        component: UiMegaMenuDemo
    },
    {
        path: 'navbar',
        component: UiNavbarDemo
    },
    {
        path: 'bottom-navigation',
        component: UiBottomNavigationDemo
    },
    {
        path: 'back-to-top',
        component: UiBackToTopDemo
    },
    {
        path: 'drawer',
        component: UiDrawerDemo
    },
    {
        path: 'command-palette',
        component: UiCommandPaletteDemo
    },
    {
        path: 'statistic',
        component: UiStatisticDemo
    },
    {
        path: 'key-value-list',
        component: UiKeyValueListDemo
    },
    {
        path: 'todo-list',
        component: UiTodoListDemo
    },
    {
        path: 'notes-app',
        component: UiNotesAppDemo
    },
    {
        path: 'pinned-list',
        component: UiPinnedListDemo
    },
    {
        path: 'notification-center',
        component: UiNotificationCenterDemo
    },
    {
        path: 'progress-bar',
        component:UiProgressBarDemo
    },
    {
        path: 'spinner',
        component: UiSpinnerDemo
    },
    {
        path: 'skeleton',
        component: UiSkeletonDemo
    },
    {
        path:'accordion',
        component:UiAccordionDemo
    },
    {
        path:'tabs',
        component:UiTabsDemo
    },
    {
        path: 'badge',
        component: UiBadgeDemo
    },
    {
        path: 'icon',
        component: UiIconDemo
    },
    {
        path: 'avatar',
        component: UiAvatarDemo
    },
    {
        path: 'table',
        component: UiTableDemo
    },
    {
        path: 'list',
        component: UiListDemo
    },
    {
        path: 'timeline',
        component: UiTimelineDemo
    },
    {
        path: 'tree',
        component: UiTreeDemo
    },
    {
        path: 'data-grid',
        component: DataDisplayDataGridDemo
    },
    {
        path: 'data-table',
        component: DataDisplayDataTableDemo
    },
    {
        path: 'tree-table',
        component: DataDisplayTreeTableDemo
    },
    {
        path: 'description-list',
        component: DataDisplayDescriptionListDemo
    },
    {
        path: 'calendar',
        component: DataDisplayCalendarDemo
    },
    {
        path: 'stat-card',
        component: DataDisplayStatCardDemo
    },
    {
        path: 'empty-state',
        component: DataDisplayEmptyStateDemo
    },
    {
        path: 'result',
        component: DataDisplayResultDemo
    },
    {
        path: 'patterns/forms',
        component: PatternFormsDemo
    },
    {
        path: 'patterns/authentication',
        component: PatternAuthenticationDemo
    },
    {
        path: 'patterns/search-filter',
        component: PatternSearchFilterDemo
    },
    {
        path: 'patterns/crud',
        component: PatternCrudDemo
    },
    {
        path: 'patterns/pagination',
        component: PatternPaginationDemo
    },
    {
        path: 'patterns/data-management',
        component: PatternDataManagementDemo
    },
    {
        path: 'patterns/file-management',
        component: PatternFileManagementDemo
    },
    {
        path: 'patterns/notifications',
        component: PatternNotificationsDemo
    },
    {
        path: 'patterns/user-management',
        component: PatternUserManagementDemo
    },
    {
        path: 'patterns/dashboard',
        component: PatternDashboardDemo
    },
    {
        path: 'patterns/error-handling',
        component: PatternErrorHandlingDemo
    },
    {
        path: 'developer/api-reference',
        component: DeveloperApiReferenceDemo
    },
    {
        path: 'developer/angular-compatibility',
        component: DeveloperAngularCompatibilityDemo
    },
    {
        path: 'developer/typescript',
        component: DeveloperTypescriptDemo
    },
    {
        path: 'developer/configuration',
        component: DeveloperConfigurationDemo
    },
    {
        path: 'developer/theming-api',
        component: DeveloperThemingApiDemo
    },
    {
        path: 'developer/css-utilities',
        component: DeveloperCssUtilitiesDemo
    },
    {
        path: 'developer/customization',
        component: DeveloperCustomizationDemo
    },
    {
        path: 'developer/ssr',
        component: DeveloperSsrDemo
    },
    {
        path: 'developer/troubleshooting',
        component: DeveloperTroubleshootingDemo
    },
    {
        path: 'collapse',
        component: UiCollapseDemo
    },
    {
        path: 'panel',
        component: UiPanelDemo
    },
    {
        path: 'alert',
        component: UiAlertDemo
    },
    {
        path: 'loading',
        component: UiLoadingDemo
    },
    {
        path: 'loading-button',
        component: UiLoadingButtonDemo
    },
    {
        path: 'status-indicator',
        component: UiStatusIndicatorDemo
    },
    {
        path: 'error-state',
        component: UiErrorStateDemo
    },
    {
        path: 'not-found',
        component: UiNotFoundDemo
    },
    {
        path: 'permission-denied',
        component: UiPermissionDeniedDemo
    },
    {
        path: 'maintenance-state',
        component: UiMaintenanceStateDemo
    },
    {
        path: 'unsaved-changes-dialog',
        component: UiUnsavedChangesDialogDemo
    },
    {
        path: 'warning',
        component: UiWarningDemo
    },
    {
        path: 'success',
        component: UiSuccessDemo
    },
    {
        path: 'offline',
        component: UiOfflineStateDemo
    },
    {
        path: 'connection-status',
        component: UiConnectionStatusDemo
    },
    {
        path: 'tooltip',
        component: UiTooltipDemo
    },
    {
        path: 'popover',
        component: UiPopoverDemo
    },
    {
        path: 'popover-menu',
        component: UiPopoverMenuDemo
    },
    {
        path: 'hover-card',
        component: UiHoverCardDemo
    },
    {
        path: 'modal',
        component: UiModalDemo
    },
    {
        path: 'fullscreen-dialog',
        component: UiFullscreenDialogDemo
    },
    {
        path: 'lightbox',
        component: UiLightboxDemo
    },
    {
        path: 'loading-overlay',
        component: UiLoadingOverlayDemo
    },
    {
        path: 'spotlight',
        component: UiSpotlightDemo
    },
    {
        path: 'tour',
        component: UiTourDemo
    },
    {
        path: 'toast',
        component: UiToastDemo
    },
    {
        path: 'dialog',
        component: UiDialogDemo
    },
    {
        path: 'input',
        component: UiInputDemo
    },
    {
        path: 'textarea',
        component: UiTextareaDemo
    },
    {
        path: 'select',
        component: UiSelectDemo
    },
    {
        path: 'autocomplete',
        component: UiAutocompleteDemo
    },
    {
        path: 'combobox',
        component: UiComboboxDemo
    },
    {
        path: 'checkbox',
        component: UiCheckboxDemo
    },
    {
        path: 'radio',
        component: UiRadioDemo
    },
    {
        path: 'switch',
        component: UiSwitchDemo
    },
    {
        path: 'toggle',
        component: UiToggleDemo
    },
    {
        path: 'segmented-control',
        component: UiSegmentedControlDemo
    },
    {
        path: 'slider',
        component: UiSliderDemo
    },
    {
        path: 'datepicker',
        component: UiDatepickerDemo
    },
    {
        path: 'event-calendar',
        component: UiCalendarDemo
    },
    {
        path: 'date-range-picker',
        component: DataEntryDateRangePickerDemo
    },
    {
        path: 'time-picker',
        component: DataEntryTimePickerDemo
    },
    {
        path: 'number-input',
        component: DataEntryNumberInputDemo
    },
    {
        path: 'input-mask',
        component: DataEntryInputMaskDemo
    },
    {
        path: 'password-input',
        component: DataEntryPasswordInputDemo
    },
    {
        path: 'phone-input',
        component: DataEntryPhoneInputDemo
    },
    {
        path: 'search-input',
        component: DataEntrySearchInputDemo
    },
    {
        path: 'form-builder',
        component: UiFormBuilderDemo
    },
    {
        path: 'form-builder-advanced',
        component: UiFormRendererDemo
    },
    {
        path: 'enterprise/data-grid',
        component: UiDataGridDemo
    },
    {
        path: 'enterprise/column-manager',
        component: UiColumnManagerDemo
    },
    {
        path: 'enterprise/advanced-filters',
        component: UiAdvancedFiltersDemo
    },
    {
        path: 'document-viewer',
        component: UiDocumentViewerDemo
    },
    {
        path: 'dashboard/widget-grid',
        component: UiWidgetGridDemo
    },
    {
        path: 'dashboard/dashboard-builder',
        component: UiDashboardBuilderDemo
    },
    {
        path: 'dashboard/dashboard-filters',
        component: UiDashboardFiltersDemo
    },
    {
        path: 'image-editor',
        component: UiImageEditorDemo
    },
    {
        path: 'pdf-annotator',
        component: UiPdfAnnotatorDemo
    },
    {
        path: 'document-scanner',
        component: UiDocumentScannerDemo
    },
    {
        path: 'ai/chat',
        component: UiAiChatDemo
    },
    {
        path: 'ai/prompt-builder',
        component: UiAiPromptBuilderDemo
    },
    {
        path: 'ai/response-viewer',
        component: UiAiResponseViewerDemo
    },
    {
        path: 'ai/token-usage',
        component: UiAiTokenUsageDemo
    },
    {
        path: 'ai/model-playground',
        component: UiAiModelPlaygroundDemo
    },
    {
        path: 'file-upload',
        component: FileUploadDemo
    },
    {
        path: 'image-upload',
        component: ImageUploadDemo
    },
    {
        path: 'video-upload',
        component: VideoUploadDemo
    },
    {
        path: 'audio-upload',
        component: AudioUploadDemo
    },
    {
        path: 'document-upload',
        component: DocumentUploadDemo
    },
    {
        path: 'gallery',
        component: UiGalleryDemo
    },
    {
        path: 'preview',
        component: UiPreviewDemo
    },
    {
        path: 'qr-code',
        component: UiQrCodeDemo
    },
    {
        path: 'carousel',
        component: UiCarouselDemo
    },
    {
        path: 'breadcrumb',
        component: UiBreadcrumbDemo
    },
    {
        path: 'pagination',
        component: UiPaginationDemo
    },
    {
        path: 'stepper',
        component: UiStepperDemo
    },
    {
        path: 'sidebar',
        component: NxSidebarDemo
    },
    {
        path: 'guide/introduction',
        component: GuideIntroductionDemo
    },
    {
        path: 'guide/installation',
        component: GuideInstallationDemo
    },
    {
        path: 'guide/theming',
        component: GuideThemingDemo
    },
    {
        path: 'guide/accessibility',
        component: GuideAccessibilityDemo
    },
    {
        path: 'guide/colors',
        component: GuideColorsDemo
    },
    {
        path: 'guide/typography',
        component: GuideTypographyDemo
    },
    {
        path: 'guide/spacing',
        component: GuideSpacingDemo
    },
    {
        path: 'guide/responsive-design',
        component: GuideResponsiveDesignDemo
    },
    {
        path: 'guide/rtl-support',
        component: GuideRtlSupportDemo
    },
    {
        path: 'internationalization/i18n',
        component: InternationalizationI18nDemo
    },
    {
        path: 'internationalization/localization',
        component: InternationalizationLocalizationDemo
    },
    {
        path: 'internationalization/date-number-formats',
        component: InternationalizationDateNumberFormatsDemo
    },
    {
        path: 'testing/unit-testing',
        component: TestingUnitTestingDemo
    },
    {
        path: 'testing/component-testing',
        component: TestingComponentTestingDemo
    },
    {
        path: 'testing/accessibility-testing',
        component: TestingAccessibilityTestingDemo
    },
    {
        path: 'testing/visual-testing',
        component: TestingVisualTestingDemo
    },
    {
        path: 'testing/e2e-testing',
        component: TestingE2eTestingDemo
    },
    {
        path: 'guide/forms',
        component: GuideFormsDemo
    },
    {
        path: 'design-system/overview',
        component: DesignSystemOverviewDemo
    },
    {
        path: 'design-system/design-tokens',
        component: DesignSystemDesignTokensDemo
    },
    {
        path: 'design-system/border-radius',
        component: DesignSystemBorderRadiusDemo
    },
    {
        path: 'design-system/shadows',
        component: DesignSystemShadowsDemo
    },
    {
        path: 'design-system/elevation',
        component: DesignSystemElevationDemo
    },
    {
        path: 'design-system/breakpoints',
        component: DesignSystemBreakpointsDemo
    },
    {
        path: 'design-system/motion-animation',
        component: DesignSystemMotionAnimationDemo
    },
    {
        path: 'about/who-we-are',
        component: AboutWhoWeAreDemo
    },
    {
        path: 'about/changelog',
        component: AboutChangelogDemo
    },
    {
        path: 'about/releases',
        component: AboutReleasesDemo
    },
    {
        path: 'about/roadmap',
        component: AboutRoadmapDemo
    },
    {
        path: 'about/contributing',
        component: AboutContributingDemo
    },
    {
        path: 'about/license',
        component: AboutLicenseDemo
    },
    {
        path: 'about/contact',
        component: AboutContactDemo
    },
    {
        path: 'pipes',
        component: PipesDemo
    },
    {
        path: 'icons',
        component: IconsDemo
    },
    {
        path: 'emoji',
        component: EmojiDemo
    },
    {
        path: 'utilities/colors',
        component: UtilitiesColorsDemo
    },
    {
        path: 'utilities/typography',
        component: UtilitiesTypographyDemo
    },
    {
        path: 'utilities/spacing',
        component: UtilitiesSpacingDemo
    },
    {
        path: 'utilities/shadows',
        component: UtilitiesShadowsDemo
    },
    {
        path: 'utilities/border-radius',
        component: UtilitiesBorderRadiusDemo
    },
    {
        path: 'utilities/breakpoints',
        component: UtilitiesBreakpointsDemo
    },
    {
        path: 'playground',
        component: PlaygroundDemo
    },
    {
        path: 'try-it',
        component: TryItDemo
    },
    {
        path: 'templates/login',
        component: TemplatesLoginDemo
    },
    {
        path: 'templates/register',
        component: TemplatesRegisterDemo
    },
    {
        path: 'templates/forgot-password',
        component: TemplatesForgotPasswordDemo
    },
    {
        path: 'templates/dashboard',
        component: TemplatesDashboardDemo
    },
    {
        path: 'templates/profile',
        component: TemplatesProfileDemo
    },
    {
        path: 'templates/settings',
        component: TemplatesSettingsDemo
    },
    {
        path: 'templates/error-pages',
        component: TemplatesErrorPagesDemo
    },
    {
        path: 'templates/empty-states',
        component: TemplatesEmptyStatesDemo
    },
    {
        path: 'blocks/hero-sections',
        component: BlocksHeroSectionsDemo
    },
    {
        path: 'blocks/headers',
        component: BlocksHeadersDemo
    },
    {
        path: 'blocks/footers',
        component: BlocksFootersDemo
    },
    {
        path: 'blocks/pricing',
        component: BlocksPricingDemo
    },
    {
        path: 'blocks/feature-sections',
        component: BlocksFeatureSectionsDemo
    },
    {
        path: 'blocks/testimonials',
        component: BlocksTestimonialsDemo
    },
    {
        path: 'blocks/cta-sections',
        component: BlocksCtaSectionsDemo
    },
    {
        path: 'charts/bar',
        component: ChartsBarDemo
    },
    {
        path: 'charts/line',
        component: ChartsLineDemo
    },
    {
        path: 'charts/area',
        component: ChartsAreaDemo
    },
    {
        path: 'charts/pie',
        component: ChartsPieDemo
    },
    {
        path: 'charts/contribution-graph',
        component: UiContributionGraphDemo
    },
    {
        path: 'charts/sankey',
        component: UiSankeyChartDemo
    },
    {
        path: 'charts/treemap',
        component: UiTreemapDemo
    },
    {
        path: 'charts/candlestick',
        component: UiCandlestickChartDemo
    },
    {
        path: 'charts/polar-area',
        component: UiPolarAreaChartDemo
    },
    {
        path: 'charts/sunburst',
        component: UiSunburstChartDemo
    },
    {
        path: 'layout/container',
        component: LayoutContainerDemo
    },
    {
        path: 'layout/grid',
        component: LayoutGridDemo
    },
    {
        path: 'layout/flex',
        component: LayoutFlexDemo
    },
    {
        path: 'layout/stack',
        component: LayoutStackDemo
    },
    {
        path: 'layout/divider',
        component: LayoutDividerDemo
    },
    {
        path: 'layout/spacer',
        component: LayoutSpacerDemo
    },
    {
        path: 'layout/splitter',
        component: LayoutSplitterDemo
    },
    {
        path: 'layout/aspect-ratio',
        component: LayoutAspectRatioDemo
    },
    {
        path: 'layout/masonry',
        component: LayoutMasonryDemo
    },
    {
        path: 'layout/resizable',
        component: UiResizableDemo
    },
    {
        path: 'installation/requirements',
        component: InstallationRequirementsDemo
    },
    {
        path: 'installation/install',
        component: InstallationInstallDemo
    },
    {
        path: 'installation/configure',
        component: InstallationConfigureDemo
    },
    {
        path: 'installation/import-components',
        component: InstallationImportComponentsDemo
    },
    {
        path: 'installation/theme-setup',
        component: InstallationThemeSetupDemo
    },
    {
        path: 'installation/icons-setup',
        component: InstallationIconsSetupDemo
    },
    {
        path: 'installation/verify',
        component: InstallationVerifyDemo
    },
    {
        path: 'accessibility/wcag',
        component: AccessibilityWcagDemo
    },
    {
        path: 'accessibility/keyboard-navigation',
        component: AccessibilityKeyboardNavigationDemo
    },
    {
        path: 'accessibility/screen-readers',
        component: AccessibilityScreenReadersDemo
    },
    {
        path: 'accessibility/focus-management',
        component: AccessibilityFocusManagementDemo
    },
    {
        path: 'accessibility/aria',
        component: AccessibilityAriaDemo
    },
    {
        path: 'accessibility/color-contrast',
        component: AccessibilityColorContrastDemo
    },
    {
        path: 'accessibility/accessibility-testing',
        component: AccessibilityTestingDemo
    },
    {
        path: 'blocks/login',
        component: BlocksLoginDemo
    },
    {
        path: 'blocks/register',
        component: BlocksRegisterDemo
    },
    {
        path: 'blocks/contact',
        component: BlocksContactDemo
    },
    {
        path: 'blocks/faq',
        component: BlocksFaqDemo
    },
    {
        path: 'blocks/about',
        component: BlocksAboutDemo
    },
    {
        path: 'blocks/team',
        component: BlocksTeamDemo
    },
    {
        path: 'blocks/newsletter',
        component: BlocksNewsletterDemo
    },
    {
        path: 'blocks/blog',
        component: BlocksBlogDemo
    },
    {
        path: 'blocks/dashboard',
        component: BlocksDashboardDemo
    },
    {
        path: 'blocks/statistics',
        component: BlocksStatisticsDemo
    },
    {
        path: 'blocks/landing-pages',
        component: BlocksLandingPagesDemo
    },
    {
        path: 'charts/doughnut',
        component: ChartsDoughnutDemo
    },
    {
        path: 'charts/radar',
        component: ChartsRadarDemo
    },
    {
        path: 'charts/scatter',
        component: ChartsScatterDemo
    },
    {
        path: 'charts/bubble',
        component: ChartsBubbleDemo
    },
    {
        path: 'charts/gauge',
        component: ChartsGaugeDemo
    },
    {
        path: 'charts/heatmap',
        component: ChartsHeatmapDemo
    },
    {
        path: 'charts/funnel',
        component: ChartsFunnelDemo
    },
    {
        path: 'charts/stacked-bar',
        component: ChartsStackedBarDemo
    },
    {
        path: 'charts/mixed',
        component: ChartsMixedDemo
    },
    {
        path: 'charts/sparkline',
        component: ChartsSparklineDemo
    },
    {
        path: 'templates/admin-dashboard',
        component: TemplatesAdminDashboardDemo
    },
    {
        path: 'templates/crm',
        component: TemplatesCrmDemo
    },
    {
        path: 'templates/hr-portal',
        component: TemplatesHrPortalDemo
    },
    {
        path: 'templates/ecommerce',
        component: TemplatesEcommerceDemo
    },
    {
        path: 'templates/project-management',
        component: TemplatesProjectManagementDemo
    },
    {
        path: 'templates/analytics-dashboard',
        component: TemplatesAnalyticsDashboardDemo
    },
    {
        path: 'templates/risk-management',
        component: TemplatesRiskManagementDemo
    },
    {
        path: 'templates/document-management',
        component: TemplatesDocumentManagementDemo
    },
    {
        path: 'templates/user-management',
        component: TemplatesUserManagementDemo
    },
    {
        path: 'templates/notifications',
        component: TemplatesNotificationsDemo
    },
    {
        path: 'directives/click-outside',
        component: DirectiveClickOutsideDemo
    },
    {
        path: 'directives/autofocus',
        component: DirectiveAutofocusDemo
    },
    {
        path: 'directives/copy-to-clipboard',
        component: DirectiveCopyToClipboardDemo
    },
    {
        path: 'directives/long-press',
        component: DirectiveLongPressDemo
    },
    {
        path: 'directives/debounce-click',
        component: DirectiveDebounceClickDemo
    },
    {
        path: 'directives/has-permission',
        component: DirectiveHasPermissionDemo
    },
    {
        path: 'directives/in-view',
        component: DirectiveInViewDemo
    },
    {
        path: 'directives/scroll-lock',
        component: DirectiveScrollLockDemo
    },
    {
        path: 'directives/focus-trap',
        component: DirectiveFocusTrapDemo
    },
    {
        path: 'directives/hotkey',
        component: DirectiveHotkeyDemo
    },
    {
        path: 'how-to/portfolio-gallery',
        component: HowToPortfolioGalleryDemo
    },
    {
        path: 'how-to/buy-product',
        component: HowToBuyProductDemo
    },
    {
        path: 'how-to/blog-post',
        component: HowToBlogPostDemo
    },
    {
        path: 'how-to/onboarding-flow',
        component: HowToOnboardingFlowDemo
    },
    {
        path: 'how-to/signup-wizard',
        component: HowToSignupWizardDemo
    },
    {
        path: 'how-to/search-filter',
        component: HowToSearchFilterDemo
    },
    {
        path: 'how-to/file-manager',
        component: HowToFileManagerDemo
    },
    {
        path: 'how-to/chat-messaging',
        component: HowToChatMessagingDemo
    },
    {
        path: 'how-to/booking-flow',
        component: HowToBookingFlowDemo
    },
    {
        path: 'how-to/job-application',
        component: HowToJobApplicationDemo
    },
    {
        path: 'how-to/support-tickets',
        component: HowToSupportTicketsDemo
    },
    {
        path: 'how-to/notification-feed',
        component: HowToNotificationFeedDemo
    },
    {
        path: 'how-to/kanban-board',
        component: HowToKanbanBoardDemo
    },
    {
        path: 'how-to/plan-comparison',
        component: HowToPlanComparisonDemo
    },
    {
        path: 'how-to/media-player',
        component: HowToMediaPlayerDemo
    },
    {
        path: 'how-to/map-notes',
        component: HowToMapNotesDemo
    },
    {
        path: 'devtools/http-status',
        component: UiHttpStatusDemo
    },
    {
        path: 'devtools/environment-switcher',
        component: UiEnvironmentSwitcherDemo
    },
    {
        path: 'devtools/terminal',
        component: UiTerminalDemo
    },
    {
        path: 'devtools/log-viewer',
        component: UiLogViewerDemo
    },
    {
        path: 'devtools/api-response-viewer',
        component: UiApiResponseViewerDemo
    },
    {
        path: 'devtools/request-builder',
        component: UiRequestBuilderDemo
    },
    {
        path: 'devtools/regex-tester',
        component: UiRegexTesterDemo
    },
    {
        path: 'devtools/cron-builder',
        component: UiCronBuilderDemo
    },
    {
        path: 'devtools/calculator',
        component: UiCalculatorDemo
    },
    {
        path: 'image-cropper',
        component: UiImageCropperDemo
    },
    {
        path: 'signature-pad',
        component: UiSignaturePadDemo
    },
    {
        path: 'transfer-box',
        component: UiTransferBoxDemo
    },
    {
        path: 'tag-input',
        component: UiTagInputDemo
    },
    {
        path: 'virtual-grid',
        component: UiVirtualGridDemo
    },
    {
        path: 'tree-select',
        component: UiTreeSelectDemo
    },
    {
        path: 'bottom-sheet',
        component: UiBottomSheetDemo
    },
    {
        path: 'fab',
        component: UiFabDemo
    },
    {
        path: 'table-of-contents',
        component: UiTableOfContentsDemo
    },
    {
        path: 'cookie-banner',
        component: UiCookieBannerDemo
    },
    {
        path: 'ai/prompt-input',
        component: UiPromptInputDemo
    },
    {
        path: 'ai/chat-stream',
        component: UiChatStreamDemo
    },
    {
        path: 'ai/token-counter',
        component: UiTokenCounterDemo
    },
    {
        path: 'ai/model-selector',
        component: UiModelSelectorDemo
    },
    {
        path: 'ai/code-runner',
        component: UiMarkdownCodeRunnerDemo
    },
    {
        path: 'dropzone',
        component: UiDropzoneDemo
    },
    {
        path: 'devtools/code-editor',
        component: UiCodeEditorDemo
    },
    {
        path: 'layout/responsive-preview',
        component: UiResponsivePreviewDemo
    },
    {
        path: 'layout/device-frame',
        component: UiDeviceFrameDemo
    },
    {
        path: 'layout/layout-preview',
        component: UiLayoutPreviewDemo
    },
    {
        path: 'address-input',
        component: UiAddressInputDemo
    },
    {
        path: 'filter-chip-group',
        component: UiFilterChipGroupDemo
    },
    {
        path: 'color-contrast-checker',
        component: UiColorContrastCheckerDemo
    },
    {
        path: 'version-badge',
        component: UiVersionBadgeDemo
    },
    {
        path: 'changelog-widget',
        component: UiChangelogWidgetDemo
    },
    {
        path: 'directives/feature-flag',
        component: DirectiveFeatureFlagDemo
    },
    {
        path: 'directives/permission-gate',
        component: DirectivePermissionGateDemo
    },
    {
        path: 'activity-timeline',
        component: UiActivityTimelineDemo
    },
    {
        path: 'activity-feed',
        component: UiActivityFeedDemo
    },
    {
        path: 'audit-timeline',
        component: UiAuditTimelineDemo
    },
    {
        path: 'virtual-scroll',
        component: UiVirtualScrollDemo
    },
    {
        path: 'sortable-list',
        component: UiSortableListDemo
    },
    {
        path: 'kanban',
        component: UiKanbanDemo
    },
    {
        path: 'resizable-panels',
        component: UiResizablePanelsDemo
    },
    {
        path: 'column-selector',
        component: UiColumnSelectorDemo
    },
    {
        path: 'filter-builder',
        component: UiFilterBuilderDemo
    },
    {
        path: 'query-builder',
        component: UiQueryBuilderDemo
    },
    {
        path: 'directives/drag-drop',
        component: DirectiveDragDropDemo
    },
    {
        path: 'directives/infinite-scroll',
        component: DirectiveInfiniteScrollDemo
    },
    {
        path: 'chat',
        component: UiChatDemo
    },
    {
        path: 'command-history',
        component: UiCommandHistoryDemo
    },
    {
        path: 'version-timeline',
        component: UiVersionTimelineDemo
    },
    {
        path: 'audit-log',
        component: UiAuditLogDemo
    },
    {
        path: 'activity-explorer',
        component: UiActivityExplorerDemo
    },
    {
        path: 'design-tools/color-gradient',
        component: UiColorGradientDemo
    },
    {
        path: 'design-tools/color-gradient-editor',
        component: UiColorGradientEditorDemo
    },
    {
        path: 'design-tools/shadow-editor',
        component: UiShadowEditorDemo
    },
    {
        path: 'design-tools/border-editor',
        component: UiBorderEditorDemo
    },
    {
        path: 'design-tools/transform-editor',
        component: UiTransformEditorDemo
    },
    {
        path: 'design-tools/spacing-editor',
        component: UiSpacingEditorDemo
    },
    {
        path: 'design-tools/property-editor',
        component: UiPropertyEditorDemo
    },
    {
        path: 'design-tools/theme-editor',
        component: UiThemeEditorDemo
    },
    {
        path: 'design-tools/color-token-generator',
        component: UiColorTokenGeneratorDemo
    },
    {
        path: 'dashboard/metric-card',
        component: UiMetricCardDemo
    },
    {
        path: 'dashboard/metric-grid',
        component: UiMetricGridDemo
    },
    {
        path: 'dashboard/sparkline-card',
        component: UiSparklineCardDemo
    },
    {
        path: 'dashboard/kpi-card',
        component: UiKpiCardDemo
    },
    {
        path: 'dashboard/comparison-card',
        component: UiComparisonCardDemo
    },
    {
        path: 'dashboard/goal-progress',
        component: UiGoalProgressDemo
    },
    {
        path: 'dashboard/ranking-list',
        component: UiRankingListDemo
    },
    {
        path: 'dashboard/leaderboard',
        component: UiLeaderboardDemo
    },
    {
        path: 'dashboard/statistic-group',
        component: UiStatisticGroupDemo
    },
    {
        path: 'dashboard/dashboard-widget',
        component: UiDashboardWidgetDemo
    },
    {
        path: 'code-block',
        component: UiCodeBlockDemo
    },
    {
        path: 'copyable-text',
        component: UiCopyableTextDemo
    },
    {
        path: 'keyboard-shortcut',
        component: UiKeyboardShortcutDemo
    },
    {
        path: 'json-viewer',
        component: UiJsonViewerDemo
    },
    {
        path: 'diff-viewer',
        component: UiDiffViewerDemo
    },
    {
        path: 'text-viewer',
        component: UiTextViewerDemo
    },
    {
        path: 'pdf-viewer',
        component: UiPdfViewerDemo
    },
    {
        path: 'word-viewer',
        component: UiWordViewerDemo
    },
    {
        path: 'excel-viewer',
        component: UiExcelViewerDemo
    },
    {
        path: 'markdown-viewer',
        component: UiMarkdownViewerDemo
    },
    {
        path: 'text-statistics',
        component: UiTextStatisticsDemo
    },
    {
        path: 'before-after',
        component: UiBeforeAfterDemo
    },
    {
        path: 'json-editor',
        component: UiJsonEditorDemo
    },
    {
        path: 'navigation-rail',
        component: UiNavigationRailDemo
    },
    {
        path: 'back-button',
        component: UiBackButtonDemo
    },
    {
        path: 'nav-group',
        component: UiNavGroupDemo
    },
    {
        path: 'command-bar',
        component: UiCommandBarDemo
    },
    {
        path: 'navigation-progress',
        component: UiNavigationProgressDemo
    },
    {
        path: 'layout/app-shell',
        component: UiAppShellDemo
    },
    {
        path: 'layout/page-header',
        component: UiPageHeaderDemo
    },
    {
        path: 'layout/page-actions',
        component: UiPageActionsDemo
    },
    {
        path: 'enterprise/advanced-data-grid',
        component: UiAdvancedDataGridDemo
    },
    {
        path: 'enterprise/scheduler',
        component: UiSchedulerDemo
    },
    {
        path: 'enterprise/gantt-chart',
        component: UiGanttChartDemo
    },
    {
        path: 'enterprise/permission-matrix',
        component: UiPermissionMatrixDemo
    },
    {
        path: 'enterprise/pivot-table',
        component: UiPivotTableDemo
    },
    {
        path: 'enterprise/email-template-builder',
        component: UiEmailTemplateBuilderDemo
    },
    {
        path: 'enterprise/file-manager',
        component: UiFileManagerDemo
    },
    {
        path: 'enterprise/spreadsheet',
        component: UiSpreadsheetDemo
    },
    {
        path: 'enterprise/workflow-builder',
        component: UiWorkflowBuilderDemo
    },
    {
        path: '**',
        component: NotFoundPage
    }
];
