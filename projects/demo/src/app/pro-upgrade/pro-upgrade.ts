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
 * The PRO Client ID is PayPal's public sandbox placeholder ("sb") - it renders
 * real checkout buttons in test mode with no account setup. Swap it for your
 * own Client ID from developer.paypal.com (Business/Developer account) to
 * accept real payments; no other code changes are needed.
 */
const PAYPAL_CLIENT_ID = 'AVY9yInizkzznTcIrCEzsNZk4W8lFvmMcrXnB6Eusejmc2Tx43SZwDJ1zXrVshkHVG3yhIjqd5gKWTM4';
const PRO_PRICE_USD = '19.00';

// The Cloud Function that server-side-verifies the PayPal order and hands out a real token from
// the license pool - see functions/index.js (claimLicenseToken). No token generation happens in
// the browser anymore; the client never sees anything it could forge or replay.
//
// This file is demo-only (never published to npm), so it's safe to auto-switch to the local
// Firebase emulator during `ng serve` - run `firebase emulators:start` alongside it to test the
// whole PayPal-sandbox-to-token flow without touching production or needing the Blaze plan.
const CLAIM_LICENSE_ENDPOINT =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://127.0.0.1:5001/nexium-ui/us-central1/claimLicenseToken'
    : 'https://us-central1-nexium-ui.cloudfunctions.net/claimLicenseToken';

/** A "buy a PRO license for your own project" page - completing PayPal checkout claims a real token from the license pool. */
@Component({
  selector: 'app-pro-upgrade',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pro-upgrade.html',
  styleUrl: './pro-upgrade.scss',
})
export class ProUpgrade implements OnInit {
  price = PRO_PRICE_USD;
  checkoutFailed = signal(false);
  claimFailed = signal(false);
  licenseToken = signal<string | null>(null);
  copied = signal(false);

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
