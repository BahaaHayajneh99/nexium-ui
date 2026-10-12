import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxApiKeyManager, NxApiKey } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-ui-api-key-manager-demo',
  imports: [NxApiKeyManager, DemoSection],
  templateUrl: './ui-api-key-manager-demo.html',
  styleUrl: './ui-api-key-manager-demo.scss',
})
export class UiApiKeyManagerDemo {
  importCode = `import { NxApiKeyManager, NxApiKey } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  private nextId = 5;

  // Signal rather than a plain property: createKey/revokeKey below rebuild this immutably, and in
  // this zoneless demo app a plain property write wouldn't be picked up until some unrelated click
  // happened to trigger a re-render.
  apiKeys = signal<NxApiKey[]>([
    {
      id: 1,
      name: 'Production backend',
      maskedKey: 'sk_live_••••••••a1B2',
      scopes: ['read', 'write'],
      createdAt: '2026-06-02T09:00:00',
      lastUsedAt: '2026-10-08T07:45:00',
    },
    {
      id: 2,
      name: 'CI deploy bot',
      maskedKey: 'sk_live_••••••••f9Qk',
      scopes: ['deploy'],
      createdAt: '2026-07-14T13:20:00',
      lastUsedAt: '2026-10-07T22:10:00',
    },
    {
      id: 3,
      name: 'Analytics export',
      maskedKey: 'sk_live_••••••••3xZc',
      scopes: ['read'],
      createdAt: '2026-08-20T11:05:00',
    },
    {
      id: 4,
      name: 'Legacy mobile app',
      maskedKey: 'sk_live_••••••••9mNp',
      scopes: ['read', 'write', 'admin'],
      createdAt: '2026-03-11T16:40:00',
      lastUsedAt: '2026-09-29T18:02:00',
    },
  ]);

  /** The one-time plaintext value shown in the "copy this now" banner right after a create, cleared once dismissed/copied. */
  newlyCreatedKey = signal<string | null>(null);

  onCreateKey(): void {
    const id = this.nextId++;
    const plaintext = `sk_live_${this.randomSuffix(24)}`;
    const masked = `sk_live_••••••••${plaintext.slice(-4)}`;

    this.apiKeys.update((current) => [
      ...current,
      {
        id,
        name: `New key #${id}`,
        maskedKey: masked,
        scopes: ['read'],
        createdAt: new Date().toISOString(),
      },
    ]);

    this.newlyCreatedKey.set(plaintext);
  }

  onRevokeKey(id: string | number): void {
    this.apiKeys.update((current) => current.filter((key) => key.id !== id));
  }

  private randomSuffix(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let out = '';
    for (let i = 0; i < length; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }

  basicCode = `<nx-api-key-manager
    [apiKeys]="apiKeys()"
    [newlyCreatedKey]="newlyCreatedKey()"
    (createKey)="onCreateKey()"
    (revokeKey)="onRevokeKey($event)">
</nx-api-key-manager>`;

  basicTs = `apiKeys: NxApiKey[] = [
  { id: 1, name: 'Production backend', maskedKey: 'sk_live_••••••••a1B2',
    scopes: ['read', 'write'], createdAt: '2026-06-02T09:00:00', lastUsedAt: '2026-10-08T07:45:00' },
  // ...more keys
];

newlyCreatedKey: string | null = null;

onCreateKey(): void {
  // Generate the real key server-side, push the new (masked) row into apiKeys yourself,
  // then set newlyCreatedKey to the one-time plaintext value so the component can show
  // the "copy this now" banner. It is never stored or shown again after that.
  const plaintext = generateApiKey();
  this.apiKeys = [...this.apiKeys, { id: nextId(), name: 'New key', maskedKey: mask(plaintext), scopes: ['read'], createdAt: new Date().toISOString() }];
  this.newlyCreatedKey = plaintext;
}

onRevokeKey(id: string | number): void {
  this.apiKeys = this.apiKeys.filter((key) => key.id !== id);
}`;
}
