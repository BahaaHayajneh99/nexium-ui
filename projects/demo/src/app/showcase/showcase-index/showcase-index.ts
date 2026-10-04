import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxIcon, NxBadge } from 'components';

interface ShowcaseCase {
  title: string;
  description: string;
  icon: string;
  path: string;
  isNew?: boolean;
  comingSoon?: boolean;
}

@Component({
  selector: 'app-showcase-index',
  standalone: true,
  imports: [RouterLink, NxIcon, NxBadge],
  templateUrl: './showcase-index.html',
  styleUrl: './showcase-index.scss',
})
export class ShowcaseIndex {
  protected readonly cases: ShowcaseCase[] = [
    {
      title: 'Admin Dashboard (Nova)',
      description: 'A full 8-page SaaS admin panel: dashboard, analytics charts, advanced data grid, customers, invoices, kanban board, team, and settings.',
      icon: 'nx-layout',
      path: '/showcase/dashboard',
      isNew: true,
    },
    {
      title: 'Marketing Site (Nova)',
      description: 'A complete landing page: hero, feature grid, testimonials, pricing tiers, and footer - a real product site built entirely with NexiumUI.',
      icon: 'nx-globe',
      path: '/showcase-marketing',
      isNew: true,
    },
    {
      title: 'E-commerce Storefront (Fernway)',
      description: 'A home goods storefront: category filters, product grid, star ratings, and a real working cart drawer.',
      icon: 'nx-shopping-cart',
      path: '/showcase-ecommerce',
      isNew: true,
    },
    {
      title: 'Support / Helpdesk (Pulse)',
      description: 'A two-pane helpdesk: filterable ticket queue, a real conversation thread, and a reply box.',
      icon: 'nx-help-circle',
      path: '/showcase-support',
      isNew: true,
    },
    {
      title: 'CRM / Sales Pipeline (Forge)',
      description: 'A drag-and-drop deal pipeline, pipeline KPIs, and a recent contacts table.',
      icon: 'nx-users',
      path: '/showcase-crm',
      isNew: true,
    },
    {
      title: 'Booking / Reservation Flow (Solstice)',
      description: 'A 4-step studio class booking wizard: pick a class, date & time, your details, and confirm.',
      icon: 'nx-calendar',
      path: '/showcase-booking',
      isNew: true,
    },
    {
      title: 'Learning Platform (Brightpath)',
      description: 'A course catalog with real progress tracking, a lesson sidebar, and a video-lecture player.',
      icon: 'nx-book',
      path: '/showcase-lms',
      isNew: true,
    },
    {
      title: 'Real Estate Listings (Haven Realty)',
      description: 'A property listings grid with type filters, and a detail view with specs, description, and an agent contact card.',
      icon: 'nx-map-pin',
      path: '/showcase-realestate',
      isNew: true,
    },
    {
      title: 'Job Board (Compass Careers)',
      description: 'Filterable job listings, a detail view with requirements, and a 3-step application wizard.',
      icon: 'nx-folder',
      path: '/showcase-jobs',
      isNew: true,
    },
    {
      title: 'Event Ticketing (Marquee)',
      description: 'An events grid with category filters, per-tier ticket quantity selection, and a full checkout flow.',
      icon: 'nx-tag',
      path: '/showcase-events',
      isNew: true,
    },
    {
      title: 'Recipe Hub (Harvest Table)',
      description: 'A searchable, filterable recipe catalog with a detail view: a serving-size stepper that scales ingredients live, and a checkable step list.',
      icon: 'nx-heart',
      path: '/showcase-recipes',
      isNew: true,
    },
    {
      title: 'Fitness Tracker',
      description: 'A workout log, weekly progress charts, and personal records.',
      icon: 'nx-fire',
      path: '',
      comingSoon: true,
    },
  ];
}
