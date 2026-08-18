import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAccordionDemo } from './ui-accordion-demo';

describe('UiAccordionDemo', () => {
  let component: UiAccordionDemo;
  let fixture: ComponentFixture<UiAccordionDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAccordionDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(UiAccordionDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
