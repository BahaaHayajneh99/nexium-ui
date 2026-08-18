import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProgressBarDemo } from './ui-progress-bar-demo';

describe('UiProgressBarDemo', () => {
  let component: UiProgressBarDemo;
  let fixture: ComponentFixture<UiProgressBarDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiProgressBarDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(UiProgressBarDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
