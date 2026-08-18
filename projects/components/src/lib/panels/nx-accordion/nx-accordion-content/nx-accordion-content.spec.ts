import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxAccordionContent } from './nx-accordion-content';

describe('NxAccordionContent', () => {
  let component: NxAccordionContent;
  let fixture: ComponentFixture<NxAccordionContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxAccordionContent],
    }).compileComponents();

    fixture = TestBed.createComponent(NxAccordionContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
