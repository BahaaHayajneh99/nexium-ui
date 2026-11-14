import { Component, computed } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxRating, NxStatistic, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { COURSE_REVIEWS, COURSES } from '../course-website-data';

/**
 * Reviews page of the "Course Website" PRO template - an overall rating summary (via
 * nx-statistic) followed by every student review as a card.
 */
@Component({
  selector: 'app-course-website-reviews',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxRating, NxStatistic, NxBreadcrumb],
  templateUrl: './course-website-reviews.html',
  styleUrl: './course-website-reviews.scss',
})
export class CourseWebsiteReviewsDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/course-website/home' },
    { label: 'Reviews' },
  ];

  protected readonly reviews = COURSE_REVIEWS;

  protected readonly courseCount = COURSES.length;

  protected readonly totalStudentReviews = computed(() => COURSES.reduce((sum, c) => sum + c.reviewCount, 0));

  protected readonly averageRating = computed(() => {
    const totalWeighted = COURSES.reduce((sum, c) => sum + c.rating * c.reviewCount, 0);
    const totalReviews = this.totalStudentReviews();
    return totalReviews ? Math.round((totalWeighted / totalReviews) * 10) / 10 : 0;
  });
}
