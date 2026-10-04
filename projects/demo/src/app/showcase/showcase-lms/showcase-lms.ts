import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxProgressBarComponent, NxTableOfContents, NxTocHeading } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { LMS_TS_SOURCE, LMS_HTML_SOURCE } from './showcase-lms.source';

interface NxLesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface NxShowcaseCourse {
  id: string;
  title: string;
  category: string;
  instructor: string;
  icon: string;
  swatch: string;
  lessons: NxLesson[];
}

@Component({
  selector: 'app-showcase-lms',
  standalone: true,
  imports: [RouterLink, NxNavbar, NxIcon, NxBadge, NxButton, NxProgressBarComponent, NxTableOfContents, ShowcaseSourceView],
  templateUrl: './showcase-lms.html',
  styleUrl: './showcase-lms.scss',
})
export class ShowcaseLms {
  tsSource = LMS_TS_SOURCE;
  htmlSource = LMS_HTML_SOURCE;

  courses: NxShowcaseCourse[] = [
    {
      id: 'angular-signals',
      title: 'Angular Signals in Practice',
      category: 'Frontend',
      instructor: 'Mara Lindqvist',
      icon: 'nx-fire',
      swatch: '#c0392b',
      lessons: [
        { id: 1, title: 'Why signals?', duration: '6 min', completed: true },
        { id: 2, title: 'Computed and effects', duration: '9 min', completed: true },
        { id: 3, title: 'Signals in components', duration: '11 min', completed: false },
        { id: 4, title: 'Migrating from RxJS', duration: '14 min', completed: false },
      ],
    },
    {
      id: 'design-systems',
      title: 'Building a Design System',
      category: 'Design',
      instructor: 'Yuki Tanaka',
      icon: 'nx-palette',
      swatch: '#8e44ad',
      lessons: [
        { id: 1, title: 'Tokens and primitives', duration: '8 min', completed: true },
        { id: 2, title: 'Component APIs', duration: '12 min', completed: false },
        { id: 3, title: 'Theming and dark mode', duration: '10 min', completed: false },
      ],
    },
    {
      id: 'api-design',
      title: 'Practical API Design',
      category: 'Backend',
      instructor: 'Jonas Ferreira',
      icon: 'nx-globe',
      swatch: '#2980b9',
      lessons: [
        { id: 1, title: 'REST vs. RPC', duration: '7 min', completed: false },
        { id: 2, title: 'Versioning strategies', duration: '9 min', completed: false },
        { id: 3, title: 'Rate limiting', duration: '8 min', completed: false },
      ],
    },
    {
      id: 'accessible-ui',
      title: 'Accessible UI Fundamentals',
      category: 'Design',
      instructor: 'Alex Romero',
      icon: 'nx-accessibility',
      swatch: '#16a085',
      lessons: [
        { id: 1, title: 'Screen readers 101', duration: '10 min', completed: true },
        { id: 2, title: 'Keyboard navigation', duration: '8 min', completed: true },
        { id: 3, title: 'Color contrast', duration: '6 min', completed: true },
        { id: 4, title: 'ARIA patterns', duration: '13 min', completed: false },
      ],
    },
  ];

  lessonHeadings: NxTocHeading[] = [
    { id: 'lms-notes-overview', label: 'Overview', level: 1 },
    { id: 'lms-notes-concepts', label: 'Key concepts', level: 1 },
    { id: 'lms-notes-mistakes', label: 'Common mistakes', level: 1 },
    { id: 'lms-notes-reading', label: 'Further reading', level: 1 },
  ];

  selectedCourseId = signal<string | null>(null);
  selectedCourse = computed(() => this.courses.find((c) => c.id === this.selectedCourseId()) ?? null);

  activeLessonId = signal<number | null>(null);
  activeLesson = computed(() => this.selectedCourse()?.lessons.find((l) => l.id === this.activeLessonId()) ?? null);

  courseProgress(course: NxShowcaseCourse): number {
    if (!course.lessons.length) return 0;
    return Math.round((course.lessons.filter((l) => l.completed).length / course.lessons.length) * 100);
  }

  openCourse(course: NxShowcaseCourse): void {
    this.selectedCourseId.set(course.id);
    const firstIncomplete = course.lessons.find((l) => !l.completed) ?? course.lessons[0];
    this.activeLessonId.set(firstIncomplete.id);
  }

  backToCatalog(): void {
    this.selectedCourseId.set(null);
    this.activeLessonId.set(null);
  }

  selectLesson(lesson: NxLesson): void {
    this.activeLessonId.set(lesson.id);
  }

  completeAndContinue(): void {
    const course = this.selectedCourse();
    const lesson = this.activeLesson();
    if (!course || !lesson) return;
    lesson.completed = true;
    const idx = course.lessons.findIndex((l) => l.id === lesson.id);
    const next = course.lessons[idx + 1];
    if (next) {
      this.activeLessonId.set(next.id);
    }
  }
}
