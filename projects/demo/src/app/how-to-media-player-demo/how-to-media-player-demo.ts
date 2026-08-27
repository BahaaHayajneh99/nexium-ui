import { Component } from '@angular/core';
import { NxCard, NxCardImage, NxCardContent, NxProgressBarComponent, NxIcon, NxBadge } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

interface Lesson {
  title: string;
  duration: string;
  completed: boolean;
}

@Component({
  selector: 'app-how-to-media-player-demo',
  imports: [NxCard, NxCardImage, NxCardContent, NxProgressBarComponent, NxIcon, NxBadge, DemoSection],
  templateUrl: './how-to-media-player-demo.html',
  styleUrl: './how-to-media-player-demo.scss',
})
export class HowToMediaPlayerDemo {
  poster = 'https://picsum.photos/seed/nexaui-course-1/640/360';

  lessons: Lesson[] = [
    { title: '1. Introduction', duration: '4:12', completed: true },
    { title: '2. Standalone Components', duration: '9:45', completed: true },
    { title: '3. Building a Design Token System', duration: '12:30', completed: false },
    { title: '4. Theming & Dark Mode', duration: '8:02', completed: false },
    { title: '5. Publishing Your Library', duration: '6:57', completed: false },
  ];

  activeLesson = this.lessons[2];

  get completion(): number {
    return Math.round((this.lessons.filter((l) => l.completed).length / this.lessons.length) * 100);
  }

  select(lesson: Lesson): void {
    this.activeLesson = lesson;
  }

  toggleComplete(lesson: Lesson): void {
    lesson.completed = !lesson.completed;
  }

  code = `<nx-card variant="outlined">
    <nx-card-image>
        <img [src]="poster" alt="Course preview" style="width: 100%;" />
    </nx-card-image>
    <nx-card-content>
        <h3>{{ activeLesson.title }}</h3>
        <nx-progress-bar [value]="completion" showLabel label="Course progress"></nx-progress-bar>
    </nx-card-content>
</nx-card>

@for (lesson of lessons; track lesson.title) {
    <div class="lesson-row" [class.lesson-row-active]="lesson === activeLesson" (click)="select(lesson)">
        <nx-icon [icon]="lesson.completed ? 'nx-check-circle' : 'nx-video'" variant="svg" [size]="16"></nx-icon>
        <span>{{ lesson.title }}</span>
        <nx-badge variant="secondary" size="small">{{ lesson.duration }}</nx-badge>
    </div>
}`;

  tsCode = `poster = 'https://picsum.photos/seed/nexaui-course-1/640/360';

lessons: Lesson[] = [ /* ... */ ];

activeLesson = this.lessons[2];

get completion(): number {
  return Math.round((this.lessons.filter((l) => l.completed).length / this.lessons.length) * 100);
}

select(lesson: Lesson): void {
  this.activeLesson = lesson;
}

toggleComplete(lesson: Lesson): void {
  lesson.completed = !lesson.completed;
}`;
}
