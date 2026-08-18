import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardFooter } from './ui-card-footer';

describe('UiCardFooter', () => {
  let component: UiCardFooter;
  let fixture: ComponentFixture<UiCardFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
