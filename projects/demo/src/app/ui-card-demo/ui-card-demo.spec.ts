import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardDemo } from './ui-card-demo';

describe('UiCardDemo', () => {
  let component: UiCardDemo;
  let fixture: ComponentFixture<UiCardDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
