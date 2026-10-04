export const JOBS_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxStepper, NxInput, NxTextarea, NxDropzone } from 'nexium-ui';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
  description: string;
  requirements: string[];
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [NxNavbar, NxIcon, NxBadge, NxButton, NxStepper, NxInput, NxTextarea, NxDropzone],
  templateUrl: './careers.html',
})
export class Careers {
  departments = ['All', 'Engineering', 'Design', 'Sales', 'Support'];
  activeDepartment = signal('All');

  jobs: Job[] = [
    { id: 'frontend-eng', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote (US)', type: 'Full-time', description: '...', requirements: ['5+ years...'] },
    // ...more jobs
  ];

  filteredJobs = computed(() => {
    const dept = this.activeDepartment();
    return dept === 'All' ? this.jobs : this.jobs.filter((j) => j.department === dept);
  });

  selectedJobId = signal<string | null>(null);
  selectedJob = computed(() => this.jobs.find((j) => j.id === this.selectedJobId()) ?? null);

  steps = [{ label: 'Your info' }, { label: 'Links & note' }, { label: 'Review & submit' }];
  activeIndex = signal(0);
  submitted = signal(false);

  name = '';
  email = '';
  resumeFile = signal<File | null>(null);

  onResumeChange(files: File[]): void {
    this.resumeFile.set(files[0] ?? null);
  }

  submitApplication(): void {
    this.submitted.set(true);
  }
}
`;

export const JOBS_HTML_SOURCE = `@if (!selectedJob()) {
    <div class="departments">
        @for (dept of departments; track dept) {
            <button [class.active]="activeDepartment() === dept" (click)="activeDepartment.set(dept)">{{ dept }}</button>
        }
    </div>
    @for (job of filteredJobs(); track job.id) {
        <button class="job-card" (click)="selectedJobId.set(job.id)">
            <div>{{ job.title }}</div>
            <nx-badge variant="secondary">{{ job.department }}</nx-badge>
        </button>
    }
} @else if (!applying()) {
    <h2>{{ selectedJob()!.title }}</h2>
    <p>{{ selectedJob()!.description }}</p>
    <ul>
        @for (req of selectedJob()!.requirements; track req) { <li>{{ req }}</li> }
    </ul>
    <nx-button variant="primary" (click)="startApplication()">Apply now</nx-button>
} @else if (!submitted()) {
    <nx-stepper [steps]="steps" [activeIndex]="activeIndex()" (activeIndexChange)="activeIndex.set($event)"></nx-stepper>

    @switch (activeIndex()) {
        @case (0) {
            <nx-input label="Full name" [(ngModel)]="name"></nx-input>
            <nx-input label="Email" [(ngModel)]="email"></nx-input>
        }
        @case (1) {
            <nx-dropzone accept=".pdf,.doc,.docx" [multiple]="false" (filesChange)="onResumeChange($event)"></nx-dropzone>
        }
        @case (2) {
            <p>{{ name }} · {{ email }} · {{ resumeFile()?.name }}</p>
            <nx-button variant="primary" (click)="submitApplication()">Submit application</nx-button>
        }
    }
} @else {
    <p>Thanks, {{ name }}! Your application was received.</p>
}
`;
