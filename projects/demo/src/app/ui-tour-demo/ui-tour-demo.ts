import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxTour, NxTourStep } from '../../../../../dist/components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-tour-demo',
  imports: [NxTour, DemoSection],
  templateUrl: './ui-tour-demo.html',
  styleUrl: './ui-tour-demo.scss',
})
export class UiTourDemo {
  importCode = `import { NxTour } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  open = false;

  steps: NxTourStep[] = [
    { target: '#tour-search', title: 'Search anything', description: 'Jump to any component or page from here.' },
    { target: '#tour-new', title: 'Create something new', description: 'Start a new project with one click.' },
    { target: '#tour-profile', title: 'Your profile', description: 'Manage your account and preferences.' },
  ];

  basicCode = `<button id="tour-search">Search</button>
<button id="tour-new">New</button>
<button id="tour-profile">Profile</button>

<button (click)="open = true">Start tour</button>

<nx-tour [steps]="steps" [(open)]="open"></nx-tour>`;

  basicTs = `steps: NxTourStep[] = [
  { target: '#tour-search', title: 'Search anything', description: 'Jump to any component or page from here.' },
  { target: '#tour-new', title: 'Create something new', description: 'Start a new project with one click.' },
  { target: '#tour-profile', title: 'Your profile', description: 'Manage your account and preferences.' },
];

open = false;`;
}
