import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiChipDemo } from './ui-chip-demo';

describe('UiChipDemo', () => {
  let component: UiChipDemo;
  let fixture: ComponentFixture<UiChipDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiChipDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(UiChipDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
