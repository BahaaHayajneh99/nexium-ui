import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxAccordionHeader } from './nx-accordion-header';

describe('NxAccordionHeader', () => {
  let component: NxAccordionHeader;
  let fixture: ComponentFixture<NxAccordionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxAccordionHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(NxAccordionHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
