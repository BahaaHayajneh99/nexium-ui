import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxAccordionItem } from './nx-accordion-item';

describe('NxAccordionItem', () => {
  let component: NxAccordionItem;
  let fixture: ComponentFixture<NxAccordionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxAccordionItem],
    }).compileComponents();

    fixture = TestBed.createComponent(NxAccordionItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
