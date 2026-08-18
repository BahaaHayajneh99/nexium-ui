import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSpinnerDemo } from './ui-spinner-demo';

describe('UiSpinnerDemo', () => {
  let component: UiSpinnerDemo;
  let fixture: ComponentFixture<UiSpinnerDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSpinnerDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSpinnerDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
