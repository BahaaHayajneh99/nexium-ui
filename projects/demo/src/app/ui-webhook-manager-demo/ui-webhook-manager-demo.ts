import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxWebhookManager, NxWebhookEndpoint, NxWebhookEventOption } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-webhook-manager-demo',
  imports: [NxWebhookManager, DemoSection],
  templateUrl: './ui-webhook-manager-demo.html',
  styleUrl: './ui-webhook-manager-demo.scss',
})
export class UiWebhookManagerDemo {
  importCode = `import { NxWebhookManager, NxWebhookEndpoint } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  private nextId = 4;

  availableEvents: NxWebhookEventOption[] = [
    { label: 'Order created', value: 'order.created' },
    { label: 'Order updated', value: 'order.updated' },
    { label: 'Order cancelled', value: 'order.cancelled' },
    { label: 'Payment succeeded', value: 'payment.succeeded' },
    { label: 'Payment failed', value: 'payment.failed' },
    { label: 'User signed up', value: 'user.signup' },
  ];

  // Signal rather than a plain property: addWebhook/toggleEnabled/testPing/deleteWebhook below
  // rebuild this immutably, and in this zoneless demo app a plain property write wouldn't be
  // picked up until some unrelated click happened to trigger a re-render.
  webhooks = signal<NxWebhookEndpoint[]>([
    {
      id: 1,
      url: 'https://api.acme.dev/hooks/orders',
      events: ['order.created', 'order.updated', 'order.cancelled'],
      enabled: true,
      lastDeliveryStatus: 'success',
      lastDeliveryAt: '2026-10-08T06:30:00',
    },
    {
      id: 2,
      url: 'https://billing.acme.dev/webhooks/payments',
      events: ['payment.succeeded', 'payment.failed'],
      enabled: true,
      lastDeliveryStatus: 'failed',
      lastDeliveryAt: '2026-10-07T21:15:00',
    },
    {
      id: 3,
      url: 'https://crm.example.com/integrations/nexaui',
      events: ['user.signup'],
      enabled: false,
    },
  ]);

  onAddWebhook(event: { url: string; events: string[] }): void {
    this.webhooks.update((current) => [
      ...current,
      {
        id: this.nextId++,
        url: event.url,
        events: event.events,
        enabled: true,
      },
    ]);
  }

  onToggleEnabled(event: { id: string | number; enabled: boolean }): void {
    this.webhooks.update((current) =>
      current.map((webhook) => (webhook.id === event.id ? { ...webhook, enabled: event.enabled } : webhook)),
    );
  }

  onTestPing(id: string | number): void {
    // Simulated delivery: no real network call, just flips the last-delivery fields after a
    // short delay so the row visibly updates, same as a real ping round-trip would.
    setTimeout(() => {
      const succeeded = Math.random() > 0.2;
      this.webhooks.update((current) =>
        current.map((webhook) =>
          webhook.id === id
            ? { ...webhook, lastDeliveryStatus: succeeded ? 'success' : 'failed', lastDeliveryAt: new Date().toISOString() }
            : webhook,
        ),
      );
    }, 900);
  }

  onDeleteWebhook(id: string | number): void {
    this.webhooks.update((current) => current.filter((webhook) => webhook.id !== id));
  }

  basicCode = `<nx-webhook-manager
    [webhooks]="webhooks()"
    [availableEvents]="availableEvents"
    (addWebhook)="onAddWebhook($event)"
    (toggleEnabled)="onToggleEnabled($event)"
    (testPing)="onTestPing($event)"
    (deleteWebhook)="onDeleteWebhook($event)">
</nx-webhook-manager>`;

  basicTs = `availableEvents = [
  { label: 'Order created', value: 'order.created' },
  { label: 'Payment succeeded', value: 'payment.succeeded' },
  // ...more event types
];

webhooks: NxWebhookEndpoint[] = [
  { id: 1, url: 'https://api.acme.dev/hooks/orders', events: ['order.created', 'order.updated'],
    enabled: true, lastDeliveryStatus: 'success', lastDeliveryAt: '2026-10-08T06:30:00' },
  // ...more endpoints
];

onAddWebhook(event: { url: string; events: string[] }): void {
  this.webhooks = [...this.webhooks, { id: nextId(), url: event.url, events: event.events, enabled: true }];
}

onToggleEnabled(event: { id: string | number; enabled: boolean }): void {
  this.webhooks = this.webhooks.map((w) => (w.id === event.id ? { ...w, enabled: event.enabled } : w));
}

onTestPing(id: string | number): void {
  // Send a real test delivery, then update lastDeliveryStatus/lastDeliveryAt for that row.
}

onDeleteWebhook(id: string | number): void {
  this.webhooks = this.webhooks.filter((w) => w.id !== id);
}`;
}
