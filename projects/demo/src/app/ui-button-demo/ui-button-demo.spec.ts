import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonDemo } from './ui-button-demo';

describe('UiButtonDemo', () => {
  let component: UiButtonDemo;
  let fixture: ComponentFixture<UiButtonDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(UiButtonDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
