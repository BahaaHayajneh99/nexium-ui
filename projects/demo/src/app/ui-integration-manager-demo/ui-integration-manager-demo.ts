import { Component, inject } from '@angular/core';
import { NxIntegrationManager, NxIntegrationManagerItem } from 'components';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-integration-manager-demo',
  imports: [NxIntegrationManager, DemoSection],
  templateUrl: './ui-integration-manager-demo.html',
  styleUrl: './ui-integration-manager-demo.scss',
})
export class UiIntegrationManagerDemo {
  importCode = `import { NxIntegrationManager } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  lastEvent = '';

  integrations: NxIntegrationManagerItem[] = [
    { id: 'slack', name: 'Slack', description: 'Post build and release updates to a channel.', icon: 'nx-message', status: 'connected' },
    { id: 'github', name: 'GitHub', description: 'Sync pull requests and issues into your workspace.', icon: 'nx-github', status: 'connected' },
    { id: 'stripe', name: 'Stripe', description: 'Billing is temporarily unavailable - check your API key.', icon: 'nx-credit-card', status: 'error' },
    { id: 'zapier', name: 'Zapier', description: 'Automate workflows across thousands of apps.', icon: 'nx-refresh', status: 'disconnected' },
    { id: 'salesforce', name: 'Salesforce', description: 'Sync contacts and deals with your CRM.', icon: 'nx-cloud', status: 'disconnected' },
    { id: 'notion', name: 'Notion', description: 'Mirror docs and specs into a shared workspace.', icon: 'nx-book', status: 'connected' },
  ];

  basicCode = `<nx-integration-manager
    [integrations]="integrations"
    (connect)="onConnect($event)"
    (disconnect)="onDisconnect($event)"
    (configure)="onConfigure($event)">
</nx-integration-manager>`;

  basicTs = `integrations: NxIntegrationManagerItem[] = [
  { id: 'slack', name: 'Slack', description: 'Post build and release updates to a channel.', icon: 'nx-message', status: 'connected' },
  { id: 'github', name: 'GitHub', description: 'Sync pull requests and issues into your workspace.', icon: 'nx-github', status: 'connected' },
  { id: 'stripe', name: 'Stripe', description: 'Billing is temporarily unavailable - check your API key.', icon: 'nx-credit-card', status: 'error' },
  // ...
];

onConnect(integration: NxIntegrationManagerItem): void {
  // call your API, then flip that integration's status to 'connected'
}
onDisconnect(integration: NxIntegrationManagerItem): void { /* flip status back to 'disconnected' */ }
onConfigure(integration: NxIntegrationManagerItem): void { /* navigate to this integration's settings */ }`;

  onConnect(integration: NxIntegrationManagerItem): void {
    integration.status = 'connected';
    this.lastEvent = `${integration.name}: connected`;
  }

  onDisconnect(integration: NxIntegrationManagerItem): void {
    integration.status = 'disconnected';
    this.lastEvent = `${integration.name}: disconnected`;
  }

  onConfigure(integration: NxIntegrationManagerItem): void {
    this.lastEvent = `${integration.name}: opened configuration`;
  }
}
