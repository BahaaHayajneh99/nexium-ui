import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-user-management-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-user-management-demo.html',
  styleUrls: ['./pattern-user-management-demo.scss'],
})
export class PatternUserManagementDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'User Profiles', description: 'Profile creation and editing' },
    { name: 'Role Management', description: 'RBAC assignment' },
    { name: 'Permission Control', description: 'Fine-grained access' },
    { name: 'User Listing', description: 'Search and filter users' },
    { name: 'Bulk Actions', description: 'Multi-user operations' },
    { name: 'Activity Logging', description: 'User action history' },
  ];

  useCases = [
    { title: 'Admin Panel', description: 'User administration' },
    { title: 'Team Management', description: 'Employee directory' },
    { title: 'Access Control', description: 'Permission management' },
    { title: 'Multi-tenancy', description: 'Organization users' },
    { title: 'Customer Portal', description: 'Self-service profiles' },
    { title: 'Audit Trail', description: 'Compliance tracking' },
  ];

  userManagementSteps = [
    'Create user listing table',
    'Implement search and filters',
    'Build add/edit user form',
    'Set up role selection',
    'Configure permissions',
    'Add bulk action tools',
    'Enable user status toggle',
    'Create activity log view',
  ];
}
