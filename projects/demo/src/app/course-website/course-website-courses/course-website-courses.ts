import { Component, computed, signal } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxRating, NxChip, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { COURSE_CATEGORIES, COURSES, COURSE_INSTRUCTORS, NxCourse } from '../course-website-data';

/**
 * Courses catalog page of the "Course Website" PRO template - category filter chips over a
 * responsive course grid, mirroring the E-Commerce Website Shop page's filter pattern.
 */
@Component({
  selector: 'app-course-website-courses',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxRating, NxChip, NxBreadcrumb],
  templateUrl: './course-website-courses.html',
  styleUrl: './course-website-courses.scss',
})
export class CourseWebsiteCoursesDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [{ label: 'Home', link: '/course-website/home' }, { label: 'Courses' }];

  protected readonly categories = COURSE_CATEGORIES;

  protected readonly activeCategory = signal<string>('All');

  protected readonly filteredCourses = computed<NxCourse[]>(() => {
    const category = this.activeCategory();
    return category === 'All' ? COURSES.slice() : COURSES.filter((course) => course.category === category);
  });

  protected selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  protected instructorName(instructorId: number): string {
    return COURSE_INSTRUCTORS.find((instructor) => instructor.id === instructorId)?.name ?? 'Unknown Instructor';
  }
}
