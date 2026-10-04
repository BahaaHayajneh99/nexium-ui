import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NxChatStream, NxChatStreamMessage } from '../ui-chat-stream/ui-chat-stream';
import { NxPromptInput } from '../ui-prompt-input/ui-prompt-input';
import { NxModelSelector, NxAiModel } from '../ui-model-selector/ui-model-selector';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/**
 * A ready-to-drop-in, full chat widget. This is a COMPOSED shell around the existing AI
 * primitives - it delegates message rendering to `NxChatStream`, composing to `NxPromptInput`,
 * and (optionally) model picking to `NxModelSelector` - rather than reimplementing any of that
 * rendering itself. It does not call any AI API and does not simulate a reply: submitting a
 * message only bubbles it up via `submit`, leaving the consumer free to push whatever response
 * (and `streaming` state) they want back down through `messages`/`streaming`.
 */
@Component({
  selector: 'nx-ai-chat',
  standalone: true,
  imports: [NxChatStream, NxPromptInput, NxModelSelector, NxProLocked],
  templateUrl: './ui-ai-chat.html',
  styleUrl: './ui-ai-chat.scss',
})
export class NxAiChat {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so the template always reflects the latest array the
  // parent rebinds, including when read through accessors elsewhere in this class.
  private readonly messagesSignal = signal<NxChatStreamMessage[]>([]);
  @Input()
  get messages(): NxChatStreamMessage[] {
    return this.messagesSignal();
  }
  set messages(value: NxChatStreamMessage[]) {
    this.messagesSignal.set(value ?? []);
  }

  /** Header title shown next to (or instead of) the model selector. */
  @Input() title = 'AI Assistant';
  /** When non-empty, a model selector is shown in the header. */
  @Input() models: NxAiModel[] = [];
  @Input() selectedModelId?: string;
  @Output() selectedModelIdChange = new EventEmitter<string>();

  @Input() streaming = false;
  @Input() placeholder = 'Message...';

  /** Fires with the trimmed text the user submitted - this component never generates a reply itself. */
  @Output() submit = new EventEmitter<string>();

  protected onModelChange(id: string): void {
    this.selectedModelId = id;
    this.selectedModelIdChange.emit(id);
  }

  protected onSubmit(value: string): void {
    this.submit.emit(value);
  }
}
