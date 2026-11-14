import { Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { nxProLicenseGranted, NxButton, NxIcon, NxTag, NxCard, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { ECOM_BLOG_POSTS, NxEcomBlogPost } from '../ecommerce-website-data';

/**
 * Blog post detail page of the "E-Commerce Website" PRO template. Looks the post up by the
 * `:slug` route param in ECOM_BLOG_POSTS, mirroring the toSignal + computed pattern used by
 * ProWebsiteDetails for its own `:slug` route.
 */
@Component({
  selector: 'app-ecommerce-website-blog-post',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxTag, NxCard, NxBreadcrumb],
  templateUrl: './ecommerce-website-blog-post.html',
  styleUrl: './ecommerce-website-blog-post.scss',
})
export class EcommerceWebsiteBlogPostDemo {
  private readonly route = inject(ActivatedRoute);

  protected readonly licensed = nxProLicenseGranted();

  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), {
    initialValue: this.route.snapshot.paramMap.get('slug'),
  });

  protected readonly post = computed<NxEcomBlogPost | null>(
    () => ECOM_BLOG_POSTS.find((p) => p.slug === this.slug()) ?? null,
  );

  protected readonly breadcrumbItems = computed<NxBreadcrumbItem[]>(() => [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'Blog', link: '/ecommerce-website/blog' },
    { label: this.post()?.title ?? 'Article' },
  ]);

  protected readonly morePosts = computed<NxEcomBlogPost[]>(() => {
    const current = this.post();
    if (!current) {
      return [];
    }
    return ECOM_BLOG_POSTS.filter((p) => p.slug !== current.slug).slice(0, 3);
  });
}
