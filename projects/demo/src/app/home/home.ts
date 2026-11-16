import { Component, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxIcon,
  NxCard,
  NxCardContent,
  NxStatistic,
  NxProgressBarComponent,
  NxLineChart,
  NxBarChart,
  NxChartSeries,
  NxTodoList,
  NxTodoItem,
  NxAvatar,
  NxBadge,
  NxChip,
  NxSwitch,
  NxRating,
} from 'components';
import { CommonService } from '../services/common.service';
import { ThemeService } from '../services/theme.service';
import { SiteHeader } from '../component/site-header/site-header';
import { ThemeCustomizer } from '../component/theme-customizer/theme-customizer';
// Same highlighter every docs page's code sample uses (via DemoSection) - nx-code-block itself
// is intentionally plain (see its own doc comment), so this is what actually adds the color.
import { highlightTs } from '../shared/demo-section/ts-highlight';

interface NxHomeCategory {
  icon: string;
  label: string;
  description: string;
  path: string;
}

interface NxHomeStat {
  value: string;
  label: string;
}

type NxHomeShowcaseKind = 'overview' | 'metrics' | 'list' | 'avatars' | 'progress' | 'toggles';

interface NxHomeListItem {
  title: string;
  subtitle: string;
  badgeText: string;
  badgeVariant: 'success' | 'warning' | 'danger' | 'info';
}

interface NxHomeAvatarItem {
  name: string;
  subtitle: string;
  status: 'online' | 'offline' | 'busy' | 'away';
}

interface NxHomeProgressItem {
  title: string;
  value: number;
}

interface NxHomeToggleItem {
  label: string;
  checked: boolean;
}

// Each page's content is shaped to fit what that page would actually show - an order queue
// looks nothing like a team roster, so "kind" picks which panel below renders, instead of every
// icon reusing one profile+notifications+chart layout with just the text swapped out.
interface NxHomeShowcasePage {
  path: string;
  name: string;
  icon: string;
  kind: NxHomeShowcaseKind;
  heading: string;
  // kind: 'overview'
  profileName?: string;
  profileRole?: string;
  stat1?: NxHomeStat;
  stat2?: NxHomeStat;
  notifications?: NxHomeNotification[];
  // kind: 'overview' | 'metrics'
  chartCategories?: string[];
  chartSeries?: NxChartSeries[];
  // kind: 'metrics'
  metricStats?: NxHomeStat[];
  // kind: 'list'
  listItems?: NxHomeListItem[];
  // kind: 'avatars'
  avatarItems?: NxHomeAvatarItem[];
  // kind: 'progress'
  progressItems?: NxHomeProgressItem[];
  // kind: 'toggles'
  toggleItems?: NxHomeToggleItem[];
}

interface NxHomeFeature {
  icon: string;
  title: string;
  description: string;
}

interface NxHomeNotification {
  icon: string;
  text: string;
  time: string;
}

