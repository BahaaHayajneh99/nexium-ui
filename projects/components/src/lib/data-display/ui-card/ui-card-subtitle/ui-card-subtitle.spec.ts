import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardSubtitle } from './ui-card-subtitle';

describe('UiCardSubtitle', () => {
  let component: UiCardSubtitle;
  let fixture: ComponentFixture<UiCardSubtitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardSubtitle],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardSubtitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
