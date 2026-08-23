import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  NxSelect,
  NxBadge,
  NxAvatar,
  NxAlert,
  NxChip,
  NxTable,
  NxTableColumn,
  NxProgressBarComponent,
  NxSpinnerComponent,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
  NxSelectOption,
  NxButton,
} from 'components';

type PreviewComponent =
  | 'button'
  | 'badge'
  | 'alert'
  | 'avatar'
  | 'chip'
  | 'progress-bar'
  | 'spinner'
  | 'table'
  | 'accordion';

const COLOR_VARIANTS: NxSelectOption[] = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Success', value: 'success' },
  { label: 'Danger', value: 'danger' },
  { label: 'Warning', value: 'warning' },
  { label: 'Info', value: 'info' },
];

const ALERT_VARIANTS: NxSelectOption[] = [
  { label: 'Info', value: 'info' },
  { label: 'Success', value: 'success' },
  { label: 'Danger', value: 'danger' },
  { label: 'Warning', value: 'warning' },
];

@Component({
  selector: 'app-playground-demo',
  imports: [
    NxSelect,
    NxButton,
    NxBadge,
    NxAvatar,
    NxAlert,
    NxChip,
    NxTable,
    NxProgressBarComponent,
    NxSpinnerComponent,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
    NgClass
  ],
  templateUrl: './playground-demo.html',
  styleUrl: './playground-demo.scss',
})
export class PlaygroundDemo {
  componentOptions: NxSelectOption[] = [
    { label: 'Button', value: 'button' },
    { label: 'Badge', value: 'badge' },
    { label: 'Alert', value: 'alert' },
    { label: 'Avatar', value: 'avatar' },
    { label: 'Chip', value: 'chip' },
    { label: 'Progress Bar', value: 'progress-bar' },
    { label: 'Spinner', value: 'spinner' },
    { label: 'Table', value: 'table' },
    { label: 'Accordion', value: 'accordion' },
  ];

  sizeOptions: NxSelectOption[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  // Components not listed here (table, accordion) render a fixed preview with no variant/size controls.
  private readonly variantOptionsByComponent: Partial<Record<PreviewComponent, NxSelectOption[]>> = {
    button: COLOR_VARIANTS,
    badge: COLOR_VARIANTS,
    avatar: COLOR_VARIANTS,
    chip: COLOR_VARIANTS,
    'progress-bar': COLOR_VARIANTS,
    spinner: COLOR_VARIANTS,
    alert: ALERT_VARIANTS,
  };

  private readonly sizableComponents: ReadonlySet<PreviewComponent> = new Set([
    'button',
    'badge',
    'avatar',
    'progress-bar',
    'spinner',
  ]);

  selectedComponent: PreviewComponent = 'button';
  variant = 'primary';
  size = 'medium';
  copied = false;

  tableColumns: NxTableColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'role', header: 'Role' },
  ];

  tableData: Record<string, unknown>[] = [
    { name: 'Ada Lovelace', role: 'Engineer' },
    { name: 'Grace Hopper', role: 'Admiral' },
  ];

  get variantOptions(): NxSelectOption[] {
    return this.variantOptionsByComponent[this.selectedComponent] ?? [];
  }

  get hasVariant(): boolean {
    return this.variantOptions.length > 0;
  }

  get hasSize(): boolean {
    return this.sizableComponents.has(this.selectedComponent);
  }

  onComponentChange(value: string): void {
    this.selectedComponent = value as PreviewComponent;

    const options = this.variantOptionsByComponent[this.selectedComponent];
    if (options && !options.some((option) => option.value === this.variant)) {
      this.variant = options[0].value;
    }
  }

  get code(): string {
    switch (this.selectedComponent) {
      case 'button':
        return `<nx-button variant="${this.variant}" size="${this.size}">Click me</nx-button>`;
      case 'badge':
        return `<nx-badge variant="${this.variant}" size="${this.size}">New</nx-badge>`;
      case 'avatar':
        return `<nx-avatar name="Ada Lovelace" variant="${this.variant}" size="${this.size}"></nx-avatar>`;
      case 'alert':
        return `<nx-alert variant="${this.variant}" title="Heads up">This is a ${this.variant} alert.</nx-alert>`;
      case 'chip':
        return `<nx-chip variant="${this.variant}">New</nx-chip>`;
      case 'progress-bar':
        return `<nx-progress-bar [value]="60" variant="${this.variant}" size="${this.size}"></nx-progress-bar>`;
      case 'spinner':
        return `<nx-spinner variant="${this.variant}" size="${this.size}"></nx-spinner>`;
      case 'table':
        return `<nx-table [columns]="columns" [data]="data" striped hoverable></nx-table>`;
      case 'accordion':
        return `<nx-accordion>
    <nx-accordion-item>
        <nx-accordion-header>Personal Information</nx-accordion-header>
        <nx-accordion-content>User profile details and information.</nx-accordion-content>
    </nx-accordion-item>
</nx-accordion>`;
      default:
        return '';
    }
  }

  copyCode(): void {
    this.copied = true;
    setTimeout(() => (this.copied = false), 2000);

    navigator.clipboard.writeText(this.code).catch(() => this.copyWithFallback(this.code));
  }

  private copyWithFallback(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
