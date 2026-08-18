import { Component } from '@angular/core';
import { UiCard, UiCardContent, UiStepper, NxStep, UiProgressBarComponent, UiBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface ProjectRow {
  name: string;
  owner: string;
  progress: number;
  statusLabel: string;
  statusVariant: 'success' | 'warning' | 'info';
}

@Component({
  selector: 'app-templates-project-management-demo',
  imports: [UiCard, UiCardContent, UiStepper, UiProgressBarComponent, UiBadge, DemoSection],
  templateUrl: './templates-project-management-demo.html',
})
export class TemplatesProjectManagementDemo {
  phases: NxStep[] = [
    { label: 'Discovery' },
    { label: 'Design' },
    { label: 'Build' },
    { label: 'Review' },
    { label: 'Launch' },
  ];

  activePhase = 2;

  projects: ProjectRow[] = [
    { name: 'Marketing Site Redesign', owner: 'Ada Lovelace', progress: 82, statusLabel: 'On Track', statusVariant: 'success' },
    { name: 'Mobile App v2', owner: 'Grace Hopper', progress: 45, statusLabel: 'At Risk', statusVariant: 'warning' },
    { name: 'Billing Migration', owner: 'Alan Turing', progress: 60, statusLabel: 'On Track', statusVariant: 'success' },
    { name: 'Internal Tooling', owner: 'Margaret Hamilton', progress: 20, statusLabel: 'Not Started', statusVariant: 'info' },
  ];

  phasesCode = `<nx-stepper [steps]="phases" [activeIndex]="2"></nx-stepper>`;

  projectsCode = `<nx-progress-bar [value]="82" variant="success" [showLabel]="true" label="82%"></nx-progress-bar>`;
}
