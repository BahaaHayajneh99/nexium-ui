import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIcon } from '../../data-display/ui-icon';
import { NxProLocked } from '../../licensing/ui-pro-locked/ui-pro-locked';
import { nxProLicenseGranted } from '../../licensing/nx-license';

/** How the approvers at a stage must act relative to one another. */
export type NxApprovalMode = 'sequential' | 'parallel';

/** Lifecycle status of a single approver's decision within a stage. */
export type NxApprovalStepStatus = 'pending' | 'approved' | 'rejected';

/** Derived, display-level status of a whole stage. */
export type NxApprovalStageStatus = 'pending' | 'active' | 'approved' | 'rejected';

/** One person (or role) who must weigh in at a stage. */
export interface NxApprovalStep {
  id: string | number;
  name: string;
  /** Optional role/title shown under the name, e.g. "Engineering Manager". */
  role?: string;
  /** Optional avatar initials/image url; when omitted the UI derives initials from `name`. */
  avatar?: string;
  status: NxApprovalStepStatus;
  /** Comment left alongside this approver's decision (or while still pending). */
  comment?: string;
  /** ISO timestamp of when this approver last acted. Unset while still pending. */
  actedAt?: string;
}

/**
 * One stage of the workflow, e.g. "Manager Review". A stage with no `approvers` is treated as a
 * plain phase marker (such as a starting "Draft" or terminal "Completed" step) that advances
 * automatically once every stage before it clears, rather than one that needs explicit action.
 */
export interface NxApprovalStage {
  id: string | number;
  name: string;
  /** Optional short description shown under the stage name when its detail panel is expanded. */
  description?: string;
  mode: NxApprovalMode;
  approvers: NxApprovalStep[];
  /** Parallel mode only: how many approvals are required to clear the stage. Defaults to all approvers. */
  quorum?: number;
}

/**
 * A single chronological log entry - one approve, reject, or standalone comment - kept
 * independently of the stage/approver state so the full history survives even as stage statuses
 * change, and so a host app has a flat list it can persist or render as a changelog.
 */
export interface NxApprovalHistoryEntry {
  id: string;
  stageId: string | number;
  stageName: string;
  approverId: string | number;
  approverName: string;
  action: 'approved' | 'rejected' | 'commented';
  comment?: string;
  /** ISO timestamp. */
  timestamp: string;
}

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

/**
 * Visualizes and drives a multi-stage approval process - a horizontal stage rail plus an
 * expandable detail panel per stage (who needs to act, in what order, and what they said) and a
 * chronological history log underneath. Stage/approver statuses are derived live from the
 * `stages` input rather than tracked separately, so the rail, the detail panel, and "whose turn
 * is it" all stay consistent with a single source of truth.
 */
@Component({
  selector: 'nx-approval-workflow',
  standalone: true,
  imports: [FormsModule, NxIcon, NxProLocked],
  templateUrl: './ui-approval-workflow.html',
  styleUrl: './ui-approval-workflow.scss',
})
export class NxApprovalWorkflow {
  protected readonly licensed = nxProLicenseGranted();

  // Signal-backed (not a plain field) so the `computed()`s below actually re-run when the parent
  // rebinds a new `stages` array, or when this component mutates its own copy on approve/reject.
  private readonly stagesSignal = signal<NxApprovalStage[]>([]);
  @Input()
  get stages(): NxApprovalStage[] {
    return this.stagesSignal();
  }
  set stages(value: NxApprovalStage[]) {
    this.stagesSignal.set(value ?? []);
  }
  @Output() stagesChange = new EventEmitter<NxApprovalStage[]>();

  private readonly historySignal = signal<NxApprovalHistoryEntry[]>([]);
  /** Optional - seed with persisted history so it survives a reload; this component also appends to it as actions happen. */
  @Input()
  get history(): NxApprovalHistoryEntry[] {
    return this.historySignal();
  }
  set history(value: NxApprovalHistoryEntry[]) {
    this.historySignal.set(value ?? []);
  }
  @Output() historyChange = new EventEmitter<NxApprovalHistoryEntry[]>();

  /** When set, only the approver whose id matches may act (everyone else sees their row read-only) - models "you can only act as yourself". Leave unset to let any approver act, e.g. for an admin/demo view. */
  @Input() currentApproverId?: string | number;

  @Output() approve = new EventEmitter<NxApprovalHistoryEntry>();
  @Output() reject = new EventEmitter<NxApprovalHistoryEntry>();
  @Output() comment = new EventEmitter<NxApprovalHistoryEntry>();

