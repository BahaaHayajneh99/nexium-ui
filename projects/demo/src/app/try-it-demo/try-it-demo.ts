// Enables the Angular JIT template compiler at runtime so we can turn
// arbitrary user-typed HTML into a real, live-rendered component below.
import '@angular/compiler';

import { CommonModule } from '@angular/common';
import * as angularCommonNs from '@angular/common';
import * as angularCoreNs from '@angular/core';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  computed,
  signal,
} from '@angular/core';
import * as angularFormsNs from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as rxjsNs from 'rxjs';
import { NexiumUiModule, NxSelect, NxSelectOption } from 'components';
import * as nexiumUiNs from 'components';
import { highlightHtml } from '../shared/demo-section/code-highlight';
import { highlightTs } from '../shared/demo-section/ts-highlight';

// Type-only: never bundled, since we load the real compilers from CDN
// script tags instead of importing these npm packages (see loadRuntime()).
type TypeScriptModule = typeof import('typescript');

const TYPESCRIPT_CDN_URL = 'https://cdn.jsdelivr.net/npm/typescript@5.9.3/lib/typescript.js';
const REFLECT_METADATA_CDN_URL = 'https://cdn.jsdelivr.net/npm/reflect-metadata@0.2.2/Reflect.js';

// The modules a "component.ts" pane is allowed to `import ... from` - each
// entry is the real, already-bundled module namespace, so a user's import
// statement just resolves to it instead of triggering an actual module load.
const MODULE_REGISTRY: Record<string, Record<string, unknown>> = {
  '@angular/core': angularCoreNs as unknown as Record<string, unknown>,
  '@angular/common': angularCommonNs as unknown as Record<string, unknown>,
  '@angular/forms': angularFormsNs as unknown as Record<string, unknown>,
  rxjs: rxjsNs as unknown as Record<string, unknown>,
  components: nexiumUiNs as unknown as Record<string, unknown>,
  'nexium-ui': nexiumUiNs as unknown as Record<string, unknown>,
};

type TryItTab = 'html' | 'ts';

interface TryItExample {
  label: string;
  value: string;
  html: string;
  ts: string;
}

