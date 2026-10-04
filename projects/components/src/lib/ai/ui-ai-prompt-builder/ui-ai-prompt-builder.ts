import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { NxTokenCounter } from '../ui-token-counter/ui-token-counter';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxPromptVariable {
  name: string;
  defaultValue?: string;
}

export interface NxPromptTemplate {
  id: string;
  name: string;
  systemText?: string;
  userText: string;
  variables: NxPromptVariable[];
}

const VARIABLE_TOKEN_RE = /\{\{\s*([a-zA-Z_][\w]*)\s*\}\}/g;

function extractVariableNames(text: string): string[] {
  const names: string[] = [];
  const seen = new Set<string>();
  let match: RegExpExecArray | null;
  VARIABLE_TOKEN_RE.lastIndex = 0;
  while ((match = VARIABLE_TOKEN_RE.exec(text))) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      names.push(match[1]);
    }
  }
  return names;
}

function substitute(text: string, values: Record<string, string>): string {
  return text.replace(VARIABLE_TOKEN_RE, (full, name: string) => (values[name] != null && values[name] !== '' ? values[name] : full));
}

function generateId(): string {
  return `tpl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * A structured tool for building REUSABLE prompt TEMPLATES with `{{variableName}}` slots - distinct
 * from the plain chat composer `NxPromptInput`, which just submits a one-off message. Typing a new
 * `{{...}}` token into either text area automatically adds it to the variables list; deleting the
 * last occurrence of a token automatically drops it again - there's no separate manual "add
 * variable" step. The "Fill & Preview" panel then lets you supply a value per variable and see the
 * final, substituted prompt (and its estimated token count) before using it.
 */
@Component({
  selector: 'nx-ai-prompt-builder',
  standalone: true,
  imports: [NxTokenCounter, NxIcon, NxProLocked],
  templateUrl: './ui-ai-prompt-builder.html',
  styleUrl: './ui-ai-prompt-builder.scss',
})
export class NxAiPromptBuilder {
  protected readonly licensed = nxProLicenseGranted();

  @Input() templates: NxPromptTemplate[] = [];
  @Output() templatesChange = new EventEmitter<NxPromptTemplate[]>();
  @Output() promptGenerated = new EventEmitter<string>();

  protected readonly activeTemplateId = signal<string | null>(null);
  protected readonly templateName = signal('Untitled template');
  protected readonly systemText = signal('');
  protected readonly userText = signal('');

  protected readonly variables = signal<NxPromptVariable[]>([]);
  protected readonly fillValues = signal<Record<string, string>>({});

  readonly renderedPrompt = computed(() => {
    const values = this.fillValues();
    const system = substitute(this.systemText(), values).trim();
    const user = substitute(this.userText(), values).trim();
    return system ? `${system}\n\n${user}` : user;
  });

  protected onSystemTextInput(value: string): void {
    this.systemText.set(value);
    this.syncVariables();
  }

  protected onUserTextInput(value: string): void {
    this.userText.set(value);
    this.syncVariables();
  }

  protected setFillValue(name: string, value: string): void {
    this.fillValues.update((current) => ({ ...current, [name]: value }));
  }

  protected setVariableDefault(name: string, defaultValue: string): void {
    this.variables.update((current) => current.map((v) => (v.name === name ? { ...v, defaultValue } : v)));
  }

  private syncVariables(): void {
    const names = extractVariableNames(`${this.systemText()}\n${this.userText()}`);
    const existing = new Map(this.variables().map((v) => [v.name, v]));
    const next = names.map((name) => existing.get(name) ?? { name, defaultValue: '' });
    this.variables.set(next);

    const existingFill = this.fillValues();
    const nextFill: Record<string, string> = {};
    for (const v of next) {
      nextFill[v.name] = existingFill[v.name] ?? v.defaultValue ?? '';
    }
    this.fillValues.set(nextFill);
  }

  protected newTemplate(): void {
    this.activeTemplateId.set(null);
    this.templateName.set('Untitled template');
    this.systemText.set('');
    this.userText.set('');
    this.syncVariables();
  }

  protected loadTemplate(template: NxPromptTemplate): void {
    this.activeTemplateId.set(template.id);
    this.templateName.set(template.name);
    this.systemText.set(template.systemText ?? '');
    this.userText.set(template.userText);
    this.syncVariables();
  }

  protected saveTemplate(): void {
    const id = this.activeTemplateId() ?? generateId();
    const template: NxPromptTemplate = {
      id,
      name: this.templateName().trim() || 'Untitled template',
      systemText: this.systemText().trim() || undefined,
      userText: this.userText(),
      variables: this.variables(),
    };
    const next = [...this.templates.filter((t) => t.id !== id), template];
    this.activeTemplateId.set(id);
    this.templatesChange.emit(next);
  }

  protected deleteTemplate(template: NxPromptTemplate): void {
    this.templatesChange.emit(this.templates.filter((t) => t.id !== template.id));
    if (this.activeTemplateId() === template.id) {
      this.newTemplate();
    }
  }

  protected usePrompt(): void {
    this.promptGenerated.emit(this.renderedPrompt());
  }
}
