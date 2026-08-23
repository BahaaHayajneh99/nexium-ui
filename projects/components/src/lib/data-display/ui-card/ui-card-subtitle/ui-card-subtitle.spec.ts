import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardSubtitle } from './ui-card-subtitle';

describe('NxCardSubtitle', () => {
  let component: NxCardSubtitle;
  let fixture: ComponentFixture<NxCardSubtitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCardSubtitle],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCardSubtitle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
