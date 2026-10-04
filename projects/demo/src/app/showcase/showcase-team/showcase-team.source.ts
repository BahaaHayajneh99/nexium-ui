export const TEAM_TS_SOURCE = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxPageHeader, NxButton, NxAvatar, NxBadge, NxModal, NxInput, NxSelect, NxSelectOption, NxTagInput } from 'nexium-ui';

interface TeamMember {
  name: string;
  role: string;
  status: 'Active' | 'Away' | 'Invited';
  email: string;
  tags?: string[];
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [FormsModule, NxPageHeader, NxButton, NxAvatar, NxBadge, NxModal, NxInput, NxSelect, NxTagInput],
  templateUrl: './team.html',
})
export class Team {
  members: TeamMember[] = [
    { name: 'Amelia Stone', role: 'Product Lead', status: 'Active', email: 'amelia@nova.dev' },
    // ...more members
  ];

  modalOpen = signal(false);
  roleOptions: NxSelectOption[] = [
    { label: 'Engineer', value: 'Engineer' },
    { label: 'Designer', value: 'Designer' },
  ];

  teamSuggestions = ['Engineering', 'Design', 'Sales', 'Billing admin', 'Read-only'];

  newName = '';
  newEmail = '';
  newRole = 'Engineer';
  newMemberTags: string[] = [];

  addMember(): void {
    if (!this.newName.trim() || !this.newEmail.trim()) return;
    this.members = [
      ...this.members,
      { name: this.newName, role: this.newRole, status: 'Invited', email: this.newEmail, tags: this.newMemberTags },
    ];
    this.modalOpen.set(false);
  }

  statusVariant(status: TeamMember['status']) {
    if (status === 'Active') return 'success';
    if (status === 'Away') return 'warning';
    return 'info';
  }
}
`;

export const TEAM_HTML_SOURCE = `<div class="page">
    <nx-page-header title="Team" description="Everyone with access to Nova.">
        <nx-button nxPageHeaderActions variant="primary" (click)="modalOpen.set(true)">+ Add member</nx-button>
    </nx-page-header>

    <div class="team-grid">
        @for (member of members; track member.email) {
            <div class="team-card">
                <nx-avatar [name]="member.name" size="medium"></nx-avatar>
                <div>
                    <div>{{ member.name }}</div>
                    <div>{{ member.role }}</div>
                    <div>{{ member.email }}</div>
                </div>
                <nx-badge [variant]="statusVariant(member.status)" size="small">{{ member.status }}</nx-badge>
            </div>
        }
    </div>
</div>

<nx-modal [open]="modalOpen()" (openChange)="modalOpen.set($event)" header="Add team member">
    <div nx-modal-body>
        <nx-input label="Name" [(ngModel)]="newName"></nx-input>
        <nx-input label="Email" type="email" [(ngModel)]="newEmail"></nx-input>
        <nx-select label="Role" [options]="roleOptions" [(ngModel)]="newRole"></nx-select>
        <label>Teams & permissions</label>
        <nx-tag-input [(value)]="newMemberTags" [suggestions]="teamSuggestions" placeholder="e.g. Engineering, Billing admin..."></nx-tag-input>
    </div>
    <div nx-modal-footer>
        <nx-button variant="secondary" (click)="modalOpen.set(false)">Cancel</nx-button>
        <nx-button variant="primary" (click)="addMember()">Send invite</nx-button>
    </div>
</nx-modal>
`;
