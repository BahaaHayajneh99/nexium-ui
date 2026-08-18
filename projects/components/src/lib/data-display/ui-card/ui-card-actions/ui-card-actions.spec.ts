import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardActions } from './ui-card-actions';

describe('UiCardActions', () => {
  let component: UiCardActions;
  let fixture: ComponentFixture<UiCardActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardActions],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
