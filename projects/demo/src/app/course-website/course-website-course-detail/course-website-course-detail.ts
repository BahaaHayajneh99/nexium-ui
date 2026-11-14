import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import {
  NxButton,
  NxIcon,
  NxRating,
  NxTag,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxAccordionComponent,
  NxAccordionItemComponent,
  NxAccordionHeaderComponent,
  NxAccordionContentComponent,
  nxProLicenseGranted,
} from 'components';
import { COURSES, COURSE_INSTRUCTORS, COURSE_REVIEWS, NxCourse } from '../course-website-data';

/**
 * Course Detail page of the "Course Website" PRO template - resolves the course by the
 * `:slug` route param, the same `toSignal(route.paramMap...)` + `computed()` pattern used by
 * `pro-website-details.ts`.
 */
@Component({
  selector: 'app-course-website-course-detail',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DecimalPipe,
    RouterLink,
    NxButton,
    NxIcon,
    NxRating,
    NxTag,
    NxBreadcrumb,
    NxAccordionComponent,
    NxAccordionItemComponent,
    NxAccordionHeaderComponent,
    NxAccordionContentComponent,
  ],
  templateUrl: './course-website-course-detail.html',
  styleUrl: './course-website-course-detail.scss',
})
export class CourseWebsiteCourseDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  protected readonly reviews = COURSE_REVIEWS;

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly course = computed<NxCourse | null>(() => COURSES.find((c) => c.slug === this.slug()) ?? null);

  protected readonly instructor = computed(() => {
    const course = this.course();
    return course ? (COURSE_INSTRUCTORS.find((i) => i.id === course.instructorId) ?? null) : null;
  });

  protected readonly moreCourses = computed<NxCourse[]>(() => {
    const course = this.course();
    if (!course) {
      return [];
    }
    return COURSES.filter((c) => c.slug !== course.slug).slice(0, 3);
  });

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => {
    const course = this.course();
    return [
      { label: 'Home', link: '/course-website/home' },
      { label: 'Courses', link: '/course-website/courses' },
      { label: course?.title ?? 'Course' },
    ];
  });

  protected lessonCount(course: NxCourse): number {
    return course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
  }
}