@Component({
  selector: 'app-home',
  imports: [
    NgFor,
    RouterLink,
    NxIcon,
    NxCard,
    NxCardContent,
    NxStatistic,
    NxProgressBarComponent,
    NxLineChart,
    NxBarChart,
    NxTodoList,
    NxAvatar,
    NxBadge,
    NxChip,
    NxSwitch,
    NxRating,
    SiteHeader,
    ThemeCustomizer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public commonService = inject(CommonService);
  // Instantiating ThemeService here (not just in nav/theme-customizer) ensures the dark/light
  // <html data-theme> attribute gets applied on this full-bleed route too - without it the page
  // silently falls back to the unstyled light default, since nothing else on this route chain
  // injects the service.
  private readonly theme = inject(ThemeService);

  stats: NxHomeStat[] = [
    { value: '300+', label: 'Components' },
    { value: '150+', label: 'Free components' },
    { value: '100+', label: 'PRO components' },
    { value: '18', label: 'Directives' },
    { value: '16-21', label: 'Angular versions' },
  ];

  categories: NxHomeCategory[] = [
    { icon: 'nx-edit', label: 'Forms', description: 'Inputs, selects, date pickers, validation', path: '/input' },
    { icon: 'nx-list', label: 'Data Display', description: 'Tables, trees, cards, timelines', path: '/table' },
    { icon: 'nx-chart-bar', label: 'Charts', description: 'Line, bar, area, radar, gauge, and more', path: '/charts/bar' },
    { icon: 'nx-message', label: 'Feedback', description: 'Alerts, toasts, modals, drawers', path: '/alert' },
    { icon: 'nx-compass', label: 'Navigation', description: 'Menus, tabs, breadcrumbs, steppers', path: '/breadcrumb' },
    { icon: 'nx-grid', label: 'Layout', description: 'Containers, grids, splitters, panels', path: '/layout/container' },
    { icon: 'nx-chart-bar', label: 'Dashboard', description: 'Metric cards, widgets, leaderboards', path: '/dashboard/metric-card' },
    { icon: 'nx-settings', label: 'Developer Tools', description: 'JSON viewers, code editors, log viewers', path: '/devtools/http-status' },
    { icon: 'nx-rocket', label: 'Enterprise', description: 'Workflow builders, Gantt, pivot tables', path: '/enterprise/advanced-data-grid' },
    { icon: 'nx-fire', label: 'AI & Machine Learning', description: 'Chat, prompt builders, token usage', path: '/ai/prompt-input' },
  ];

  // Each page's "kind" picks a genuinely different panel in the "A full template" preview below
  // - an order queue, a customer list, a progress tracker, and a settings panel don't look alike,
  // so switching icons there now shows different content, not the same cards with new labels.
  showcasePages: NxHomeShowcasePage[] = [
    {
      path: '/showcase/dashboard', name: 'Dashboard', icon: 'nx-chart-bar', kind: 'overview',
      heading: 'Weekly activity',
      profileName: 'Sarah Chen', profileRole: 'Product Designer',
      stat1: { value: '24', label: 'Projects' }, stat2: { value: '1.2k', label: 'Followers' },
      notifications: [
        { icon: 'nx-check-circle', text: 'Design review approved', time: '2m ago' },
        { icon: 'nx-message', text: 'New comment on "Ship v0.2.0"', time: '1h ago' },
        { icon: 'nx-star', text: 'Your project was featured', time: '5h ago' },
        { icon: 'nx-bell', text: 'Weekly summary is ready', time: '1d ago' },
      ],
      chartCategories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      chartSeries: [{ name: 'Tasks completed', data: [4, 7, 5, 8, 6, 3, 2] }],
    },
    {
      path: '/showcase/analytics', name: 'Analytics', icon: 'nx-grid', kind: 'metrics',
      heading: 'Traffic overview',
      metricStats: [
        { value: '48.2k', label: 'Visitors' },
        { value: '3.4%', label: 'Conversion' },
        { value: '2m 14s', label: 'Avg. session' },
      ],
      chartCategories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      chartSeries: [{ name: 'Pageviews (k)', data: [12, 15, 11, 18, 20, 9, 7] }],
    },
    {
      path: '/showcase/orders', name: 'Orders', icon: 'nx-credit-card', kind: 'list',
      heading: 'Order queue',
      listItems: [
        { title: 'Order #4821', subtitle: 'Jane Cooper · $128.00', badgeText: 'Paid', badgeVariant: 'success' },
        { title: 'Order #4817', subtitle: 'Wade Warren · $64.50', badgeText: 'Pending', badgeVariant: 'warning' },
        { title: 'Order #4790', subtitle: 'Esther Howard · $212.00', badgeText: 'Refunded', badgeVariant: 'danger' },
        { title: 'Order #4777', subtitle: 'Cody Fisher · $96.00', badgeText: 'Shipped', badgeVariant: 'info' },
      ],
    },
    {
      path: '/showcase/customers', name: 'Customers', icon: 'nx-users', kind: 'avatars',
      heading: 'Recent customers',
      avatarItems: [
        { name: 'Jane Cooper', subtitle: 'jane@acme.co', status: 'online' },
        { name: 'Wade Warren', subtitle: 'wade@brightly.io', status: 'away' },
        { name: 'Esther Howard', subtitle: 'esther@northwind.com', status: 'offline' },
        { name: 'Cody Fisher', subtitle: 'cody@globex.com', status: 'online' },
      ],
    },
    {
      path: '/showcase/invoices', name: 'Invoices', icon: 'nx-file', kind: 'list',
      heading: 'Recent invoices',
      listItems: [
        { title: 'INV-2214', subtitle: 'Due Mar 18 · $540.00', badgeText: 'Sent', badgeVariant: 'info' },
        { title: 'INV-2201', subtitle: 'Paid Mar 12 · $1,280.00', badgeText: 'Paid', badgeVariant: 'success' },
        { title: 'INV-2188', subtitle: 'Due Feb 28 · $320.00', badgeText: 'Overdue', badgeVariant: 'danger' },
        { title: 'INV-2176', subtitle: 'Paid Feb 20 · $780.00', badgeText: 'Paid', badgeVariant: 'success' },
      ],
    },
    {
      path: '/showcase/projects', name: 'Projects', icon: 'nx-folder', kind: 'progress',
      heading: 'Project progress',
      progressItems: [
        { title: 'Mobile Redesign', value: 72 },
        { title: 'API Migration', value: 45 },
        { title: 'Billing v2', value: 88 },
        { title: 'Docs Overhaul', value: 20 },
      ],
    },
    {
      path: '/showcase/team', name: 'Team', icon: 'nx-users', kind: 'avatars',
      heading: 'Team members',
      avatarItems: [
        { name: 'Aisha Khan', subtitle: 'HR Lead', status: 'online' },
        { name: 'Diego Alvarez', subtitle: 'Project Manager', status: 'busy' },
        { name: 'Maya Petrov', subtitle: 'Finance Lead', status: 'offline' },
        { name: 'Noah Ahmed', subtitle: 'Customer Success', status: 'online' },
      ],
    },
    {
      path: '/showcase/settings', name: 'Settings', icon: 'nx-settings', kind: 'toggles',
      heading: 'Workspace settings',
      toggleItems: [
        { label: 'Email notifications', checked: true },
        { label: 'Two-factor authentication', checked: true },
        { label: 'Public profile', checked: false },
        { label: 'Beta features', checked: false },
      ],
    },
  ];

  // The sidebar in the "A full template" preview below just switches which page name is shown
  // in its own self-contained panel - it no longer navigates away to the real showcase routes.
  activeShowcasePage = signal(this.showcasePages[0]);

  selectShowcasePage(page: NxHomeShowcasePage): void {
    this.activeShowcasePage.set(page);
  }

  features: NxHomeFeature[] = [
    { icon: 'nx-rocket', title: 'Standalone architecture', description: 'Import only the components you use and let your bundler tree-shake the rest. A NexiumUiModule is also available if your app still assembles @NgModule-style feature modules.' },
    { icon: 'nx-edit', title: 'Native forms integration', description: 'Most form components implement ControlValueAccessor, so [(ngModel)] and reactive forms work with no custom adapters - just import FormsModule or ReactiveFormsModule like any other Angular form.' },
    { icon: 'nx-settings', title: 'Themeable via CSS variables', description: 'One pre-compiled stylesheet, customizable through CSS custom properties - restyle the whole library, including dark mode, without touching component internals.' },
    { icon: 'nx-chart-bar', title: 'Free & PRO licensing', description: 'PRO components ship in the same package and render a locked placeholder until you provide a license token with provideNxLicense() - nothing breaks your build either way.' },
  ];

  // A representative subset of the README's "Directives" table - the stats row above claims
  // "18 Directives" but nothing on the page actually showed what they are until now.
  directives: NxHomeFeature[] = [
    { icon: 'nx-copy', title: 'Copy to Clipboard', description: '[nxCopyToClipboard] copies bound text to the clipboard on click.' },
    { icon: 'nx-close', title: 'Click Outside', description: '[nxClickOutside] emits when a click lands outside the host - handy for closing dropdowns and menus.' },
    { icon: 'nx-lock', title: 'Focus Trap', description: '[nxFocusTrap] traps Tab/Shift+Tab cycling within the host and restores focus on deactivation.' },
    { icon: 'nx-eye', title: 'In-View', description: '[nxInView] emits true/false as the host enters or exits the viewport, via IntersectionObserver.' },
    { icon: 'nx-refresh', title: 'Infinite Scroll', description: '[nxInfiniteScroll] emits when the host is scrolled near its end, for loading more data.' },
    { icon: 'nx-more-vertical', title: 'Drag & Drop', description: '[nxDraggable] and [nxDropZone] implement native HTML5 drag-and-drop between a draggable host and a drop zone.' },
  ];

  installCode = 'ng add nexium-ui';

  usageCode = `import { NxCard, NxCardContent, NxBadge } from 'nexium-ui';

@Component({
  selector: 'app-example',
  imports: [NxCard, NxCardContent, NxBadge],
  template: \`
    <nx-card>
      <nx-card-content>
        Hello <nx-badge variant="success">NexiumUI</nx-badge>
      </nx-card-content>
    </nx-card>
  \`,
})
export class Example {}`;

  get highlightedInstallCode(): string {
    return highlightTs(this.installCode);
  }

  get highlightedUsageCode(): string {
    return highlightTs(this.usageCode);
  }

  copiedCode = signal<'install' | 'usage' | null>(null);

  copyCode(which: 'install' | 'usage'): void {
    const text = which === 'install' ? this.installCode : this.usageCode;
    this.copiedCode.set(which);
    setTimeout(() => this.copiedCode.set(null), 2000);
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  // From the README's "Supported Angular versions" table: 0.2.0+ supports 16 through 21.
  supportedAngularVersions = ['16', '17', '18', '19', '20', '21'];

  previewMonths = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  previewSeries: NxChartSeries[] = [{ name: 'Revenue', data: [42000, 45500, 50200, 49800, 56400, 63100] }];

  // A single-column list instead of the multi-column kanban board that used to sit here - that
  // needed more width than this preview card has, forcing an awkward horizontal scrollbar.
  todoItems: NxTodoItem[] = [
    { id: 1, label: 'Design review', done: false },
    { id: 2, label: 'Write docs', done: false },
    { id: 3, label: 'Ship v0.2.0', done: true },
    { id: 4, label: 'Fix RTE bug', done: true },
  ];

  notificationsEnabled = true;
}
