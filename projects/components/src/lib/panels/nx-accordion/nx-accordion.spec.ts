import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxAccordion } from './nx-accordion';

describe('NxAccordion', () => {
  let component: NxAccordion;
  let fixture: ComponentFixture<NxAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(NxAccordion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
