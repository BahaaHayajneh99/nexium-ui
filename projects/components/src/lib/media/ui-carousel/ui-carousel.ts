import { AfterContentInit, booleanAttribute, Component, ContentChildren, Input, numberAttribute, OnDestroy, QueryList } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiIcon } from '../../data-display/ui-icon';
import { NxCarouselSlideDirective } from './nx-carousel-slide';

export interface NxCarouselSlide {
  src: string;
  alt?: string;
  caption?: string;
}

@Component({
  selector: 'nx-carousel',
  standalone: true,
  imports: [UiIcon, NgTemplateOutlet],
  templateUrl: './ui-carousel.html',
  styleUrl: './ui-carousel.scss',
})
export class UiCarousel implements AfterContentInit, OnDestroy {
  @Input() slides: NxCarouselSlide[] = [];
  @Input({ transform: booleanAttribute }) autoplay = false;
  @Input({ transform: numberAttribute }) interval = 4000;
  @Input({ transform: booleanAttribute }) loop = true;
  @Input({ transform: booleanAttribute }) showIndicators = true;
  @Input({ transform: booleanAttribute }) showArrows = true;

  @ContentChildren(NxCarouselSlideDirective) contentSlides!: QueryList<NxCarouselSlideDirective>;

  activeIndex = 0;

  private timerId?: ReturnType<typeof setInterval>;

  get slideCount(): number {
    return this.slides.length + (this.contentSlides?.length ?? 0);
  }

  get indicatorIndexes(): number[] {
    return Array.from({ length: this.slideCount }, (_, i) => i);
  }

  ngAfterContentInit(): void {
    this.startAutoplay();
    this.contentSlides.changes.subscribe(() => this.startAutoplay());
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  next(): void {
    if (this.activeIndex < this.slideCount - 1) {
      this.activeIndex++;
    } else if (this.loop) {
      this.activeIndex = 0;
    }
  }

  prev(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else if (this.loop) {
      this.activeIndex = this.slideCount - 1;
    }
  }

  goTo(index: number): void {
    this.activeIndex = index;
  }

  pause(): void {
    this.stopAutoplay();
  }

  resume(): void {
    this.startAutoplay();
  }

  private startAutoplay(): void {
    this.stopAutoplay();

    if (this.autoplay && this.slideCount > 1) {
      this.timerId = setInterval(() => this.next(), this.interval);
    }
  }

  private stopAutoplay(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }
}
