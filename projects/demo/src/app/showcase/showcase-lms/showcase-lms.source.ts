export const LMS_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxProgressBarComponent, NxTableOfContents, NxTocHeading } from 'nexium-ui';

interface Lesson { id: number; title: string; duration: string; completed: boolean; }
interface Course { id: string; title: string; category: string; instructor: string; icon: string; lessons: Lesson[]; }

@Component({
  selector: 'app-lms',
  standalone: true,
  imports: [NxNavbar, NxIcon, NxBadge, NxButton, NxProgressBarComponent, NxTableOfContents],
  templateUrl: './lms.html',
})
export class Lms {
  // Headings match the h3 ids rendered in the lesson notes section below.
  lessonHeadings: NxTocHeading[] = [
    { id: 'notes-overview', label: 'Overview', level: 1 },
    { id: 'notes-concepts', label: 'Key concepts', level: 1 },
    { id: 'notes-mistakes', label: 'Common mistakes', level: 1 },
  ];

  courses: Course[] = [
    { id: 'angular-signals', title: 'Angular Signals in Practice', category: 'Frontend', instructor: 'Mara Lindqvist', icon: 'nx-fire', lessons: [
      { id: 1, title: 'Why signals?', duration: '6 min', completed: true },
      // ...more lessons
    ] },
    // ...more courses
  ];

  selectedCourseId = signal<string | null>(null);
  selectedCourse = computed(() => this.courses.find((c) => c.id === this.selectedCourseId()) ?? null);

  activeLessonId = signal<number | null>(null);
  activeLesson = computed(() => this.selectedCourse()?.lessons.find((l) => l.id === this.activeLessonId()) ?? null);

  courseProgress(course: Course): number {
    return Math.round((course.lessons.filter((l) => l.completed).length / course.lessons.length) * 100);
  }

  completeAndContinue(): void {
    const lesson = this.activeLesson();
    if (!lesson) return;
    lesson.completed = true;
    // advance activeLessonId to the next lesson in the course
  }
}
`;

export const LMS_HTML_SOURCE = `@if (!selectedCourse()) {
    <div class="course-grid">
        @for (course of courses; track course.id) {
            <button (click)="openCourse(course)">
                <nx-icon [icon]="course.icon" variant="svg"></nx-icon>
                <nx-badge variant="secondary">{{ course.category }}</nx-badge>
                <div>{{ course.title }}</div>
                <nx-progress-bar [value]="courseProgress(course)" [showLabel]="true"></nx-progress-bar>
            </button>
        }
    </div>
} @else {
    <nx-progress-bar [value]="courseProgress(selectedCourse()!)" [showLabel]="true"></nx-progress-bar>

    <aside>
        @for (lesson of selectedCourse()!.lessons; track lesson.id) {
            <button [class.active]="activeLesson()?.id === lesson.id" (click)="selectLesson(lesson)">
                <nx-icon [icon]="lesson.completed ? 'nx-check-circle' : 'nx-clock'" variant="svg"></nx-icon>
                {{ lesson.title }}
            </button>
        }
    </aside>

    <main>
        <h3>{{ activeLesson()?.title }}</h3>
        <nx-button variant="primary" (click)="completeAndContinue()">Mark complete & continue</nx-button>

        <div class="notes-layout">
            <nx-table-of-contents [headings]="lessonHeadings"></nx-table-of-contents>
            <article>
                <h3 id="notes-overview">Overview</h3>
                <p>What this lesson covers, in a sentence or two.</p>
                <h3 id="notes-concepts">Key concepts</h3>
                <p>The core ideas introduced in this lesson.</p>
                <h3 id="notes-mistakes">Common mistakes</h3>
                <p>Pitfalls learners tend to run into.</p>
            </article>
        </div>
    </main>
}
`;
