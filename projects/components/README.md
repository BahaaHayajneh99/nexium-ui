# nexium-ui

Standalone Angular components for the NexiumUI library — data display, forms, feedback,
navigation, panels, media, uploads, layout, charts, and directives. Every component is a
standalone Angular component or directive; the library also ships `NexiumUiModule`, which
aggregates all of them into a single `@NgModule` for apps that prefer that style.

## Demo

Browse every component live, with usage examples and copy-paste code snippets, at
**[nexium-ui.vercel.app](https://nexium-ui.vercel.app)**.

## Installation

```bash
npm i nexium-ui
```

## Styles & Theming

To apply NexiumUI styles, you must include the library's pre-compiled stylesheet in your application. Choose one of the following methods:

### Option 1: Include in `angular.json` (Recommended)
Add the stylesheet path to your application's `styles` array in `angular.json`:

```json
"architect": {
  "build": {
    "options": {
      "styles": [
        "node_modules/nexium-ui/styles.css",
        "src/styles.scss"
      ]
    }
  }
}
```

### Option 2: Import in global stylesheet
Alternatively, import `styles.css` directly into your main `src/styles.scss` or `src/styles.css` file:

```scss
@import 'nexium-ui/styles.css';
```

## Usage

### Standalone components

Import only what you use directly into a standalone component's `imports` array. This is the
recommended approach — unused components are tree-shaken out of your bundle.

```ts
import { Component } from '@angular/core';
import { UiCard, UiCardContent, UiBadge } from 'nexium-ui';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [UiCard, UiCardContent, UiBadge],
  template: `
    <nx-card>
      <nx-card-content>
        Hello <nx-badge variant="success">NexiumUI</nx-badge>
      </nx-card-content>
    </nx-card>
  `,
})
export class Example {}
```

### NexiumUiModule

If your app still assembles feature modules the `@NgModule({ imports: [...] })` way, import
`NexiumUiModule` once to get every NexiumUI component and directive available in that module's
templates:

```ts
import { NgModule } from '@angular/core';
import { NexiumUiModule } from 'nexium-ui';

@NgModule({
  imports: [NexiumUiModule],
})
export class SharedModule {}
```

`NexiumUiModule` re-exports the full library, so reach for it when you want everything at once;
prefer importing individual standalone components when you only need a handful, since that keeps
your production bundle smaller.

## Components

### Data display

| Component | Selector |
| --- | --- |
| Card | `nx-card`, `nx-card-header`, `nx-card-title`, `nx-card-subtitle`, `nx-card-image`, `nx-card-content`, `nx-card-actions`, `nx-card-footer` |
| Chip | `nx-chip` |
| Emoji | `nx-emoji` |
| Icon | `nx-icon` |
| Key-Value List | `nx-key-value-list` |
| List | `nx-list` |
| Progress Bar | `nx-progress-bar` |
| Skeleton | `nx-skeleton` |
| Spinner | `nx-spinner` |
| Statistic | `nx-statistic` |
| Table | `nx-table` |
| Tag | `nx-tag` |
| Timeline | `nx-timeline` |
| Tree | `nx-tree`, `nx-tree-node` |
| Avatar | `nx-avatar` |
| Badge | `nx-badge` |

### Forms

| Component | Selector |
| --- | --- |
| Autocomplete | `nx-autocomplete` |
| Button | `nx-button` |
| Checkbox | `nx-checkbox` |
| Color Picker | `nx-color-picker` |
| Datepicker | `nx-datepicker` |
| Input | `nx-input` |
| Mention | `nx-mention` |
| OTP Input | `nx-otp-input` |
| Radio Group | `nx-radio-group` |
| Rating | `nx-rating` |
| Rich Text Editor | `nx-rich-text-editor` |
| Select | `nx-select` |
| Slider | `nx-slider` |
| Switch | `nx-switch` |
| Textarea | `nx-textarea` |
| Toggle | `nx-toggle` |

### Feedback

| Component | Selector |
| --- | --- |
| Alert | `nx-alert` |
| Command Palette | `nx-command-palette` |
| Dialog | `nx-dialog` |
| Drawer | `nx-drawer` |
| Modal | `nx-modal` |
| Notification Center | `nx-notification-center` |
| Popover | `nx-popover` |
| Toast | `nx-toast-container` (paired with the injectable `NxToastService`) |
| Tooltip | `[nxTooltip]` (directive) |

### Navigation

| Component | Selector |
| --- | --- |
| Breadcrumb | `nx-breadcrumb` |
| Bottom Navigation | `nx-bottom-navigation` |
| Context Menu | `nx-context-menu` |
| Dropdown Menu | `nx-dropdown-menu` |
| Mega Menu | `nx-mega-menu` |
| Menu | `nx-menu` |
| Menubar | `nx-menubar` |
| Navbar | `nx-navbar` |
| Pagination | `nx-pagination` |
| Sidebar | `nx-sidebar`, `nx-sidebar-item` |
| Stepper | `nx-stepper` |

### Panels

| Component | Selector |
| --- | --- |
| Accordion | `nx-accordion`, `nx-accordion-item`, `nx-accordion-header`, `nx-accordion-content` |
| Collapse | `nx-collapse` |
| Panel | `nx-panel` |
| Tabs | `nx-tabs`, `nx-tab` (with an `[nxTabLabel]` directive for custom tab-label markup) |

### Media & Uploads

| Component | Selector |
| --- | --- |
| Carousel | `nx-carousel` (with an `[nxCarouselSlide]` directive for projecting non-image slide content) |
| Gallery | `nx-gallery` |
| Preview | `nx-preview` |
| File Upload | `nx-file-upload` |

### Layout

| Component | Selector |
| --- | --- |
| Aspect Ratio | `nx-aspect-ratio` |
| Container | `nx-container` |
| Divider | `nx-divider` |
| Flex | `nx-flex` |
| Grid | `nx-grid`, `nx-grid-item` |
| Masonry | `nx-masonry` |
| Spacer | `nx-spacer` |
| Splitter | `nx-splitter` |
| Stack | `nx-stack` |

### Charts

| Component | Selector |
| --- | --- |
| Area Chart | `nx-area-chart` |
| Bar Chart | `nx-bar-chart` |
| Bubble Chart | `nx-bubble-chart` |
| Funnel Chart | `nx-funnel-chart` |
| Gauge Chart | `nx-gauge-chart` |
| Heatmap Chart | `nx-heatmap-chart` |
| Line Chart | `nx-line-chart` |
| Mixed Chart | `nx-mixed-chart` |
| Pie Chart | `nx-pie-chart` |
| Radar Chart | `nx-radar-chart` |
| Scatter Chart | `nx-scatter-chart` |
| Sparkline | `nx-sparkline` |

### Directives

Behavior-only primitives with no template of their own - attach them to any element, native
or component.

| Directive | Selector | Description |
| --- | --- | --- |
| Autofocus | `[nxAutofocus]` | Focuses the host once it renders. |
| Click Outside | `[nxClickOutside]` | Emits when a click lands outside the host. |
| Copy to Clipboard | `[nxCopyToClipboard]` | Copies bound text to the clipboard on click. |
| Debounce Click | `[nxDebounceClick]` | Ignores repeat clicks within a time window - a guard against double-submit. |
| Has Permission | `*nxHasPermission` | Structural directive - renders its content only when an injectable `NxPermissionChecker` grants the given permission(s). |
| Long Press | `[nxLongPress]` | Emits after the pointer is held down on the host for a set duration. |

For full input/output reference and live examples, see the hosted demo at
[nexium-ui.vercel.app](https://nexium-ui.vercel.app/getting-started), or run it locally with
`ng serve demo` — either way it has a dedicated page per component.

## Translation (i18n)

Translation is **not** part of `nexium-ui` - it ships from the separate `core` package
(`provideNxTranslate`, `NxTranslateService`, `NxTranslatePipe`), so it doesn't add weight to
this library for apps that don't need it. Install it separately and see
[`projects/core/README.md`](../core/README.md) for the full config and API reference. Quick
taste:

```ts
import { provideNxTranslate } from 'core';

provideNxTranslate({
  defaultLang: 'en',
  translations: { en: { greeting: 'Hello, {{name}}!' } },
});
```

```html
<p>{{ 'greeting' | nxTranslate:{ name: user.firstName } }}</p>
```

## Detailed examples

A few components with commonly-used options, as a starting reference:

### Card (`nx-card`)

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'flat' \| 'outlined' \| 'elevated'` | `'flat'` | Visual style. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Card padding/typography scale. |
| `hoverable` | `boolean` | `false` | Adds a hover elevation effect. |

```html
<nx-card variant="elevated" hoverable>
  <nx-card-header>
    <nx-card-title>NexiumUI Card</nx-card-title>
    <nx-card-subtitle>Enterprise Angular UI Library</nx-card-subtitle>
  </nx-card-header>
  <nx-card-content>Build reusable Angular components with NexiumUI.</nx-card-content>
</nx-card>
```

### Chip (`nx-chip`)

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'` | `'primary'` | Color variant. |
| `rounded` | `boolean` | `false` | Pill shape. |
| `outlined` | `boolean` | `false` | Transparent background with colored border. |
| `removable` | `boolean` | `false` | Shows a remove (×) button. |
| `selected` | `boolean` | `false` | Selected/active visual state. |
| `disabled` | `boolean` | `false` | Disables interaction. |

| Output | Type | Description |
| --- | --- | --- |
| `remove` | `EventEmitter<void>` | Emitted when the remove button is clicked. |

```html
<nx-chip variant="primary" removable (remove)="onRemove()">Angular</nx-chip>
```

### Progress Bar (`nx-progress-bar`)

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `0` | Completion percentage (0-100). |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'dark' \| 'light'` | `'primary'` | Color variant. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Bar height. |
| `rounded` | `boolean` | `false` | Pill shape. |
| `striped` | `boolean` | `false` | Striped fill pattern. |
| `animated` | `boolean` | `false` | Animates the stripes. |
| `showLabel` | `boolean` | `false` | Shows the percentage/label text inside the bar. |
| `label` | `string` | - | Custom label text (defaults to `value + '%'`). |
| `indeterminate` | `boolean` | `false` | Unknown-duration loading mode. |

```html
<nx-progress-bar variant="success" [value]="70" showLabel></nx-progress-bar>
```

### Spinner (`nx-spinner`)

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'dark' \| 'light'` | `'primary'` | Color variant. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Spinner diameter. |
| `center` | `boolean` | `false` | Centers the spinner in its container. |
| `overlay` | `boolean` | `false` | Renders a full-container overlay behind the spinner. |

```html
<nx-spinner variant="primary" size="large"></nx-spinner>
```

### Badge (`nx-badge`)

Highlights counts, statuses, or short labels next to other content.

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'dark' \| 'light'` | `'primary'` | Color variant. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Badge size. |
| `rounded` | `boolean` | `false` | Pill shape, ideal for numeric counters. |
| `outlined` | `boolean` | `false` | Transparent background with colored border. |
| `dot` | `boolean` | `false` | Renders as a small dot indicator without content. |

```html
<nx-badge variant="danger" rounded>8</nx-badge>
<nx-badge variant="success" dot></nx-badge>
```

### Emoji (`nx-emoji`)

Renders a Unicode emoji character from a kebab-case name, so you don't have to paste raw emoji
characters into your source files. Browse every available name on the hosted demo's
[Emoji page](https://nexium-ui.vercel.app/emoji).

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `emoji` | `string` (required) | - | Kebab-case emoji name, e.g. `fire`, `red-heart`, `grinning-face`. Unknown names render nothing. |
| `size` | `number \| string` | `24` | Font size of the glyph; a number is treated as px. |

```html
<nx-emoji emoji="fire"></nx-emoji>
<nx-emoji emoji="red-heart" [size]="32"></nx-emoji>
```

### Avatar (`nx-avatar`)

Displays a user image, with automatic fallback to initials when no image is provided.

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | - | Image URL. Falls back to initials automatically if it fails to load. |
| `alt` | `string` | `''` | Image `alt` text. |
| `name` | `string` | `''` | Used to compute initials when no image is shown. |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | Avatar diameter. |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Avatar shape. |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'dark' \| 'light'` | `'primary'` | Background color used for the initials fallback. |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | - | Optional presence indicator dot. |
| `bordered` | `boolean` | `false` | Adds a ring border, useful for avatar groups. |

```html
<nx-avatar src="user.jpg" alt="Jane Doe" status="online"></nx-avatar>
<nx-avatar name="John Doe" variant="info"></nx-avatar>
```

### Accordion (`nx-accordion`)

Components: `nx-accordion`, `nx-accordion-item`, `nx-accordion-header`, `nx-accordion-content`.

| Input (on `nx-accordion`) | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'default' \| 'flat'` | `'default'` | Visual style. |
| `multiple` | `boolean` | `false` | Allow more than one item expanded at once. |

| Input (on `nx-accordion-item`) | Type | Default | Description |
| --- | --- | --- | --- |
| `expanded` | `boolean` | `false` | Expanded by default. |
| `disabled` | `boolean` | `false` | Prevents interaction. |

```html
<nx-accordion multiple>
  <nx-accordion-item expanded>
    <nx-accordion-header>Personal Information</nx-accordion-header>
    <nx-accordion-content>User profile details and information.</nx-accordion-content>
  </nx-accordion-item>
</nx-accordion>
```

### Tabs (`nx-tabs`)

Components: `nx-tabs`, `nx-tab`.

| Input (on `nx-tabs`) | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'line' \| 'filled' \| 'boxed' \| 'pill'` | `'line'` | Visual style. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tab label size. |
| `activeIndex` | `number` | `0` | Supports two-way binding: `[(activeIndex)]`. |
| `fullWidth` | `boolean` | `false` | Stretch tabs to fill the container width. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction. |

| Input (on `nx-tab`) | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | - | Tab label text (or use an `<ng-template nxTabLabel>` for custom markup). |
| `icon` | `string` | - | Optional icon name shown next to the label. |
| `disabled` | `boolean` | `false` | Prevents the tab from being selected. |

```html
<nx-tabs variant="pill" [(activeIndex)]="activeTab">
  <nx-tab label="Profile">Profile content.</nx-tab>
  <nx-tab label="Settings" [disabled]="true">Settings content.</nx-tab>
</nx-tabs>
```

### Alert (`nx-alert`)

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'success' \| 'danger' \| 'warning' \| 'info'` | `'info'` | Color variant; also selects the default leading icon. |
| `title` | `string` | `''` | Optional bold heading shown above the message. |
| `icon` | `boolean` | `true` | Shows/hides the leading variant icon. |
| `dismissible` | `boolean` | `false` | Shows a close button that hides the alert. |

| Output | Type | Description |
| --- | --- | --- |
| `dismissed` | `EventEmitter<void>` | Emitted when the close button is clicked. |

```html
<nx-alert variant="success" title="Payment successful" dismissible (dismissed)="onDismissed()">
  Your order #1029 has been confirmed.
</nx-alert>
```

### Click Outside (`[nxClickOutside]`)

Emits when a click lands outside the host element - the same dismiss-on-outside-click logic
`nx-popover`/`nx-dropdown-menu`/`nx-mega-menu` already use internally, exposed for anything
custom you build yourself.

| Output | Type | Description |
| --- | --- | --- |
| `nxClickOutside` | `EventEmitter<MouseEvent>` | Emitted on the first click outside the host; clicks inside it don't trigger it. |

```html
<button (click)="panelOpen = true">Open</button>

@if (panelOpen) {
  <div class="panel" (nxClickOutside)="panelOpen = false">
    Click anywhere outside this box to close it.
  </div>
}
```

### Has Permission (`*nxHasPermission`)

A structural directive that renders its content only when a permission is granted. A
permission can be a numeric role/code (e.g. a TS enum) or a string permission key - mix both
freely, including within the same array. What "granted" means is entirely up to your app: the
directive checks against an injectable `NxPermissionChecker` that you extend and provide, and
it fails closed (content hidden, with a console warning) if no checker is registered.

| Input | Type | Description |
| --- | --- | --- |
| `nxHasPermission` | `NxPermissionValue \| NxPermissionValue[]` (`NxPermissionValue = string \| number`) | One permission, or a list evaluated as "the user has at least one of these". |

```ts
@Injectable({ providedIn: 'root' })
export class AppPermissionChecker extends NxPermissionChecker {
  private readonly auth = inject(AuthService);

  override hasPermission(permissions: NxPermissionValue | NxPermissionValue[]): boolean {
    const required = Array.isArray(permissions) ? permissions : [permissions];
    return required.some((p) =>
      typeof p === 'number'
        ? this.auth.currentUser.roleId === p
        : this.auth.currentUser.permissionCodes.includes(p),
    );
  }
}

// in your app config / module:
providers: [{ provide: NxPermissionChecker, useClass: AppPermissionChecker }]
```

```html
<button *nxHasPermission="Role.Admin">Admin panel</button>
<button *nxHasPermission="'VW_AUDT'">View audit log</button>
<button *nxHasPermission="[Role.Admin, 'DEL_INV']">Delete invoice</button>
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
