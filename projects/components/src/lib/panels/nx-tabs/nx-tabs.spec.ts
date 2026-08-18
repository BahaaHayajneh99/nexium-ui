import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxTabs } from './nx-tabs';

describe('NxTabs', () => {
  let component: NxTabs;
  let fixture: ComponentFixture<NxTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(NxTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
