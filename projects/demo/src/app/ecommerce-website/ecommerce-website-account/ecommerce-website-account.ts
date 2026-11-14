import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxTag,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxTabsComponent,
  NxTabComponent,
  nxProLicenseGranted,
} from 'components';
import { ECOM_ORDERS, NxEcomOrder, NxEcomOrderStatus } from '../ecommerce-website-data';

interface NxEcomAddress {
  label: string;
  address: string;
  default: boolean;
}

@Component({
  selector: 'app-ecommerce-website-account',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb, NxTabsComponent, NxTabComponent],
  templateUrl: './ecommerce-website-account.html',
  styleUrl: './ecommerce-website-account.scss',
})
export class EcommerceWebsiteAccountDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'My Account' },
  ];

  protected readonly orders: NxEcomOrder[] = ECOM_ORDERS;

  protected readonly addresses: NxEcomAddress[] = [
    { label: 'Home', address: '124 Harbor View Dr, Austin, TX 78701', default: true },
    { label: 'Work', address: '900 Congress Ave, Suite 400, Austin, TX 78701', default: false },
  ];

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
