import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardActions } from './ui-card-actions';

describe('NxCardActions', () => {
  let component: NxCardActions;
  let fixture: ComponentFixture<NxCardActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCardActions],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCardActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
