import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, NxHoverCard, nxProLicenseGranted } from 'components';
import { COURSE_INSTRUCTORS } from '../course-website-data';

/**
 * Instructors page of the "Course Website" PRO template - a grid of instructor cards.
 */
@Component({
  selector: 'app-course-website-instructors',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb, NxHoverCard],
  templateUrl: './course-website-instructors.html',
  styleUrl: './course-website-instructors.scss',
})
export class CourseWebsiteInstructorsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/course-website/home' },
    { label: 'Instructors' },
  ];

  protected readonly instructors = COURSE_INSTRUCTORS;
}
