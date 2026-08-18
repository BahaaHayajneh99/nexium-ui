import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxSkeleton } from './ui-skeleton';

describe('NxSkeleton', () => {
  let component: NxSkeleton;
  let fixture: ComponentFixture<NxSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(NxSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
