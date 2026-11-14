import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
  nxProLicenseGranted,
} from 'components';
import { COURSE_FAQS } from '../course-website-data';

/**
 * FAQ page of the "Course Website" PRO template - a single accordion of common questions,
 * mirroring the pattern used by ecommerce-website-faq.html.
 */
@Component({
  selector: 'app-course-website-faq',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxBreadcrumb,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './course-website-faq.html',
  styleUrl: './course-website-faq.scss',
})
export class CourseWebsiteFaqDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/course-website/home' },
    { label: 'FAQ' },
  ];

  protected readonly faqs = COURSE_FAQS;
}
