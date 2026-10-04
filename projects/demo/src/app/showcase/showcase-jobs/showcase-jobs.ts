import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxStepper, NxStep, NxInput, NxTextarea, NxDropzone } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { JOBS_TS_SOURCE, JOBS_HTML_SOURCE } from './showcase-jobs.source';

type NxJobType = 'Full-time' | 'Contract' | 'Remote';

interface NxShowcaseJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: NxJobType;
  posted: string;
  description: string;
  requirements: string[];
}

@Component({
  selector: 'app-showcase-jobs',
  standalone: true,
  imports: [RouterLink, FormsModule, NxNavbar, NxIcon, NxBadge, NxButton, NxStepper, NxInput, NxTextarea, NxDropzone, ShowcaseSourceView],
  templateUrl: './showcase-jobs.html',
  styleUrl: './showcase-jobs.scss',
})
export class ShowcaseJobs {
  tsSource = JOBS_TS_SOURCE;
  htmlSource = JOBS_HTML_SOURCE;

  departments = ['All', 'Engineering', 'Design', 'Sales', 'Support'];
  activeDepartment = signal('All');

  jobs: NxShowcaseJob[] = [
    {
      id: 'frontend-eng',
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      posted: '3 days ago',
      description: 'Build and maintain the core product UI alongside a small, senior team. You will own features end-to-end, from design review to production.',
      requirements: ['5+ years building production web apps', 'Deep experience with Angular or a comparable framework', 'Comfortable owning a feature from design to ship'],
    },
    {
      id: 'product-designer',
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote (Worldwide)',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Shape the end-to-end experience of our platform, from early concept sketches to polished, shippable UI.',
      requirements: ['Portfolio showing shipped product work', 'Strong systems thinking - you design components, not just screens', 'Comfortable presenting and defending design decisions'],
    },
    {
      id: 'account-exec',
      title: 'Account Executive',
      department: 'Sales',
      location: 'New York, NY',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Own the full sales cycle for mid-market accounts, from first call to signed contract.',
      requirements: ['2+ years closing B2B SaaS deals', 'Comfortable with a $500k+ annual quota', 'Excellent written and verbal communication'],
    },
    {
      id: 'support-specialist',
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Remote (US)',
      type: 'Contract',
      posted: '5 days ago',
      description: 'Be the first line of help for our customers - answering tickets, triaging bugs, and writing docs.',
      requirements: ['1+ years in a customer-facing support role', 'Clear, friendly written communication', 'Comfortable learning a technical product quickly'],
    },
    {
      id: 'backend-eng',
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-time',
      posted: '6 days ago',
      description: 'Design and scale the services powering our API and billing systems.',
      requirements: ['Experience with Node.js or a comparable backend stack', 'Comfortable with relational database design', 'Has shipped and operated a production service'],
    },
    {
      id: 'sales-contractor',
      title: 'SDR (Contract)',
      department: 'Sales',
      location: 'Remote (US)',
      type: 'Contract',
      posted: '2 weeks ago',
      description: 'Source and qualify new pipeline for the sales team through outbound outreach.',
      requirements: ['Prior SDR or BDR experience', 'Comfortable with high-volume outbound', 'Organized, metrics-driven approach to pipeline'],
    },
  ];

  filteredJobs = computed(() => {
    const dept = this.activeDepartment();
    return dept === 'All' ? this.jobs : this.jobs.filter((j) => j.department === dept);
  });

  selectedJobId = signal<string | null>(null);
  selectedJob = computed(() => this.jobs.find((j) => j.id === this.selectedJobId()) ?? null);

  applying = signal(false);
  submitted = signal(false);

  steps: NxStep[] = [{ label: 'Your info' }, { label: 'Links & note' }, { label: 'Review & submit' }];
  activeIndex = signal(0);

  name = '';
  email = '';
  phone = '';
  portfolioUrl = '';
  coverNote = '';
  resumeFile = signal<File | null>(null);

  get canContinue(): boolean {
    if (this.activeIndex() === 0) return !!this.name.trim() && !!this.email.trim();
    if (this.activeIndex() === 1) return !!this.resumeFile();
    return true;
  }

  onResumeChange(files: File[]): void {
    this.resumeFile.set(files[0] ?? null);
  }

  openJob(job: NxShowcaseJob): void {
    this.selectedJobId.set(job.id);
    this.applying.set(false);
    this.submitted.set(false);
  }

  backToListings(): void {
    this.selectedJobId.set(null);
  }

  startApplication(): void {
    this.applying.set(true);
    this.activeIndex.set(0);
    this.name = '';
    this.email = '';
    this.phone = '';
    this.portfolioUrl = '';
    this.coverNote = '';
    this.resumeFile.set(null);
  }

  next(): void {
    if (this.activeIndex() < this.steps.length - 1) {
      this.activeIndex.update((i) => i + 1);
    }
  }

  back(): void {
    if (this.activeIndex() > 0) {
      this.activeIndex.update((i) => i - 1);
    }
  }

  submitApplication(): void {
    this.submitted.set(true);
  }
}
