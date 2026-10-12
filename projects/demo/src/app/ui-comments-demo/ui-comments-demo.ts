import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxComments, NxComment, NxCommentAddedEvent, NxCommentEditedEvent, NxCommentDeletedEvent } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-comments-demo',
  imports: [NxComments, DemoSection],
  templateUrl: './ui-comments-demo.html',
  styleUrl: './ui-comments-demo.scss',
})
export class UiCommentsDemo {
  importCode = `import { NxComments } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  /** "Bahaa" is signed in here - his own comments/replies below get edit/delete controls. */
  currentUserId = 'u-bahaa';

  // Signal rather than a plain property: commentAdded/Edited/Deleted below rebuild this
  // immutably, and in this zoneless demo app a plain property write wouldn't be picked up
  // until some unrelated click happened to trigger a re-render.
  comments = signal<NxComment[]>([
    {
      id: 'c1',
      authorId: 'u-priya',
      authorName: 'Priya',
      body: 'Really solid write-up - the section on cache invalidation finally made it click for me. Did you benchmark this against the old approach?',
      timestamp: '2026-10-05T09:15:00',
      replies: [
        {
          id: 'c1-r1',
          authorId: 'u-bahaa',
          authorName: 'Bahaa',
          body: 'Thanks! Yes - roughly 40% fewer cache misses under the same load test. I will add the numbers to the appendix.',
          timestamp: '2026-10-05T10:02:00',
          replies: [
            {
              id: 'c1-r1-r1',
              authorId: 'u-ahmed',
              authorName: 'Ahmed',
              body: 'That would be great - a before/after chart would sell this to the rest of the team instantly.',
              timestamp: '2026-10-05T10:40:00',
            },
          ],
        },
      ],
    },
    {
      id: 'c2',
      authorId: 'u-ahmed',
      authorName: 'Ahmed',
      body: 'One nit: the code sample in step 3 is missing the `await` on the fetch call - easy to miss but it bit me when I copy-pasted it.',
      timestamp: '2026-10-05T11:20:00',
    },
    {
      id: 'c3',
      authorId: 'u-bahaa',
      authorName: 'Bahaa',
      body: 'Good catch, fixing that now. Flagging this as resolved once the edit goes out.',
      timestamp: '2026-10-05T11:45:00',
    },
    {
      id: 'c4',
      authorId: 'u-system',
      authorName: 'Release Bot',
      body: 'This document was published as part of v2.4.0 and is now linked from the public changelog.',
      timestamp: '2026-10-04T18:00:00',
    },
  ]);

  onCommentAdded(event: NxCommentAddedEvent): void {
    const newComment: NxComment = {
      id: `c-${Date.now()}`,
      authorId: this.currentUserId,
      authorName: 'Bahaa',
      body: event.body,
      timestamp: new Date().toISOString(),
    };

    if (event.parentId === null) {
      this.comments.update((current) => [...current, newComment]);
      return;
    }

    this.comments.update((current) => this.insertReply(current, event.parentId!, newComment));
  }

  onCommentEdited(event: NxCommentEditedEvent): void {
    this.comments.update((current) => this.mapComments(current, (comment) =>
      comment.id === event.id ? { ...comment, body: event.body } : comment,
    ));
  }

  onCommentDeleted(event: NxCommentDeletedEvent): void {
    if (event.parentId === null) {
      this.comments.update((current) => current.filter((comment) => comment.id !== event.id));
      return;
    }

    this.comments.update((current) => this.mapComments(current, (comment) =>
      comment.id === event.parentId
        ? { ...comment, replies: (comment.replies ?? []).filter((reply) => reply.id !== event.id) }
        : comment,
    ));
  }

  /** Recursively applies `fn` to every comment in the tree, replacing each node with `fn`'s result. */
  private mapComments(comments: NxComment[], fn: (comment: NxComment) => NxComment): NxComment[] {
    return comments.map((comment) => {
      const updated = fn(comment);
      if (!updated.replies?.length) {
        return updated;
      }
      return { ...updated, replies: this.mapComments(updated.replies, fn) };
    });
  }

  /** Recursively finds `parentId` anywhere in the tree and appends `newComment` to its replies. */
  private insertReply(comments: NxComment[], parentId: string | number, newComment: NxComment): NxComment[] {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...(comment.replies ?? []), newComment] };
      }
      if (comment.replies?.length) {
        return { ...comment, replies: this.insertReply(comment.replies, parentId, newComment) };
      }
      return comment;
    });
  }

  basicCode = `<nx-comments
    [comments]="comments"
    [currentUserId]="currentUserId"
    (commentAdded)="onCommentAdded($event)"
    (commentEdited)="onCommentEdited($event)"
    (commentDeleted)="onCommentDeleted($event)">
</nx-comments>`;

  basicTs = `comments: NxComment[] = [
  {
    id: 'c1', authorId: 'u-priya', authorName: 'Priya',
    body: 'Really solid write-up...', timestamp: '2026-10-05T09:15:00',
    replies: [
      { id: 'c1-r1', authorId: 'u-bahaa', authorName: 'Bahaa',
        body: 'Thanks! Yes - roughly 40% fewer cache misses...', timestamp: '2026-10-05T10:02:00' },
    ],
  },
  // ...more root comments, each optionally with nested replies
];

onCommentAdded(event: NxCommentAddedEvent): void {
  // event.parentId is null for a new root comment, or the id of the comment replied to.
}

onCommentEdited(event: NxCommentEditedEvent): void {
  // event: { id, body } - find the comment by id (root or nested) and update its body.
}

onCommentDeleted(event: NxCommentDeletedEvent): void {
  // event: { id, parentId } - parentId is null for a root comment, else the reply's parent.
}`;

  emptyCode = `<nx-comments [comments]="[]" [currentUserId]="currentUserId" (commentAdded)="onCommentAdded($event)"></nx-comments>`;

  emptyTs = `// An empty comments array renders the "No comments yet" placeholder under the composer.`;
}
