import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiChip } from './ui-chip';

describe('UiChip', () => {
  let component: UiChip;
  let fixture: ComponentFixture<UiChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiChip],
    }).compileComponents();

    fixture = TestBed.createComponent(UiChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
