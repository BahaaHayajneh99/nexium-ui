import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { COURSE_BLOG_POSTS } from '../course-website-data';

/**
 * Blog list page of the "Course Website" PRO template - a grid of article cards linking to
 * the blog post detail route.
 */
@Component({
  selector: 'app-course-website-blog',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './course-website-blog.html',
  styleUrl: './course-website-blog.scss',
})
export class CourseWebsiteBlogDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/course-website/home' },
    { label: 'Blog' },
  ];

  protected readonly posts = COURSE_BLOG_POSTS;
}
