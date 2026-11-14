import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { nxProLicenseGranted, NxIcon, NxButton } from 'components';

/**
 * Shared shell for the "Online Course / LMS Website" PRO template ("Pathwise Academy") - a
 * real course-platform header + footer wrapping a <router-outlet> so each of the 8 pages
 * (home/courses/course detail/instructors/dashboard/login/signup/contact) is its own
 * standalone route. The PRO lock is applied independently inside each page.
 */
@Component({
  selector: 'app-course-website-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NxIcon, NxButton],
  templateUrl: './course-website-shell.html',
  styleUrl: './course-website-shell.scss',
})
export class CourseWebsiteShell {
  protected readonly licensed = nxProLicenseGranted();

  readonly navLinks = [
    { label: 'Home', path: '/course-website/home' },
    { label: 'Courses', path: '/course-website/courses' },
    { label: 'Instructors', path: '/course-website/instructors' },
    { label: 'Pricing', path: '/course-website/pricing' },
    { label: 'Contact', path: '/course-website/contact' },
  ];
}
