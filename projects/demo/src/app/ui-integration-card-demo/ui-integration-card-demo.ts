import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxIntegrationCard, NxIntegrationStatus } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-integration-card-demo',
  imports: [NxIntegrationCard, DemoSection],
  templateUrl: './ui-integration-card-demo.html',
  styleUrl: './ui-integration-card-demo.scss',
})
export class UiIntegrationCardDemo {
  importCode = `import { NxIntegrationCard } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  githubStatus = signal<NxIntegrationStatus>('connected');
  slackStatus = signal<NxIntegrationStatus>('disconnected');
  stripeStatus = signal<NxIntegrationStatus>('error');

  lastEvent = '';

  onGithubConnect(): void {
    this.githubStatus.set('connected');
    this.lastEvent = 'GitHub: connected';
  }

  onGithubDisconnect(): void {
    this.githubStatus.set('disconnected');
    this.lastEvent = 'GitHub: disconnected';
  }

  onSlackConnect(): void {
    this.slackStatus.set('connected');
    this.lastEvent = 'Slack: connected';
  }

  onStripeConnect(): void {
    this.stripeStatus.set('connected');
    this.lastEvent = 'Stripe: connected';
  }

  onConfigure(name: string): void {
    this.lastEvent = `${name}: opened configuration`;
  }

  basicCode = `<nx-integration-card
    name="GitHub"
    description="Sync pull requests and issues into your workspace."
    icon="nx-github"
    [status]="githubStatus()"
    (connect)="onConnect('GitHub')"
    (disconnect)="onDisconnect('GitHub')"
    (configure)="onConfigure('GitHub')">
</nx-integration-card>`;

  basicTs = `githubStatus: NxIntegrationStatus = 'connected';

onConnect(name: string): void { /* call your API, then flip status to 'connected' */ }
onDisconnect(name: string): void { /* flip status back to 'disconnected' */ }
onConfigure(name: string): void { /* navigate to this integration's settings */ }`;

  statusCode = `<nx-integration-card name="Slack" description="Post build/release updates to a channel." icon="nx-message" status="disconnected" (connect)="onConnect('Slack')"></nx-integration-card>

<nx-integration-card name="Stripe" description="Billing is temporarily unavailable - check your API key." icon="nx-credit-card" status="error" (connect)="onConnect('Stripe')"></nx-integration-card>`;

  statusTs = `// status drives both the badge styling and which primary action shows -
// 'error' still offers "Connect" (same as 'disconnected'), just with a
// distinctly colored badge calling out the problem.`;

  customIconCode = `<nx-integration-card name="Custom Logo" description="Any projected markup works as the logo." status="connected">
    <span icon class="my-custom-logo">CL</span>
</nx-integration-card>`;

  customIconTs = `// Project anything into the [icon] slot - an <img>, inline SVG, a styled span -
// instead of passing a built-in icon name.`;
}
