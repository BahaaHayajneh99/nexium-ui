import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { NxModelSelector, NxAiModel } from '../ui-model-selector/ui-model-selector';
import { NxAiResponseViewer } from '../ui-ai-response-viewer/ui-ai-response-viewer';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxModelPlaygroundRunParams {
  modelId: string;
  prompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
}

/**
 * An interactive testing UI combining several AI primitives: a model picker, labeled parameter
 * sliders (temperature/maxTokens/topP), a prompt box, a "Run" button, and a response area that
 * reuses `NxAiResponseViewer` to render the result. This component does NOT call any real AI API:
 * clicking "Run" only emits the full current parameter set via `run` - the consumer does whatever
 * real work they want with it and feeds the outcome back in through `response`/`isRunning`.
 *
 * Bonus "Compare" (two parameter sets/responses side by side) was out of scope for this pass - this
 * is a single-run playground only.
 */
@Component({
  selector: 'nx-ai-model-playground',
  standalone: true,
  imports: [NxModelSelector, NxAiResponseViewer, NxProLocked],
  templateUrl: './ui-ai-model-playground.html',
  styleUrl: './ui-ai-model-playground.scss',
})
export class NxAiModelPlayground implements OnChanges {
  protected readonly licensed = nxProLicenseGranted();

  @Input() models: NxAiModel[] = [];
  @Input() response?: string;
  @Input() isRunning = false;

  @Output() run = new EventEmitter<NxModelPlaygroundRunParams>();

  protected readonly selectedModelId = signal<string | undefined>(undefined);
  protected readonly prompt = signal('');
  protected readonly temperature = signal(0.7);
  protected readonly maxTokens = signal(1024);
  protected readonly topP = signal(1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['models'] && !this.selectedModelId() && this.models.length) {
      this.selectedModelId.set(this.models[0].id);
    }
  }

  protected onModelChange(id: string): void {
    this.selectedModelId.set(id);
  }

  protected onPromptInput(value: string): void {
    this.prompt.set(value);
  }

  protected onTemperatureInput(value: string): void {
    this.temperature.set(Number(value));
  }

  protected onMaxTokensInput(value: string): void {
    this.maxTokens.set(Number(value));
  }

  protected onTopPInput(value: string): void {
    this.topP.set(Number(value));
  }

  protected get canRun(): boolean {
    return !!this.selectedModelId() && this.prompt().trim().length > 0 && !this.isRunning;
  }

  protected onRun(): void {
    const modelId = this.selectedModelId();
    if (!this.canRun || !modelId) {
      return;
    }
    this.run.emit({
      modelId,
      prompt: this.prompt().trim(),
      temperature: this.temperature(),
      maxTokens: this.maxTokens(),
      topP: this.topP(),
    });
  }
}
