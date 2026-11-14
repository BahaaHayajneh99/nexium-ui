import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  NxButton,
  NxIcon,
  NxBreadcrumb,
  NxBreadcrumbItem,
  NxStatistic,
  NxProgressBarComponent,
  NxActivityFeed,
  NxActivityFeedItem,
  NxRankingList,
  NxRankingItem,
  nxProLicenseGranted,
} from 'components';
import { ENROLLED_COURSES } from '../course-website-data';

/**
 * Student Dashboard page of the "Course Website" PRO template - the logged-in student view,
 * showing enrollment stats and in-progress courses with a progress bar per course.
 */
@Component({
  selector: 'app-course-website-dashboard',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    NxButton,
    NxIcon,
    NxBreadcrumb,
    NxStatistic,
    NxProgressBarComponent,
    NxActivityFeed,
    NxRankingList,
  ],
  templateUrl: './course-website-dashboard.html',
  styleUrl: './course-website-dashboard.scss',
})
export class CourseWebsiteDashboardDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/course-website/home' },
    { label: 'Dashboard' },
  ];

  protected readonly enrolledCourses = ENROLLED_COURSES;

  protected readonly stats = [
    { label: 'Courses Enrolled', value: ENROLLED_COURSES.length, suffix: '' },
    { label: 'Hours Learned', value: 47, suffix: 'h' },
    { label: 'Certificates Earned', value: 2, suffix: '' },
    { label: 'Current Streak', value: 9, suffix: ' days' },
  ];

  protected readonly activityItems: NxActivityFeedItem[] = [
    {
      id: 'a1',
      actorName: 'Jordan',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=12',
      action: 'completed a lesson in',
      target: 'Full-Stack JavaScript Bootcamp',
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
      category: 'lesson',
    },
    {
      id: 'a2',
      actorName: 'Jordan',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=12',
      action: 'earned a certificate for',
      target: 'SEO & Organic Growth Strategy',
      timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
      category: 'certificate',
    },
    {
      id: 'a3',
      actorName: 'Priya Anand',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=47',
      action: 'replied to your question in',
      target: 'Startup Financial Modeling',
      timestamp: new Date(Date.now() - 21 * 3600000).toISOString(),
      category: 'comment',
    },
    {
      id: 'a4',
      actorName: 'Jordan',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=12',
      action: 'started',
      target: 'UI/UX Design Fundamentals',
      timestamp: new Date(Date.now() - 28 * 3600000).toISOString(),
      category: 'enrollment',
    },
    {
      id: 'a5',
      actorName: 'Marcus Chen',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=14',
      action: 'posted a new lesson in',
      target: 'Advanced React Patterns',
      timestamp: new Date(Date.now() - 50 * 3600000).toISOString(),
      category: 'lesson',
    },
    {
      id: 'a6',
      actorName: 'Jordan',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=12',
      action: 'left a review on',
      target: 'Negotiation Mastery',
      timestamp: new Date(Date.now() - 75 * 3600000).toISOString(),
      category: 'review',
    },
    {
      id: 'a7',
      actorName: 'Jordan',
      actorAvatarUrl: 'https://i.pravatar.cc/150?img=12',
      action: 'hit a 9-day streak in',
      target: 'Pathwise Academy',
      timestamp: new Date(Date.now() - 100 * 3600000).toISOString(),
      category: 'milestone',
    },
  ];

  protected readonly topLearners: NxRankingItem[] = [
    { id: 1, rank: 1, name: 'Hannah Osei', avatarUrl: 'https://i.pravatar.cc/150?img=5', value: '1,420 XP', delta: '+2' },
    { id: 2, rank: 2, name: 'Diego Fernandez', avatarUrl: 'https://i.pravatar.cc/150?img=18', value: '1,310 XP', delta: '+1' },
    { id: 3, rank: 3, name: 'Jordan', avatarUrl: 'https://i.pravatar.cc/150?img=12', value: '1,245 XP', delta: '+4' },
    { id: 4, rank: 4, name: 'Yuki Tanaka', avatarUrl: 'https://i.pravatar.cc/150?img=36', value: '1,180 XP', delta: '-1' },
    { id: 5, rank: 5, name: 'Olivia Bennett', avatarUrl: 'https://i.pravatar.cc/150?img=41', value: '1,065 XP', delta: '0' },
  ];
}
