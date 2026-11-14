import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { nxProLicenseGranted, NxButton, NxIcon, NxChip, NxBreadcrumb, NxBreadcrumbItem } from 'components';
import { ECOM_BLOG_POSTS, NxEcomBlogPost } from '../ecommerce-website-data';

/**
 * Blog / journal listing page of the "E-Commerce Website" PRO template - a category-filterable
 * grid of posts from ECOM_BLOG_POSTS, with the featured post (if any) promoted to a hero card
 * while the "All" filter is active.
 */
@Component({
  selector: 'app-ecommerce-website-blog',
  imports: [NgTemplateOutlet, RouterLink, NxButton, NxIcon, NxChip, NxBreadcrumb],
  templateUrl: './ecommerce-website-blog.html',
  styleUrl: './ecommerce-website-blog.scss',
})
export class EcommerceWebsiteBlogDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/ecommerce-website/home' },
    { label: 'Blog' },
  ];

  protected readonly posts = ECOM_BLOG_POSTS;

  protected readonly featuredPost: NxEcomBlogPost | undefined = ECOM_BLOG_POSTS.find((post) => post.featured);

  protected readonly categories = computed(() => {
    const unique = Array.from(new Set(ECOM_BLOG_POSTS.map((post) => post.category)));
    return ['All', ...unique];
  });

  protected readonly selectedCategory = signal<string>('All');

  protected readonly filteredPosts = computed(() => {
    const category = this.selectedCategory();
    const base = category === 'All' ? this.posts : this.posts.filter((post) => post.category === category);
    // The featured post already gets its own hero treatment while "All" is selected.
    if (category === 'All' && this.featuredPost) {
      return base.filter((post) => post.slug !== this.featuredPost!.slug);
    }
    return base;
  });

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
