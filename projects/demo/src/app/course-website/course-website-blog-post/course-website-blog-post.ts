import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NxButton, NxIcon, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { COURSE_BLOG_POSTS, NxCourseBlogPost } from '../course-website-data';

/**
 * Blog Post detail page of the "Course Website" PRO template - resolves the article by the
 * `:slug` route param, the same pattern used by course-website-course-detail.ts.
 */
@Component({
  selector: 'app-course-website-blog-post',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxBreadcrumb],
  templateUrl: './course-website-blog-post.html',
  styleUrl: './course-website-blog-post.scss',
})
export class CourseWebsiteBlogPostDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly post = computed<NxCourseBlogPost | null>(
    () => COURSE_BLOG_POSTS.find((p) => p.slug === this.slug()) ?? null,
  );

  protected readonly morePosts = computed<NxCourseBlogPost[]>(() => {
    const post = this.post();
    if (!post) {
      return [];
    }
    return COURSE_BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  });

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => {
    const post = this.post();
    return [
      { label: 'Home', link: '/course-website/home' },
      { label: 'Blog', link: '/course-website/blog' },
      { label: post?.title ?? 'Article' },
    ];
  });
}
