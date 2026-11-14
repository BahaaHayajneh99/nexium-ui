import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NxButton, NxIcon, NxTag, NxBreadcrumb, NxBreadcrumbItem, NxStepper, nxProLicenseGranted } from 'components';
import { ECOM_ORDERS, NxEcomOrderStatus } from '../ecommerce-website-data';

@Component({
  selector: 'app-ecommerce-website-order-tracking',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb, NxStepper],
  templateUrl: './ecommerce-website-order-tracking.html',
  styleUrl: './ecommerce-website-order-tracking.scss',
})
export class EcommerceWebsiteOrderTrackingDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly orderId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))), {
    initialValue: this.route.snapshot.paramMap.get('id'),
  });

  protected readonly order = computed(() => ECOM_ORDERS.find((o) => o.id === this.orderId()) ?? null);

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'My Account', link: '/ecommerce-website/account' },
    { label: this.order() ? 'Order #' + this.order()!.id : 'Order Tracking' },
  ]);

  protected readonly stepperSteps = computed(() => (this.order()?.trackingSteps ?? []).map((step) => ({ label: step.label })));

  protected readonly activeStepIndex = computed(() => {
    const steps = this.order()?.trackingSteps ?? [];
    let lastDone = 0;
    steps.forEach((step, index) => {
      if (step.done) {
        lastDone = index;
      }
    });
    return lastDone;
  });

  protected readonly itemsTotal = computed(() =>
    (this.order()?.items ?? []).reduce((sum, item) => sum + item.qty * item.product.price, 0),
  );

  protected statusColor(status: NxEcomOrderStatus): string {
    switch (status) {
      case 'Delivered':
        return '#16a34a';
      case 'Shipped':
      case 'Out for Delivery':
        return '#2563eb';
      case 'Processing':
        return '#d97706';
      case 'Cancelled':
        return '#dc2626';
      default:
        return 'var(--shell-text-muted)';
    }
  }
}
