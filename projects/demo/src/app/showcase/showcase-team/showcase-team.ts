import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxPageHeader, NxButton, NxAvatar, NxBadge, NxModal, NxInput, NxSelect, NxSelectOption, NxTagInput } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { TEAM_TS_SOURCE, TEAM_HTML_SOURCE } from './showcase-team.source';

interface NxShowcaseTeamMember {
  name: string;
  role: string;
  status: 'Active' | 'Away' | 'Invited';
  email: string;
  tags?: string[];
}

@Component({
  selector: 'app-showcase-team',
  standalone: true,
  imports: [FormsModule, NxPageHeader, NxButton, NxAvatar, NxBadge, NxModal, NxInput, NxSelect, NxTagInput, ShowcaseSourceView],
  templateUrl: './showcase-team.html',
  styleUrl: './showcase-team.scss',
})
export class ShowcaseTeam {
  tsSource = TEAM_TS_SOURCE;
  htmlSource = TEAM_HTML_SOURCE;

  members: NxShowcaseTeamMember[] = [
    { name: 'Amelia Stone', role: 'Product Lead', status: 'Active', email: 'amelia@nova.dev' },
    { name: 'Noah Park', role: 'Engineer', status: 'Active', email: 'noah@nova.dev' },
    { name: 'Layla Kim', role: 'Customer Success', status: 'Away', email: 'layla@nova.dev' },
    { name: 'Ethan Cole', role: 'Sales', status: 'Active', email: 'ethan@nova.dev' },
    { name: 'Sofia Reyes', role: 'Designer', status: 'Invited', email: 'sofia@nova.dev' },
  ];

  modalOpen = signal(false);
  roleOptions: NxSelectOption[] = ['Engineer', 'Designer', 'Product Lead', 'Sales', 'Customer Success'].map(
    (role) => ({ label: role, value: role }),
  );

  teamSuggestions = ['Engineering', 'Design', 'Sales', 'Billing admin', 'Read-only'];

  newName = '';
  newEmail = '';
  newRole = 'Engineer';
  newMemberTags: string[] = [];

  openModal(): void {
    this.newName = '';
    this.newEmail = '';
    this.newRole = 'Engineer';
    this.newMemberTags = [];
    this.modalOpen.set(true);
  }

  addMember(): void {
    if (!this.newName.trim() || !this.newEmail.trim()) {
      return;
    }
    this.members = [
      ...this.members,
      {
        name: this.newName.trim(),
        role: this.newRole,
        status: 'Invited',
        email: this.newEmail.trim(),
        tags: this.newMemberTags,
      },
    ];
    this.modalOpen.set(false);
  }

  statusVariant(status: NxShowcaseTeamMember['status']): 'success' | 'warning' | 'info' {
    if (status === 'Active') return 'success';
    if (status === 'Away') return 'warning';
    return 'info';
  }
}
