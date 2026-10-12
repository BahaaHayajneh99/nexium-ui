import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxApprovalWorkflow, NxApprovalStage, NxApprovalHistoryEntry } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-approval-workflow-demo',
  imports: [NxApprovalWorkflow, DemoSection],
  templateUrl: './ui-approval-workflow-demo.html',
  styleUrl: './ui-approval-workflow-demo.scss',
})
export class UiApprovalWorkflowDemo {
  importCode = `import { NxApprovalWorkflow } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  // --- Example 1: sequential approval ---------------------------------------
  // Manager Review has two approvers who must act in order - Sara already approved,
  // so it's now Omar's turn; Lina (the next stage) can't act until Omar clears it.
  sequentialStages: NxApprovalStage[] = [
    { id: 'draft', name: 'Draft', mode: 'sequential', approvers: [] },
    { id: 'submitted', name: 'Submitted', mode: 'sequential', approvers: [] },
    {
      id: 'manager-review',
      name: 'Manager Review',
      mode: 'sequential',
      description: 'Team lead signs off first, then the finance manager.',
      approvers: [
        { id: 'a1', name: 'Sara Haddad', role: 'Team Lead', status: 'approved', comment: 'Looks good, receipts attached.', actedAt: '2026-10-05T09:12:00' },
        { id: 'a2', name: 'Omar Nasser', role: 'Finance Manager', status: 'pending' },
      ],
    },
    {
      id: 'director-approval',
      name: 'Director Approval',
      mode: 'sequential',
      approvers: [{ id: 'a3', name: 'Lina Youssef', role: 'Director of Operations', status: 'pending' }],
    },
    { id: 'completed', name: 'Completed', mode: 'sequential', approvers: [] },
  ];

  sequentialHistory: NxApprovalHistoryEntry[] = [
    {
      id: 'h1',
      stageId: 'manager-review',
      stageName: 'Manager Review',
      approverId: 'a1',
      approverName: 'Sara Haddad',
      action: 'approved',
      comment: 'Looks good, receipts attached.',
      timestamp: '2026-10-05T09:12:00',
    },
  ];

  sequentialCode = `<nx-approval-workflow
    [(stages)]="sequentialStages"
    [(history)]="sequentialHistory"
    (approve)="onApprove($event)"
    (reject)="onReject($event)"
    (comment)="onComment($event)">
</nx-approval-workflow>`;

  sequentialTs = `stages: NxApprovalStage[] = [
  { id: 'draft', name: 'Draft', mode: 'sequential', approvers: [] },
  { id: 'submitted', name: 'Submitted', mode: 'sequential', approvers: [] },
  {
    id: 'manager-review', name: 'Manager Review', mode: 'sequential',
    approvers: [
      { id: 'a1', name: 'Sara Haddad', role: 'Team Lead', status: 'approved', comment: '...' },
      { id: 'a2', name: 'Omar Nasser', role: 'Finance Manager', status: 'pending' },
    ],
  },
  { id: 'director-approval', name: 'Director Approval', mode: 'sequential',
    approvers: [{ id: 'a3', name: 'Lina Youssef', role: 'Director of Operations', status: 'pending' }] },
  { id: 'completed', name: 'Completed', mode: 'sequential', approvers: [] },
];

// Sara already approved, so Omar is the only one who can act right now - Lina (the next
// stage's approver) stays locked until "Manager Review" fully clears.
onApprove(entry: NxApprovalHistoryEntry) { /* persist entry.stageId / entry.approverId / entry.comment */ }
onReject(entry: NxApprovalHistoryEntry) { /* ...same shape, action === 'rejected' */ }
onComment(entry: NxApprovalHistoryEntry) { /* standalone remark, no status change */ }`;

  // --- Example 2: parallel approval with a quorum ---------------------------
  // Design Review needs only 2 of its 3 reviewers - Maya already signed off, so either
  // Karim or Yousef (in any order) clears the stage.
  parallelStages: NxApprovalStage[] = [
    { id: 'draft', name: 'Draft', mode: 'sequential', approvers: [] },
    {
      id: 'design-review',
      name: 'Design Review',
      mode: 'parallel',
      quorum: 2,
      description: '2 of 3 reviewers must sign off - they can approve in any order.',
      approvers: [
        { id: 'b1', name: 'Maya Khalil', role: 'Product Designer', status: 'approved', comment: 'Ship it.', actedAt: '2026-10-06T13:40:00' },
        { id: 'b2', name: 'Karim Aziz', role: 'Engineering Lead', status: 'pending' },
        { id: 'b3', name: 'Yousef Saleh', role: 'Marketing Lead', status: 'pending' },
      ],
    },
    { id: 'completed', name: 'Completed', mode: 'sequential', approvers: [] },
  ];

  parallelHistory: NxApprovalHistoryEntry[] = [
    {
      id: 'h2',
      stageId: 'design-review',
      stageName: 'Design Review',
      approverId: 'b1',
      approverName: 'Maya Khalil',
      action: 'approved',
      comment: 'Ship it.',
      timestamp: '2026-10-06T13:40:00',
    },
  ];

  parallelCode = `<nx-approval-workflow [(stages)]="parallelStages" [(history)]="parallelHistory"></nx-approval-workflow>`;

  parallelTs = `stages: NxApprovalStage[] = [
  { id: 'draft', name: 'Draft', mode: 'sequential', approvers: [] },
  {
    id: 'design-review', name: 'Design Review', mode: 'parallel', quorum: 2,
    approvers: [
      { id: 'b1', name: 'Maya Khalil', role: 'Product Designer', status: 'approved', comment: 'Ship it.' },
      { id: 'b2', name: 'Karim Aziz', role: 'Engineering Lead', status: 'pending' },
      { id: 'b3', name: 'Yousef Saleh', role: 'Marketing Lead', status: 'pending' },
    ],
  },
  { id: 'completed', name: 'Completed', mode: 'sequential', approvers: [] },
];

// quorum: 2 of 3 - Karim and Yousef can both act right away, in whatever order they like;
// the stage clears the moment the second of them approves.`;

