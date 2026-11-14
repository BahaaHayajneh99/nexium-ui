import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxButton,
  NxIcon,
  NxInput,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';
import { ECOM_FAQ_CATEGORIES, NxEcomFaqCategory } from '../ecommerce-website-data';

/**
 * FAQ / Help Center page of the "E-Commerce Website" PRO template - renders every category in
 * ECOM_FAQ_CATEGORIES as its own accordion, with an optional search box that filters questions
 * and answers across all categories by substring match.
 */
@Component({
  selector: 'app-ecommerce-website-faq',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxInput,
    NxBreadcrumb,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './ecommerce-website-faq.html',
  styleUrl: './ecommerce-website-faq.scss',
})
export class EcommerceWebsiteFaqDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'FAQ' },
  ];

  protected readonly searchTerm = signal('');

  protected readonly filteredCategories = computed<NxEcomFaqCategory[]>(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return ECOM_FAQ_CATEGORIES;
    }
    return ECOM_FAQ_CATEGORIES.map((category) => ({
      ...category,
      items: category.items.filter(
        (faq) => faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term),
      ),
    })).filter((category) => category.items.length > 0);
  });

  protected onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }
}