const EXAMPLES: TryItExample[] = [
  {
    label: 'Button + click handler',
    value: 'button',
    html: `<nx-button variant="primary" (click)="increment()">
    Clicked {{ count }} times
</nx-button>`,
    ts: `export class TryItComponent {
  count = 0;

  increment(): void {
    this.count++;
  }
}`,
  },
  {
    label: 'Card',
    value: 'card',
    html: `<nx-card>
    <nx-card-header>
        <nx-card-title>{{ title }}</nx-card-title>
        <nx-card-subtitle>Edit me on the left</nx-card-subtitle>
    </nx-card-header>
    <nx-card-content>
        This card is rendered live from the code you write.
    </nx-card-content>
    <nx-card-footer>
        <nx-button variant="primary" size="small">Continue</nx-button>
    </nx-card-footer>
</nx-card>`,
    ts: `export class TryItComponent {
  title = 'Hello NexaUI';
}`,
  },
  {
    label: 'Alert + Badge',
    value: 'alert',
    html: `<nx-alert variant="success" title="Nice!">
    Change this text or the variant to see it update instantly.
</nx-alert>

<nx-badge variant="info">Live preview</nx-badge>`,
    ts: `export class TryItComponent {}`,
  },
  {
    label: 'Loop + chips',
    value: 'loop',
    html: `<div style="display:flex; gap:8px; flex-wrap:wrap;">
    @for (variant of colors; track variant) {
        <nx-chip [variant]="variant">{{ variant }}</nx-chip>
    }
</div>`,
    ts: `export class TryItComponent {
  colors = ['primary', 'success', 'warning', 'danger'];
}`,
  },
  {
    label: 'Reactive form (inject())',
    value: 'form',
    html: `<form [formGroup]="form">
    <nx-input
        label="Name"
        formControlName="name"
        [error]="name?.invalid && name?.touched ? 'Name is required' : ''">
    </nx-input>

    <nx-button
        variant="primary"
        [disabled]="form.invalid"
        (click)="form.markAllAsTouched()">
        Submit
    </nx-button>
</form>`,
    ts: `import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class TryItComponent {
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  get name() {
    return this.form.get('name');
  }
}`,
  },
  {
    label: 'Reactive form (constructor DI)',
    value: 'form-constructor',
    html: `<form [formGroup]="form" (ngSubmit)="submit()">
    <nx-input
        label="Name"
        formControlName="name"
        [error]="name?.invalid && name?.touched ? 'Name is required' : ''">
    </nx-input>

    <nx-input
        label="Email"
        formControlName="email"
        [error]="email?.invalid && email?.touched ? 'Enter a valid email' : ''">
    </nx-input>

    <nx-button
        variant="primary"
        [disabled]="form.invalid"
        (click)="form.markAllAsTouched()">
        Submit
    </nx-button>

    @if (submitted) {
        <p>Submitted: {{ form.value | json }}</p>
    }
</form>`,
    ts: `import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class TryItComponent {
  form: FormGroup;
  submitted = false;

  // Constructor-based DI works exactly like a real Angular component -
  // FormBuilder is injected the classic way, no inject() needed.
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;
  }
}`,
  },
  {
    label: 'Todo list (helper service + DI)',
    value: 'todo-service',
    html: `<div style="display:flex; flex-direction:column; gap:12px; max-width:360px;">
    <div style="display:flex; gap:8px;">
        <nx-input placeholder="Add a task..." [(value)]="draft" (keydown.enter)="addTodo()"></nx-input>
        <nx-button variant="primary" (click)="addTodo()">Add</nx-button>
    </div>

    @for (todo of todos; track todo.id) {
        <div style="display:flex; align-items:center; gap:8px;">
            <nx-checkbox [(checked)]="todo.done"></nx-checkbox>
            <span [style.text-decoration]="todo.done ? 'line-through' : 'none'">{{ todo.label }}</span>
        </div>
    }
</div>`,
    ts: `// Anything is fair game above the component - helper types, functions,
// even your own injectable service. It's all real TypeScript, compiled live.
import { Injectable, inject } from '@angular/core';

interface Todo {
  id: number;
  label: string;
  done: boolean;
}

function makeTodo(label: string): Todo {
  return { id: Date.now() + Math.random(), label, done: false };
}

@Injectable({ providedIn: 'root' })
class TodoService {
  todos: Todo[] = [makeTodo('Write docs'), makeTodo('Ship it')];

  add(label: string): void {
    this.todos.push(makeTodo(label));
  }
}

export class TryItComponent {
  private svc = inject(TodoService);
  draft = '';

  get todos() {
    return this.svc.todos;
  }

  addTodo(): void {
    if (!this.draft.trim()) {
      return;
    }
    this.svc.add(this.draft);
    this.draft = '';
  }
}`,
  },
];

