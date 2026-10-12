import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NxIcon } from '../ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

export interface NxComment {
  id: string | number;
  authorId: string | number;
  authorName: string;
  authorAvatarUrl?: string;
  body: string;
  /** ISO timestamp (or anything `Date` can parse). */
  timestamp: string | Date;
  replies?: NxComment[];
}

/** Payload for `commentAdded` - a brand-new root comment or reply. */
export interface NxCommentAddedEvent {
  body: string;
  /** The comment this is a reply to, or `null` for a new root-level comment. */
  parentId: string | number | null;
}

/** Payload for `commentEdited` - an existing comment's body was changed. */
export interface NxCommentEditedEvent {
  id: string | number;
  body: string;
}

/** Payload for `commentDeleted` - identifies the comment and, if it's a reply, its parent. */
export interface NxCommentDeletedEvent {
  id: string | number;
  parentId: string | number | null;
}

/**
 * A threaded comment list with an inline editor for posting replies - suitable for a blog post,
 * support ticket, or document. Renders author/avatar/timestamp/body for each comment plus its
 * nested replies, a top-level composer for new root comments, and a per-comment "Reply" toggle
 * that reveals a small scoped textarea. Edit/delete controls only appear on the current user's
 * own comments (see `currentUserId`). This component never mutates `comments` itself - it only
 * emits `commentAdded`/`commentEdited`/`commentDeleted` so the host app can persist the change
 * and rebind the updated list.
 */
@Component({
  selector: 'nx-comments',
  standalone: true,
  imports: [NgTemplateOutlet, NxIcon, NxProLocked],
  templateUrl: './ui-comments.html',
  styleUrl: './ui-comments.scss',
})
export class NxComments {
  protected readonly licensed = nxProLicenseGranted();

  @Input() comments: NxComment[] = [];
  /** The signed-in user's id - edit/delete controls only render on comments whose `authorId` matches this. */
  @Input() currentUserId: string | number | null = null;
  @Input() placeholder = 'Write a comment...';
  @Input() replyPlaceholder = 'Write a reply...';

  /** A new root comment, or a reply, was posted. */
  @Output() commentAdded = new EventEmitter<NxCommentAddedEvent>();
  /** An existing comment's body was saved after editing. */
  @Output() commentEdited = new EventEmitter<NxCommentEditedEvent>();
  /** A comment (root or reply) was deleted. */
  @Output() commentDeleted = new EventEmitter<NxCommentDeletedEvent>();

  /** Draft text for the top-level composer. */
  composerDraft = signal('');

  /** Which comment's reply box is currently open, if any. */
  private readonly openReplyId = signal<string | number | null>(null);
  /** Draft text for whichever reply box is open. */
  replyDraft = signal('');

  /** Which comment is currently being edited in place, if any. */
  private readonly editingId = signal<string | number | null>(null);
  /** Draft text for whichever comment is being edited. */
  editDraft = signal('');

  isReplying(comment: NxComment): boolean {
    return this.openReplyId() === comment.id;
  }

  isEditing(comment: NxComment): boolean {
    return this.editingId() === comment.id;
  }

  isOwn(comment: NxComment): boolean {
    return this.currentUserId !== null && comment.authorId === this.currentUserId;
  }

  initialFor(name: string): string {
    return name.trim().charAt(0).toUpperCase() || '?';
  }

  /** A consistent hue (0-359) per author name, used to tint the fallback initial-letter avatar. */
  avatarHueFor(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    }
    return hash % 360;
  }

  timeLabel(timestamp: string | Date): string {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.round(diffMs / 60000);

    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }

  postRootComment(): void {
    const body = this.composerDraft().trim();
    if (!body) {
      return;
    }
    this.commentAdded.emit({ body, parentId: null });
    this.composerDraft.set('');
  }

  toggleReply(comment: NxComment): void {
    if (this.openReplyId() === comment.id) {
      this.openReplyId.set(null);
      this.replyDraft.set('');
    } else {
      this.openReplyId.set(comment.id);
      this.replyDraft.set('');
    }
  }

  postReply(parent: NxComment): void {
    const body = this.replyDraft().trim();
    if (!body) {
      return;
    }
    this.commentAdded.emit({ body, parentId: parent.id });
    this.openReplyId.set(null);
    this.replyDraft.set('');
  }

  startEdit(comment: NxComment): void {
    this.editingId.set(comment.id);
    this.editDraft.set(comment.body);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editDraft.set('');
  }

  saveEdit(comment: NxComment): void {
    const body = this.editDraft().trim();
    if (!body) {
      return;
    }
    this.commentEdited.emit({ id: comment.id, body });
    this.editingId.set(null);
    this.editDraft.set('');
  }

  deleteComment(comment: NxComment, parentId: string | number | null): void {
    this.commentDeleted.emit({ id: comment.id, parentId });
  }
}
