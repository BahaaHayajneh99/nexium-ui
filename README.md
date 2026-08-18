# NexiumUI

NexiumUI is an Angular component library workspace (built the same way as PrimeNG or Angular Material)
that ships a set of standalone, themeable UI components together with a demo application that
documents every component with live examples and copy-paste ready code snippets.

This workspace contains several publishable libraries:

| Package | Path | Description |
| --- | --- | --- |
| `components` | [projects/components](projects/components) | Data display, forms, feedback, panels and button components: Card, Chip, Progress Bar, Spinner, Badge, Avatar, Accordion, Tabs, Button. |
| `core` | [projects/core](projects/core) | Shared utilities/tokens used by other packages. |
| `demo` | [projects/demo](projects/demo) | The documentation/demo Angular application (this is what `ng serve` runs). |

## Installation

This repository is an Nx/Angular CLI workspace that has not been published to npm yet, so the
libraries are consumed locally through TypeScript path mappings (see `tsconfig.json`) while in
development. To get started:

```bash
git clone <this-repo>
cd NexiumUI
npm install
```

Build the component libraries so the demo app (and your own app, if you link against `dist/`)
can resolve them:

```bash
ng build components
ng build core
```

Once published, consumers would install a package the same way as any other Angular UI library:

```bash
npm install @nexiumui/components
```

```ts
// app.config.ts / standalone component imports
import { UiCard, UiChip, UiBadge, UiAvatar, UiButton } from '@nexiumui/components';
```

## Usage

Every component is a **standalone Angular component** - no `NgModule` is required. Import the
component class directly into the `imports` array of the component that uses it:

```ts
import { Component } from '@angular/core';
import { UiBadge } from 'components'; // or '@nexiumui/components' once published

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [UiBadge],
  template: `<nx-badge variant="success" rounded>New</nx-badge>`,
})
export class Example {}
```

See [projects/components/README.md](projects/components/README.md) for the full component API
reference (inputs, outputs, and usage snippets for every component).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The
demo app documents every component under the **Components** navigation menu, each with a live
preview and the exact markup needed to reproduce it.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the demo application, run:

```bash
ng build
```

To build an individual library, pass its project name:

```bash
ng build components
ng build core
```

Build artifacts are written to the `dist/` directory. By default, the production build optimizes
your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Roadmap

The demo navigation menu lists a much larger catalog of planned components (forms, uploads,
media, feedback, navigation, etc.). Components are added incrementally - see
[projects/components/README.md](projects/components/README.md) for the list of what is
implemented today.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

