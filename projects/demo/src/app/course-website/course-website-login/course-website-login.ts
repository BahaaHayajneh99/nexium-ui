import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon } from 'components';
import { COURSE_TESTIMONIALS } from '../course-website-data';

/**
 * Login page of the "Course Website" PRO template - mirrors the E-Commerce Website login's
 * two-column "marketing panel + auth form" layout.
 */
@Component({
  selector: 'app-course-website-login',
  imports: [NgTemplateOutlet, RouterLink, NxInput, NxCheckbox, NxButton, NxDivider, NxIcon],
  templateUrl: './course-website-login.html',
  styleUrl: './course-website-login.scss',
})
export class CourseWebsiteLoginDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly rememberMe = signal(true);

  protected readonly testimonial = COURSE_TESTIMONIALS[0];
}
