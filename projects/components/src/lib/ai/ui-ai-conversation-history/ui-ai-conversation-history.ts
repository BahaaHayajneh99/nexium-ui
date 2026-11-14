import { Component, ElementRef, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** A single past AI chat conversation shown in the history sidebar. */
export interface NxAiConversation {
  id: string | number;
  title: string;
  updatedAt: string;
}

export type NxAiConversationBucketLabel = 'Today' | 'Yesterday' | 'Previous 7 days' | 'Older';

export interface NxAiConversationGroup {
  label: NxAiConversationBucketLabel;
  conversations: NxAiConversation[];
}

const BUCKET_ORDER: NxAiConversationBucketLabel[] = ['Today', 'Yesterday', 'Previous 7 days', 'Older'];

function bucketFor(updatedAt: string, todayStart: number): NxAiConversationBucketLabel {
  const updated = new Date(updatedAt).getTime();
  if (Number.isNaN(updated)) return 'Older';

  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
  const sevenDaysAgoStart = todayStart - 7 * 24 * 60 * 60 * 1000;

  if (updated >= todayStart) return 'Today';
  if (updated >= yesterdayStart) return 'Yesterday';
  if (updated >= sevenDaysAgoStart) return 'Previous 7 days';
  return 'Older';
}

/**
 * A sidebar-style list of past AI chat conversations (like ChatGPT's left rail): a "New chat"
 * button, a title search box, and the conversation list grouped into date buckets ("Today",
 * "Yesterday", "Previous 7 days", "Older") computed from each conversation's `updatedAt`, most
 * recently updated first within each bucket. Entirely presentation/emission - selecting, renaming
 * and deleting a conversation, and starting a new one, are all emitted for the host to carry out
 * and reflect back into `conversations`.
 */
@Component({
  selector: 'nx-ai-conversation-history',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-ai-conversation-history.html',
  styleUrl: './ui-ai-conversation-history.scss',
})
export class NxAiConversationHistory {
  protected readonly licensed = nxProLicenseGranted();

  // Backed by a signal (not a plain field) so `groups` below - a `computed()` reading it -
  // recomputes whenever the parent rebinds a new conversations array.
  private readonly conversationsSignal = signal<NxAiConversation[]>([]);
  @Input()
  get conversations(): NxAiConversation[] {
    return this.conversationsSignal();
  }
  set conversations(value: NxAiConversation[]) {
    this.conversationsSignal.set(value ?? []);
  }

  @Input() activeId: string | number | null = null;

  @Output() select = new EventEmitter<string | number>();
  @Output() rename = new EventEmitter<{ id: string | number; title: string }>();
  @Output() delete = new EventEmitter<string | number>();
  @Output() newChat = new EventEmitter<void>();

  protected readonly searchTerm = signal('');
  protected readonly renamingId = signal<string | number | null>(null);
  protected readonly renameDraft = signal('');

  protected readonly groups = computed<NxAiConversationGroup[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const source = this.conversationsSignal();
    const filtered = term ? source.filter((conversation) => conversation.title.toLowerCase().includes(term)) : source;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayStartMs = todayStart.getTime();

    const buckets = new Map<NxAiConversationBucketLabel, NxAiConversation[]>(
      BUCKET_ORDER.map((label) => [label, []]),
    );

    for (const conversation of filtered) {
      buckets.get(bucketFor(conversation.updatedAt, todayStartMs))!.push(conversation);
    }

    return BUCKET_ORDER.map((label) => ({
      label,
      conversations: [...buckets.get(label)!].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    })).filter((group) => group.conversations.length > 0);
  });

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  protected setSearch(value: string): void {
    this.searchTerm.set(value);
  }

  protected onSelect(conversation: NxAiConversation): void {
    if (this.renamingId() === conversation.id) return;
    this.select.emit(conversation.id);
  }

  protected startRename(conversation: NxAiConversation, event: Event): void {
    event.stopPropagation();
    this.renamingId.set(conversation.id);
    this.renameDraft.set(conversation.title);

    // Only one row ever renders a rename input at a time (gated by renamingId), so a plain query
    // from the host element reaches the right one once Angular has rendered it.
    setTimeout(() => {
      const input = this.elementRef.nativeElement.querySelector<HTMLInputElement>(
        '.nx-ai-conversation-history-rename-input',
      );
      input?.focus();
      input?.select();
    });
  }

  protected setRenameDraft(value: string): void {
    this.renameDraft.set(value);
  }

  protected commitRename(): void {
    const id = this.renamingId();
    if (id === null) return;
    const title = this.renameDraft().trim();
    this.renamingId.set(null);
    if (!title) return;
    this.rename.emit({ id, title });
  }

  protected cancelRename(): void {
    this.renamingId.set(null);
  }

  protected onDelete(conversation: NxAiConversation, event: Event): void {
    event.stopPropagation();
    this.delete.emit(conversation.id);
  }

  protected onNewChat(): void {
    this.newChat.emit();
  }
}
