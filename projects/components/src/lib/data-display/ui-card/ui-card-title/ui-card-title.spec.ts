import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardTitle } from './ui-card-title';

describe('UiCardTitle', () => {
  let component: UiCardTitle;
  let fixture: ComponentFixture<UiCardTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
