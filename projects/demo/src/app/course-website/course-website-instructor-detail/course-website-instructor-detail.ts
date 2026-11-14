import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NxButton, NxIcon, NxRating, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { COURSES, COURSE_INSTRUCTORS, NxCourse, NxCourseInstructor } from '../course-website-data';

/**
 * Instructor Detail page of the "Course Website" PRO template - resolves the instructor by the
 * numeric `:id` route param, mirroring the `toSignal(route.paramMap...)` + `computed()` pattern
 * used by course-website-course-detail.ts, then lists their courses.
 */
@Component({
  selector: 'app-course-website-instructor-detail',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxRating, NxBreadcrumb],
  templateUrl: './course-website-instructor-detail.html',
  styleUrl: './course-website-instructor-detail.scss',
})
export class CourseWebsiteInstructorDetailDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly id = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: Number(this.route.snapshot.paramMap.get('id')) },
  );

  protected readonly instructor = computed<NxCourseInstructor | null>(
    () => COURSE_INSTRUCTORS.find((i) => i.id === this.id()) ?? null,
  );

  protected readonly instructorCourses = computed<NxCourse[]>(() => {
    const instructor = this.instructor();
    return instructor ? COURSES.filter((c) => c.instructorId === instructor.id) : [];
  });

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => {
    const instructor = this.instructor();
    return [
      { label: 'Home', link: '/course-website/home' },
      { label: 'Instructors', link: '/course-website/instructors' },
      { label: instructor?.name ?? 'Instructor' },
    ];
  });
}
