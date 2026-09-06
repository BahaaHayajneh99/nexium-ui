import { Routes } from '@angular/router';
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
import { UiToastDemo } from './ui-toast-demo/ui-toast-demo';
import { UiDialogDemo } from './ui-dialog-demo/ui-dialog-demo';
import { UiAlertDemo } from './ui-alert-demo/ui-alert-demo';
import { UiInputDemo } from './ui-input-demo/ui-input-demo';
import { UiTextareaDemo } from './ui-textarea-demo/ui-textarea-demo';
import { UiSelectDemo } from './ui-select-demo/ui-select-demo';
import { UiAutocompleteDemo } from './ui-autocomplete-demo/ui-autocomplete-demo';
import { UiCheckboxDemo } from './ui-checkbox-demo/ui-checkbox-demo';
import { UiRadioDemo } from './ui-radio-demo/ui-radio-demo';
import { UiSwitchDemo } from './ui-switch-demo/ui-switch-demo';
import { UiToggleDemo } from './ui-toggle-demo/ui-toggle-demo';
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
import { UiColorPickerDemo } from './ui-color-picker-demo/ui-color-picker-demo';
import { UiRatingDemo } from './ui-rating-demo/ui-rating-demo';
import { UiOtpInputDemo } from './ui-otp-input-demo/ui-otp-input-demo';
import { UiStatisticDemo } from './ui-statistic-demo/ui-statistic-demo';
import { UiKeyValueListDemo } from './ui-key-value-list-demo/ui-key-value-list-demo';
import { UiNotificationCenterDemo } from './ui-notification-center-demo/ui-notification-center-demo';
import { UiMentionDemo } from './ui-mention-demo/ui-mention-demo';
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
import { FormBuilderDemo } from './form-builder-demo/form-builder-demo';
import { FormBuilderAdvancedDemo } from './form-builder-advanced-demo/form-builder-advanced-demo';
import { FileUploadDemo } from './file-upload-demo/file-upload-demo';
import { ImageUploadDemo } from './image-upload-demo/image-upload-demo';
import { VideoUploadDemo } from './video-upload-demo/video-upload-demo';
import { AudioUploadDemo } from './audio-upload-demo/audio-upload-demo';
import { DocumentUploadDemo } from './document-upload-demo/document-upload-demo';
import { UiGalleryDemo } from './ui-gallery-demo/ui-gallery-demo';
import { UiPreviewDemo } from './ui-preview-demo/ui-preview-demo';
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
        path: 'tooltip',
        component: UiTooltipDemo
    },
    {
        path: 'popover',
        component: UiPopoverDemo
    },
    {
        path: 'modal',
        component: UiModalDemo
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
        path: 'slider',
        component: UiSliderDemo
    },
    {
        path: 'datepicker',
        component: UiDatepickerDemo
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
        component: FormBuilderDemo
    },
    {
        path: 'form-builder-advanced',
        component: FormBuilderAdvancedDemo
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
    }
];
