import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProgressBar } from './ui-progress-bar';

describe('UiProgressBar', () => {
  let component: UiProgressBar;
  let fixture: ComponentFixture<UiProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(UiProgressBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
