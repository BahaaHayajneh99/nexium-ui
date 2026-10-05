import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

declare const paypal: {
  Buttons: (config: {
    createOrder: (data: unknown, actions: PaypalOrderActions) => Promise<string>;
    onApprove: (data: unknown, actions: PaypalOrderActions) => Promise<void>;
  }) => { render: (selector: string) => void };
};

interface PaypalCaptureDetails {
  id: string;
}

interface PaypalOrderActions {
  order: {
    create: (details: { purchase_units: { amount: { value: string } }[] }) => Promise<string>;
    capture: () => Promise<PaypalCaptureDetails>;
  };
}

/**
 * Must be the SAME PayPal app's Client ID as the PAYPAL_CLIENT_ID env var the api/claimLicenseToken
 * Vercel function verifies orders with - orders created under a different app/account (e.g.
 * PayPal's generic "sb" placeholder) aren't visible to our server's REST API lookup, which fails
 * the claim with "order lookup failed (404)".
 *
 * Sandbox on localhost (so local dev never touches real money), the real live app's Client ID on
 * the deployed site - matching api/claimLicenseToken.js's PAYPAL_API_BASE split between
 * api-m.sandbox.paypal.com (local/.env.local) and api-m.paypal.com (Vercel production env var).
 */
const PAYPAL_CLIENT_ID =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'AVY9yInizkzznTcIrCEzsNZk4W8lFvmMcrXnB6Eusejmc2Tx43SZwDJ1zXrVshkHVG3yhIjqd5gKWTM4'
    : 'BAAl4KU4z3WNW51eywudLwGBCUolVtotmgTGpfcAKzIfKKzGp7XedHwNR3Zv8A2Gp9Mu9UVXGqT432UikA';

// Must stay in sync with PLAN_PRICES in functions/index.js - the server derives which plan was
// bought purely from the amount PayPal confirms was paid, never from anything the client asserts.
export type NxPlan = 'lifetime' | 'yearly';
const PLAN_PRICES: Record<NxPlan, string> = { lifetime: '199.00', yearly: '59.00' };

// Display-only "was" price for the strikethrough/discount badge - purely cosmetic, never sent to
// PayPal or checked by the server. Lets the real charged price (PLAN_PRICES above) be raised
// gradually over time just by shrinking the discount, without ever touching checkout/verification.
const DISPLAY_ORIGINAL_PRICES: Record<NxPlan, string> = { lifetime: '299.00', yearly: '99.00' };

// The Vercel serverless function that server-side-verifies the PayPal order and hands out a real
// token from the license pool - see api/claimLicenseToken.js. No token generation happens in the
// browser anymore; the client never sees anything it could forge or replay.
//
// This file is demo-only (never published to npm), so it's safe to auto-switch to a local
// `vercel dev` server during `ng serve` - run `vercel dev` alongside it (reads api/.env.local,
// api/.env.local for sandbox PayPal secrets) to test the whole checkout-to-token flow without
// touching production.
const CLAIM_LICENSE_ENDPOINT =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api/claimLicenseToken'
    : 'https://nexium-ui.vercel.app/api/claimLicenseToken';

// Emails an already-claimed token to an address the buyer types in themselves - a backup, since
// the token above is only ever shown once and a page refresh would otherwise lose it.
const SEND_EMAIL_ENDPOINT =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api/sendLicenseEmail'
    : 'https://nexium-ui.vercel.app/api/sendLicenseEmail';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A "buy a PRO license for your own project" page - completing PayPal checkout claims a real token from the license pool. */
@Component({
  selector: 'app-pro-upgrade',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pro-upgrade.html',
  styleUrl: './pro-upgrade.scss',
})
export class ProUpgrade implements OnInit {
  selectedPlan = signal<NxPlan>('lifetime');
  plans = PLAN_PRICES;
  originalPlans = DISPLAY_ORIGINAL_PRICES;
  checkoutFailed = signal(false);
  claimFailed = signal(false);
  licenseToken = signal<string | null>(null);
  copied = signal(false);

  emailAddress = signal('');
  emailStatus = signal<'idle' | 'sending' | 'sent' | 'invalid' | 'failed'>('idle');

  get price(): string {
    return this.plans[this.selectedPlan()];
  }

  /** Whole-number discount badge (e.g. 33 for "33% OFF"), derived from the two display prices. */
  discountPercent(plan: NxPlan): number {
    const original = Number(this.originalPlans[plan]);
    const current = Number(this.plans[plan]);
    return Math.round((1 - current / original) * 100);
  }

  selectPlan(plan: NxPlan): void {
    this.selectedPlan.set(plan);
  }

  ngOnInit(): void {
    this.loadPaypalSdk()
      .then(() => this.renderButtons())
      .catch(() => this.checkoutFailed.set(true));
  }

  copyToken(): void {
    const token = this.licenseToken();
    if (!token) {
      return;
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
    navigator.clipboard?.writeText(token).catch(() => {});
  }

  onEmailInput(value: string): void {
    this.emailAddress.set(value);
    if (this.emailStatus() !== 'sending') {
      this.emailStatus.set('idle');
    }
  }

  async sendTokenByEmail(): Promise<void> {
    const token = this.licenseToken();
    const email = this.emailAddress().trim();
    if (!token) {
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      this.emailStatus.set('invalid');
      return;
    }

    this.emailStatus.set('sending');
    try {
      const response = await fetch(SEND_EMAIL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email }),
      });
      this.emailStatus.set(response.ok ? 'sent' : 'failed');
    } catch {
      this.emailStatus.set('failed');
    }
  }

  private loadPaypalSdk(): Promise<void> {
    if (typeof paypal !== 'undefined') {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load the PayPal SDK'));
      document.body.appendChild(script);
    });
  }

  private renderButtons(): void {
    paypal
      .Buttons({
        createOrder: (_data, actions) =>
          actions.order.create({
            purchase_units: [{ amount: { value: this.price } }],
          }),
        onApprove: (_data, actions) =>
          actions.order.capture().then((details) => this.claimLicenseToken(details.id)),
      })
      .render('#paypal-button-container');
  }

  private async claimLicenseToken(orderId: string): Promise<void> {
    this.claimFailed.set(false);
    try {
      const response = await fetch(CLAIM_LICENSE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      if (!response.ok) {
        this.claimFailed.set(true);
        return;
      }
      const data = (await response.json()) as { token?: string };
      if (!data.token) {
        this.claimFailed.set(true);
        return;
      }
      this.licenseToken.set(data.token);
    } catch {
      this.claimFailed.set(true);
    }
  }
}
