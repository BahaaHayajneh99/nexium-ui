import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { NxButton, NxIcon, NxTag, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';
import { PORTFOLIO_BLOG_POSTS } from '../portfolio-website-data';

/**
 * Blog post detail page, resolved dynamically from the `:slug` route param - same
 * toSignal(route.paramMap...) + computed() pattern used by portfolio-website-project-detail.ts.
 */
@Component({
  selector: 'app-portfolio-website-blog-post',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxBreadcrumb],
  templateUrl: './portfolio-website-blog-post.html',
  styleUrl: './portfolio-website-blog-post.scss',
})
export class PortfolioWebsiteBlogPostDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly post = computed(() => PORTFOLIO_BLOG_POSTS.find((p) => p.slug === this.slug()) ?? null);

  protected readonly moreArticles = computed(() => {
    const post = this.post();
    if (!post) {
      return PORTFOLIO_BLOG_POSTS.slice(0, 3);
    }
    return PORTFOLIO_BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  });

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => {
    const post = this.post();
    return [
      { label: 'Home', link: '/portfolio-website/home' },
      { label: 'Blog', link: '/portfolio-website/blog' },
      { label: post?.title ?? 'Article' },
    ];
  });
}
