import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardTitle } from './ui-card-title';

describe('NxCardTitle', () => {
  let component: NxCardTitle;
  let fixture: ComponentFixture<NxCardTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCardTitle],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCardTitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