  /** Stage ids the viewer explicitly expanded/collapsed, overriding the default (active stage auto-expanded, others collapsed). */
  private readonly expandedOverrides = signal<Map<string | number, boolean>>(new Map());

  /** Composite `stageId:approverId` key -> in-progress comment draft. */
  private readonly drafts = signal<Record<string, string>>({});
  /** Composite key of the approver row whose comment box is currently open (one at a time). */
  readonly openCommentKey = signal<string | null>(null);

  /** Index of the stage that currently needs action - the first unapproved stage, or the first rejected one (which halts progress there), or the last stage once everything has cleared. */
  readonly currentStageIndex = computed(() => {
    const list = this.stages;
    for (let i = 0; i < list.length; i++) {
      const stage = list[i];
      if (this.isStageRejected(stage) || !this.isStageComplete(stage)) {
        return i;
      }
    }
    return Math.max(list.length - 1, 0);
  });

  /** True once any stage has been rejected - the whole workflow is halted and flagged, not silently skipped. */
  readonly isHalted = computed(() => this.stages.some((s) => this.isStageRejected(s)));

  /** True once the final stage is reached and clears with nothing rejected along the way. */
  readonly isCompleted = computed(() => {
    const list = this.stages;
    if (!list.length || this.isHalted()) return false;
    return this.currentStageIndex() === list.length - 1 && this.isStageComplete(list[list.length - 1]);
  });

  /** Newest-first changelog - what a host passed in via `history`, plus everything logged here since. */
  readonly sortedHistory = computed(() =>
    [...this.history].sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
  );

  stageIndex(stage: NxApprovalStage): number {
    return this.stages.findIndex((s) => s.id === stage.id);
  }

  /** How many approvals a stage needs to clear - every approver in sequential mode, or the quorum (default: everyone) in parallel mode. */
  requiredApprovals(stage: NxApprovalStage): number {
    const total = stage.approvers?.length ?? 0;
    if (!total) return 0;
    if (stage.mode === 'parallel') {
      const quorum = stage.quorum ?? total;
      return Math.min(Math.max(quorum, 1), total);
    }
    return total;
  }

  approvedCount(stage: NxApprovalStage): number {
    return stage.approvers.filter((a) => a.status === 'approved').length;
  }

  isStageRejected(stage: NxApprovalStage): boolean {
    return stage.approvers?.some((a) => a.status === 'rejected') ?? false;
  }

  /** A stage with no approvers is a pass-through phase marker; otherwise it's complete once enough approvers (all, or the quorum) have approved. */
  isStageComplete(stage: NxApprovalStage): boolean {
    if (!stage.approvers?.length) return true;
    if (this.isStageRejected(stage)) return false;
    return this.approvedCount(stage) >= this.requiredApprovals(stage);
  }

  /** The rendered status of a stage on the rail: rejected halts the whole workflow visibly at that stage, distinct from pending/approved. */
  stageStatus(stage: NxApprovalStage): NxApprovalStageStatus {
    if (this.isStageRejected(stage)) return 'rejected';
    const index = this.stageIndex(stage);
    const current = this.currentStageIndex();
    if (index < current) return 'approved';
    if (index > current) return 'pending';
    return this.isStageComplete(stage) ? 'approved' : 'active';
  }

  isExpanded(stage: NxApprovalStage): boolean {
    const override = this.expandedOverrides().get(stage.id);
    if (override !== undefined) return override;
    return this.stageIndex(stage) === this.currentStageIndex();
  }

  toggleExpanded(stage: NxApprovalStage): void {
    const next = new Map(this.expandedOverrides());
    next.set(stage.id, !this.isExpanded(stage));
    this.expandedOverrides.set(next);
  }

  /** Whether sequential ordering is currently blocking this approver - i.e. someone before them in the list hasn't approved yet. */
  isWaitingOnOthers(stage: NxApprovalStage, approver: NxApprovalStep): boolean {
    if (stage.mode !== 'sequential') return false;
    const index = stage.approvers.indexOf(approver);
    return stage.approvers.slice(0, index).some((a) => a.status !== 'approved');
  }

