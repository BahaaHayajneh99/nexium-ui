import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardFooter } from './ui-card-footer';

describe('NxCardFooter', () => {
  let component: NxCardFooter;
  let fixture: ComponentFixture<NxCardFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCardFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCardFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
