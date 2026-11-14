import { Component } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxRating, NxStatistic, nxProLicenseGranted } from 'components';
import { COURSE_CATEGORIES, COURSES, COURSE_TESTIMONIALS, NxCourse, NxCourseCategory } from '../course-website-data';

interface NxCourseCategoryTile {
  name: NxCourseCategory;
  icon: string;
}

@Component({
  selector: 'app-course-website-home',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxRating, NxStatistic],
  templateUrl: './course-website-home.html',
  styleUrl: './course-website-home.scss',
})
export class CourseWebsiteHomeDemo {
  protected readonly licensed = nxProLicenseGranted();

  private readonly categoryIcons: Record<string, string> = {
    Design: 'nx-palette',
    Development: 'nx-monitor',
    Business: 'nx-chart-bar',
    Marketing: 'nx-rocket',
  };

  protected readonly categoryTiles: NxCourseCategoryTile[] = COURSE_CATEGORIES.filter(
    (category): category is NxCourseCategory => category !== 'All',
  ).map((name) => ({
    name,
    icon: this.categoryIcons[name] ?? 'nx-grid',
  }));

  protected readonly featuredCourses: NxCourse[] = COURSES.slice(0, 6);

  protected readonly testimonials = COURSE_TESTIMONIALS;

  protected readonly stats = [
    { label: 'Students', value: 50000, suffix: '+' },
    { label: 'Courses', value: 200, suffix: '+' },
    { label: 'Avg Rating', value: 4.8, suffix: '' },
    { label: 'Instructors', value: 40, suffix: '+' },
  ];
}
