import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTabsDemo } from './ui-tabs-demo';

describe('UiTabsDemo', () => {
  let component: UiTabsDemo;
  let fixture: ComponentFixture<UiTabsDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiTabsDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(UiTabsDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