  /** Whether this approver may approve/reject right now: their stage must be the active one, they must still be pending, it must be their turn (sequential), and - if `currentApproverId` is set - it must be them. */
  canAct(stage: NxApprovalStage, approver: NxApprovalStep): boolean {
    if (approver.status !== 'pending') return false;
    if (this.isStageRejected(stage)) return false;
    if (this.stageIndex(stage) !== this.currentStageIndex()) return false;
    if (this.currentApproverId != null && String(approver.id) !== String(this.currentApproverId)) return false;
    return !this.isWaitingOnOthers(stage, approver);
  }

  /** A pending approver may always leave a standalone comment (e.g. to ask a question) even when it isn't their turn yet - only a final approve/reject is gated by `canAct`. */
  canComment(approver: NxApprovalStep): boolean {
    if (this.currentApproverId != null) return String(approver.id) === String(this.currentApproverId);
    return true;
  }

  draftKey(stage: NxApprovalStage, approver: NxApprovalStep): string {
    return `${stage.id}:${approver.id}`;
  }

  draftFor(stage: NxApprovalStage, approver: NxApprovalStep): string {
    return this.drafts()[this.draftKey(stage, approver)] ?? '';
  }

  setDraft(stage: NxApprovalStage, approver: NxApprovalStep, value: string): void {
    this.drafts.update((d) => ({ ...d, [this.draftKey(stage, approver)]: value }));
  }

  toggleCommentBox(stage: NxApprovalStage, approver: NxApprovalStep): void {
    const key = this.draftKey(stage, approver);
    this.openCommentKey.set(this.openCommentKey() === key ? null : key);
  }

  isCommentBoxOpen(stage: NxApprovalStage, approver: NxApprovalStep): boolean {
    return this.openCommentKey() === this.draftKey(stage, approver);
  }

  approveStep(stage: NxApprovalStage, approver: NxApprovalStep): void {
    if (!this.canAct(stage, approver)) return;
    this.decide(stage, approver, 'approved');
  }

  rejectStep(stage: NxApprovalStage, approver: NxApprovalStep): void {
    if (!this.canAct(stage, approver)) return;
    this.decide(stage, approver, 'rejected');
  }

  /** Posts a standalone remark that doesn't change the approver's decision status - just logged to history and clears the draft. */
  postComment(stage: NxApprovalStage, approver: NxApprovalStep): void {
    const text = this.draftFor(stage, approver).trim();
    if (!text || !this.canComment(approver)) return;

    const entry = this.logHistory(stage, approver, 'commented', text);
    this.comment.emit(entry);
    this.clearDraft(stage, approver);
    this.openCommentKey.set(null);
  }

  private decide(stage: NxApprovalStage, approver: NxApprovalStep, status: 'approved' | 'rejected'): void {
    const commentText = this.draftFor(stage, approver).trim() || undefined;
    const now = new Date().toISOString();

    const nextStages = this.stages.map((s) =>
      s.id !== stage.id
        ? s
        : {
            ...s,
            approvers: s.approvers.map((a) =>
              a.id !== approver.id ? a : { ...a, status, comment: commentText ?? a.comment, actedAt: now },
            ),
          },
    );
    this.stages = nextStages;
    this.stagesChange.emit(nextStages);

    const entry = this.logHistory(stage, approver, status, commentText, now);
    (status === 'approved' ? this.approve : this.reject).emit(entry);
    this.clearDraft(stage, approver);
    this.openCommentKey.set(null);
  }

  private logHistory(
    stage: NxApprovalStage,
    approver: NxApprovalStep,
    action: NxApprovalHistoryEntry['action'],
    commentText?: string,
    timestamp = new Date().toISOString(),
  ): NxApprovalHistoryEntry {
    const entry: NxApprovalHistoryEntry = {
      id: createId(),
      stageId: stage.id,
      stageName: stage.name,
      approverId: approver.id,
      approverName: approver.name,
      action,
      comment: commentText,
      timestamp,
    };
    const next = [...this.history, entry];
    this.history = next;
    this.historyChange.emit(next);
    return entry;
  }

  private clearDraft(stage: NxApprovalStage, approver: NxApprovalStep): void {
    const key = this.draftKey(stage, approver);
    this.drafts.update((d) => {
      const next = { ...d };
      delete next[key];
      return next;
    });
  }

  initialsFor(name: string): string {
    return initials(name);
  }

  historyIcon(action: NxApprovalHistoryEntry['action']): string {
    switch (action) {
      case 'approved':
        return 'nx-check-circle';
      case 'rejected':
        return 'nx-close';
      default:
        return 'nx-message';
    }
  }

  timeLabel(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }
}