  // --- Example 3: rejection halts the workflow ------------------------------
  // Rana rejected at Manager Approval - the workflow is visibly flagged and frozen there;
  // Fadi (next in the sequential order) can no longer act, and Finance Approval never opens up.
  rejectedStages: NxApprovalStage[] = [
    { id: 'submitted', name: 'Submitted', mode: 'sequential', approvers: [] },
    {
      id: 'manager-approval',
      name: 'Manager Approval',
      mode: 'sequential',
      approvers: [
        {
          id: 'c1',
          name: 'Rana Qasem',
          role: 'Procurement Manager',
          status: 'rejected',
          comment: 'Budget exceeded for this quarter - please resubmit with a reduced scope.',
          actedAt: '2026-10-04T16:05:00',
        },
        { id: 'c2', name: 'Fadi Mansour', role: 'Finance Controller', status: 'pending' },
      ],
    },
    {
      id: 'finance-approval',
      name: 'Finance Approval',
      mode: 'sequential',
      approvers: [{ id: 'c3', name: 'Huda Barakat', role: 'VP Finance', status: 'pending' }],
    },
    { id: 'completed', name: 'Completed', mode: 'sequential', approvers: [] },
  ];

  rejectedHistory: NxApprovalHistoryEntry[] = [
    {
      id: 'h3',
      stageId: 'manager-approval',
      stageName: 'Manager Approval',
      approverId: 'c1',
      approverName: 'Rana Qasem',
      action: 'rejected',
      comment: 'Budget exceeded for this quarter - please resubmit with a reduced scope.',
      timestamp: '2026-10-04T16:05:00',
    },
  ];

  rejectedCode = `<nx-approval-workflow [(stages)]="rejectedStages" [(history)]="rejectedHistory"></nx-approval-workflow>`;

  rejectedTs = `// Rana's rejected status on "Manager Approval" is enough to halt the whole workflow there -
// the stage rail marks that stage (and only that stage) as rejected, Fadi's row can no longer
// be acted on, and "Finance Approval" never becomes the active stage.
stages: NxApprovalStage[] = [
  { id: 'submitted', name: 'Submitted', mode: 'sequential', approvers: [] },
  {
    id: 'manager-approval', name: 'Manager Approval', mode: 'sequential',
    approvers: [
      { id: 'c1', name: 'Rana Qasem', role: 'Procurement Manager', status: 'rejected',
        comment: 'Budget exceeded for this quarter - please resubmit with a reduced scope.' },
      { id: 'c2', name: 'Fadi Mansour', role: 'Finance Controller', status: 'pending' },
    ],
  },
  { id: 'finance-approval', name: 'Finance Approval', mode: 'sequential',
    approvers: [{ id: 'c3', name: 'Huda Barakat', role: 'VP Finance', status: 'pending' }] },
  { id: 'completed', name: 'Completed', mode: 'sequential', approvers: [] },
];`;

  onApprove(entry: NxApprovalHistoryEntry): void {
    console.log('approved', entry);
  }

  onReject(entry: NxApprovalHistoryEntry): void {
    console.log('rejected', entry);
  }

  onComment(entry: NxApprovalHistoryEntry): void {
    console.log('commented', entry);
  }
}
