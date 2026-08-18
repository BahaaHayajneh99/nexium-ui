import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxTab } from './nx-tab';

describe('NxTab', () => {
  let component: NxTab;
  let fixture: ComponentFixture<NxTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxTab],
    }).compileComponents();

    fixture = TestBed.createComponent(NxTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
