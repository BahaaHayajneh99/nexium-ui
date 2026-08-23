import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardContent } from './ui-card-content';

describe('NxCardContent', () => {
  let component: NxCardContent;
  let fixture: ComponentFixture<NxCardContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCardContent],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCardContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
