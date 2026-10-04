import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NxIcon } from '../../data-display/ui-icon';

export interface NxAiModel {
  id: string;
  label: string;
  description?: string;
  badge?: string;
}

/**
 * A dropdown/listbox for picking an LLM model. The closed trigger shows the selected model's
 * label (or a placeholder when nothing is selected); clicking it opens a panel listing every
 * model with its label, description, and badge (e.g. "Fast", "Most capable"). Closes on an
 * outside click.
 */
@Component({
  selector: 'nx-model-selector',
  standalone: true,
  imports: [NxIcon],
  templateUrl: './ui-model-selector.html',
  styleUrl: './ui-model-selector.scss',
})
export class NxModelSelector {
  @Input() models: NxAiModel[] = [];
  @Input() selectedId?: string;
  @Input() placeholder = 'Select a model';

  @Output() selectedIdChange = new EventEmitter<string>();

  protected open = false;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  protected get selectedModel(): NxAiModel | undefined {
    return this.models.find((model) => model.id === this.selectedId);
  }

  protected toggleOpen(): void {
    this.open = !this.open;
  }

  protected selectModel(model: NxAiModel): void {
    this.selectedId = model.id;
    this.selectedIdChange.emit(model.id);
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.open && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
