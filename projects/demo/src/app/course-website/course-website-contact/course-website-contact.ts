import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  nxProLicenseGranted,
  NxInput,
  NxButton,
  NxIcon,
  NxCard,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
} from 'components';

/**
 * Contact page of the "Course Website" PRO template - a contact form, support info card,
 * and an FAQ accordion.
 */
@Component({
  selector: 'app-course-website-contact',
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxInput,
    NxButton,
    NxIcon,
    NxCard,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './course-website-contact.html',
  styleUrl: './course-website-contact.scss',
})
export class CourseWebsiteContactDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly subjects = ['General inquiry', 'Course question', 'Billing question', 'Partnership', 'Other'];

  protected readonly infoRows = [
    { icon: 'nx-mail', text: 'support@pathwiseacademy.com' },
    { icon: 'nx-clock', text: 'Mon - Fri, 8am - 7pm ET' },
    { icon: 'nx-help-circle', text: 'Most questions answered within one business day' },
    { icon: 'nx-book', text: 'Check our Help Center before you enroll' },
  ];

  protected readonly faqs = [
    {
      q: 'Do I get lifetime access after purchase?',
      a: 'Yes - every course is a one-time purchase that includes lifetime access, including all future updates to that course.',
    },
    {
      q: 'Do courses have a certificate of completion?',
      a: 'Yes - finish every lesson in a course and a certificate of completion is generated automatically on your dashboard.',
    },
    {
      q: 'Can I get a refund if a course isn\'t right for me?',
      a: 'We offer a 14-day no-questions-asked refund on every course, as long as you have not completed more than 30% of it.',
    },
    {
      q: 'Is there a community for each course?',
      a: 'Every course includes access to a private student community where you can ask the instructor and other students questions.',
    },
  ];
}
