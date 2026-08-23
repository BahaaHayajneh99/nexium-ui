import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxChip } from './ui-chip';

describe('NxChip', () => {
  let component: NxChip;
  let fixture: ComponentFixture<NxChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxChip],
    }).compileComponents();

    fixture = TestBed.createComponent(NxChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
