import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';

/**
 * Sign-up page of the "Course Website" PRO template - mirrors the Login page's two-column
 * "marketing panel + auth form" layout with perks-focused copy instead of a testimonial.
 */
@Component({
  selector: 'app-course-website-signup',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './course-website-signup.html',
  styleUrl: './course-website-signup.scss',
})
export class CourseWebsiteSignupDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly agreedToTerms = signal(false);

  protected readonly perks = [
    { icon: 'nx-book', text: 'Full access to every course, one-time price' },
    { icon: 'nx-star', text: 'Certificates of completion' },
    { icon: 'nx-users', text: 'Direct access to instructors in the community' },
  ];
}
