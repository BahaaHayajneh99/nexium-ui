import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCarousel } from './ui-carousel';
import { NxCarouselSlideDirective } from './nx-carousel-slide';

describe('UiCarousel', () => {
  let component: UiCarousel;
  let fixture: ComponentFixture<UiCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  standalone: true,
  imports: [UiCarousel, NxCarouselSlideDirective],
  template: `
    <nx-carousel [slides]="[{ src: 'image.png' }]">
      <div *nxCarouselSlide class="video-slide">custom content</div>
    </nx-carousel>
  `,
})
class ContentSlideHost {}

describe('UiCarousel with projected content slides', () => {
  let fixture: ComponentFixture<ContentSlideHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSlideHost],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentSlideHost);
    await fixture.whenStable();
  });

  it('counts image slides and projected content slides together', () => {
    const carousel = fixture.debugElement.children[0].componentInstance as UiCarousel;
    expect(carousel.slideCount).toBe(2);
  });

  it('renders the projected content inside the track', () => {
    const rendered = fixture.nativeElement.querySelector('.video-slide');
    expect(rendered).toBeTruthy();
    expect(rendered.textContent).toContain('custom content');
  });
});
