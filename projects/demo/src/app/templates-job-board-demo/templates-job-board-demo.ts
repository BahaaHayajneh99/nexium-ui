import { Component } from '@angular/core';
import { NxCard, NxCardContent, NxButton, NxTag, NxAvatar, NxSelect, NxSelectOption, NxInput } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface JobListing {
  company: string;
  title: string;
  location: string;
  type: string;
  description: string;
  posted: string;
}

@Component({
  selector: 'app-templates-job-board-demo',
  imports: [NxCard, NxCardContent, NxButton, NxTag, NxAvatar, NxSelect, NxInput, DemoSection],
  templateUrl: './templates-job-board-demo.html',
})
export class TemplatesJobBoardDemo {
  jobs: JobListing[] = [
    {
      company: 'Nimbus Cloud',
      title: 'Senior Frontend Engineer',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain our customer-facing dashboard using Angular and TypeScript.',
      posted: 'Posted 2 days ago',
    },
    {
      company: 'Brightwave Labs',
      title: 'Product Designer',
      location: 'Berlin, DE',
      type: 'Full-time',
      description: 'Shape the end-to-end experience for our analytics platform alongside a small product team.',
      posted: 'Posted 3 days ago',
    },
    {
      company: 'Harbor Robotics',
      title: 'Backend Engineer',
      location: 'Remote',
      type: 'Contract',
      description: 'Design resilient APIs and data pipelines for fleet-tracking services.',
      posted: 'Posted 5 days ago',
    },
    {
      company: 'Lumen Health',
      title: 'QA Automation Engineer',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Own our end-to-end test suite and help ship releases with confidence every week.',
      posted: 'Posted 1 week ago',
    },
    {
      company: 'Fernwood Studio',
      title: 'Marketing Coordinator',
      location: 'Hybrid',
      type: 'Part-time',
      description: 'Plan and execute campaigns across email, social, and partner channels.',
      posted: 'Posted 1 week ago',
    },
  ];

  categoryOptions: NxSelectOption[] = [
    { label: 'Engineering', value: 'engineering' },
    { label: 'Design', value: 'design' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Customer Support', value: 'support' },
  ];

  locationOptions: NxSelectOption[] = [
    { label: 'Remote', value: 'remote' },
    { label: 'Berlin, DE', value: 'berlin' },
    { label: 'Austin, TX', value: 'austin' },
    { label: 'Hybrid', value: 'hybrid' },
  ];

  listingsCode = `<nx-card variant="outlined">
    <nx-card-content>
        <nx-avatar name="Nimbus Cloud" shape="rounded" size="large"></nx-avatar>
        <div class="template-profile-name">Senior Frontend Engineer</div>
        <nx-tag variant="outline">Remote</nx-tag>
        <nx-tag variant="outline">Full-time</nx-tag>
        <p>Build and maintain our customer-facing dashboard...</p>
    </nx-card-content>
    <nx-button variant="primary" size="small">View details</nx-button>
</nx-card>`;

  detailCode = `<nx-select [options]="categoryOptions" placeholder="Category"></nx-select>
<nx-select [options]="locationOptions" placeholder="Location"></nx-select>
<nx-input placeholder="Search by keyword"></nx-input>

<nx-card variant="outlined">
    <nx-card-content>
        <div class="template-profile-name">Senior Frontend Engineer</div>
        <p><strong>About the role</strong></p>
        <p>We're looking for a Senior Frontend Engineer to help build our dashboard...</p>
        <p><strong>Requirements</strong></p>
        <ul>
            <li>5+ years of experience with Angular or a similar framework</li>
        </ul>
        <p><strong>Benefits</strong></p>
        <ul>
            <li>Fully remote with flexible working hours</li>
        </ul>
        <nx-button variant="primary">Apply now</nx-button>
    </nx-card-content>
</nx-card>`;
}