@Component({
  selector: 'app-try-it-demo',
  imports: [NxSelect],
  templateUrl: './try-it-demo.html',
  styleUrl: './try-it-demo.scss',
})
export class TryItDemo implements AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('previewHost', { read: ViewContainerRef, static: true })
  previewHost!: ViewContainerRef;

  // Deliberately NOT a `[value]` template binding - a controlled textarea
  // that re-applies its own value from a signal on every change-detection
  // pass fights the browser's native caret/selection state (any transient
  // mismatch - e.g. mid drag-select, or a CD pass that runs for an unrelated
  // reason - forces a `.value` write that collapses the current selection
  // or resets the caret), corrupting normal typing and selecting. The
  // textarea owns its DOM value natively; `pendingTextareaSync` below makes
  // ngAfterViewChecked a no-op except in the one tick right after an
  // explicit tab switch or example change, where the (freshly (re)rendered)
  // textarea genuinely needs its content set from scratch.
  @ViewChild('activeTextarea') private activeTextareaRef?: ElementRef<HTMLTextAreaElement>;
  private pendingTextareaSync = true;

  readonly exampleOptions: NxSelectOption[] = EXAMPLES.map((example) => ({
    label: example.label,
    value: example.value,
  }));

  selectedExample = EXAMPLES[0].value;
  activeTab = signal<TryItTab>('html');
  htmlCode = signal(EXAMPLES[0].html);
  tsCode = signal(EXAMPLES[0].ts);
  error = signal<string | null>(null);
  copied = false;

  readonly highlightedHtml = computed(() => highlightHtml(this.htmlCode()));
  readonly highlightedTs = computed(() => highlightTs(this.tsCode()));

  private componentRef: ComponentRef<unknown> | null = null;
  private renderTimer: ReturnType<typeof setTimeout> | null = null;
  private tsModule: TypeScriptModule | null = null;
  private runtimeLoadPromise: Promise<TypeScriptModule> | null = null;

  ngAfterViewInit(): void {
    this.render();
  }

  ngAfterViewChecked(): void {
    if (!this.pendingTextareaSync) {
      return;
    }

    const textarea = this.activeTextareaRef?.nativeElement;
    if (!textarea) {
      // The tab/example just changed and the new textarea hasn't been
      // (re)created yet - keep the flag set and try again on the next check.
      return;
    }

    textarea.value = this.activeTab() === 'html' ? this.htmlCode() : this.tsCode();
    this.pendingTextareaSync = false;
  }

  ngOnDestroy(): void {
    if (this.renderTimer) {
      clearTimeout(this.renderTimer);
    }
    this.componentRef?.destroy();
  }

  setActiveTab(tab: TryItTab): void {
    this.activeTab.set(tab);
    this.pendingTextareaSync = true;
  }

  onHtmlInput(value: string): void {
    this.htmlCode.set(value);
    this.scheduleRender();
  }

  onTsInput(value: string): void {
    this.tsCode.set(value);
    this.scheduleRender();
  }

  onExampleChange(value: string): void {
    this.selectedExample = value;
    const example = EXAMPLES.find((item) => item.value === value);
    if (!example) {
      return;
    }

    this.htmlCode.set(example.html);
    this.tsCode.set(example.ts);
    this.pendingTextareaSync = true;
    this.render();
  }

  copyCode(): void {
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);

    const code = this.activeTab() === 'ts' ? this.tsCode() : this.htmlCode();
    navigator.clipboard?.writeText(code).catch(() => {});
  }

  syncScroll(event: Event, highlightLayer: HTMLElement): void {
    const textarea = event.target as HTMLTextAreaElement;
    highlightLayer.scrollTop = textarea.scrollTop;
    highlightLayer.scrollLeft = textarea.scrollLeft;
  }

  private scheduleRender(): void {
    if (this.renderTimer) {
      clearTimeout(this.renderTimer);
    }
    this.renderTimer = setTimeout(() => this.render(), 300);
  }

  private async render(): Promise<void> {
    const template = this.htmlCode();
    const source = this.tsCode();

    let userClass: new () => unknown;
    try {
      userClass = await this.compileComponentClass(source);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : String(err));
      return;
    }

    this.componentRef?.destroy();
    this.componentRef = null;
    this.previewHost.clear();

    if (!template.trim()) {
      this.error.set(null);
      return;
    }

    try {
      // The decorator is applied by calling it directly (rather than with
      // `@Component(...)` syntax) so the build's AOT compiler doesn't try
      // to statically analyze this runtime-only template string. Turning
      // the user's own class into the component class (instead of wrapping
      // it) means their methods/properties/constructor DI bind exactly
      // like a real Angular component.
      Component({
        selector: 'app-try-it-preview',
        imports: [CommonModule, FormsModule, ReactiveFormsModule, NexiumUiModule],
        template,
      })(userClass);

      this.componentRef = this.previewHost.createComponent(userClass);
      this.componentRef.changeDetectorRef.detectChanges();
      this.error.set(null);
    } catch (err) {
      this.componentRef = null;
      this.error.set(err instanceof Error ? err.message : String(err));
    }
  }

  private async compileComponentClass(source: string): Promise<new () => unknown> {
    const ts = await this.loadRuntime();

    const { prelude, remainingSource } = this.extractImports(source);

    const exportedClassMatch = remainingSource.match(
      /export\s+(?:default\s+)?(?:abstract\s+)?class\s+([A-Za-z_$][\w$]*)/
    );
    if (!exportedClassMatch) {
      throw new Error('Write a single exported class, e.g. "export class TryItComponent { }".');
    }
    const className = exportedClassMatch[1];

    // Forces TypeScript to emit constructor parameter metadata
    // (design:paramtypes) for the component class, so constructor-based DI
    // (e.g. `constructor(private fb: FormBuilder)`) resolves the same way
    // Angular's own reflection-based JIT does, via the reflect-metadata
    // polyfill loaded in loadRuntime(). Functional `inject()` doesn't need
    // this, but costs nothing extra to also support.
    const withMetadataTrigger = remainingSource.replace(
      exportedClassMatch[0],
      `@__ngMetadataTrigger()\nclass ${className}`
    );

    const { outputText, diagnostics } = ts.transpileModule(withMetadataTrigger, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.None,
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
      reportDiagnostics: true,
    });

    if (diagnostics?.length) {
      const message = diagnostics
        .map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
        .join('\n');
      throw new Error(message);
    }

    const body = `${prelude}function __ngMetadataTrigger() { return (target) => target; }\n${outputText}\nreturn ${className};`;
    const factory = new Function('__modules', body);
    return factory(MODULE_REGISTRY) as new () => unknown;
  }

  // Rewrites the top-level `import ... from '...'` statements in a
  // component.ts pane into plain `const` destructuring against the
  // already-bundled modules in MODULE_REGISTRY - `import` itself is only
  // valid at ES-module top level, and we evaluate the compiled class inside
  // a plain function body via `new Function`.
  private extractImports(source: string): { prelude: string; remainingSource: string } {
    const importRe =
      /import\s+(type\s+)?(?:(\*\s+as\s+[A-Za-z_$][\w$]*)|(\{[\s\S]*?\})|([A-Za-z_$][\w$]*))\s+from\s+['"]([^'"]+)['"]\s*;?/g;

    let prelude = '';
    const remainingSource = source.replace(
      importRe,
      (
        _full: string,
        typeOnly: string | undefined,
        nsImport: string | undefined,
        namedImport: string | undefined,
        defaultImport: string | undefined,
        moduleSpecifier: string
      ) => {
        // Type-only imports carry no runtime value and are fully erased by
        // the transpile step, so there's nothing to resolve.
        if (typeOnly) {
          return '';
        }

        const moduleExports = MODULE_REGISTRY[moduleSpecifier];
        if (!moduleExports) {
          throw new Error(
            `Unsupported import from "${moduleSpecifier}". Available modules: ${Object.keys(MODULE_REGISTRY).join(', ')}.`
          );
        }

        const specifierLiteral = JSON.stringify(moduleSpecifier);

        if (nsImport) {
          const alias = nsImport.replace(/^\*\s+as\s+/, '').trim();
          prelude += `const ${alias} = __modules[${specifierLiteral}];\n`;
        } else if (namedImport) {
          const destructure = namedImport
            .slice(1, -1)
            .split(',')
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => {
              const asMatch = part.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
              return asMatch ? `${asMatch[1]}: ${asMatch[2]}` : part;
            })
            .join(', ');
          prelude += `const { ${destructure} } = __modules[${specifierLiteral}];\n`;
        } else if (defaultImport) {
          prelude += `const ${defaultImport} = __modules[${specifierLiteral}].default ?? __modules[${specifierLiteral}];\n`;
        }

        return '';
      }
    );

    return { prelude, remainingSource };
  }

  // Loads the TypeScript compiler and the reflect-metadata polyfill from a
  // CDN as plain <script> tags, rather than importing the npm packages, so
  // the ~9MB compiler never has to be resolved by the app's own bundler and
  // only ever reaches the browser if this page is visited.
  private loadRuntime(): Promise<TypeScriptModule> {
    if (this.tsModule) {
      return Promise.resolve(this.tsModule);
    }
    if (this.runtimeLoadPromise) {
      return this.runtimeLoadPromise;
    }

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error(`Could not load "${src}". Check your network connection.`));
        document.head.appendChild(script);
      });

    this.runtimeLoadPromise = (async () => {
      const win = window as unknown as { ts?: TypeScriptModule; Reflect?: { metadata?: unknown } };

      if (!win.Reflect?.metadata) {
        await loadScript(REFLECT_METADATA_CDN_URL);
      }
      if (!win.ts) {
        await loadScript(TYPESCRIPT_CDN_URL);
      }

      const loaded = (window as unknown as { ts?: TypeScriptModule }).ts;
      if (!loaded) {
        throw new Error('The TypeScript compiler script loaded but did not expose "ts".');
      }

      this.tsModule = loaded;
      return loaded;
    })();

    return this.runtimeLoadPromise;
  }
}
