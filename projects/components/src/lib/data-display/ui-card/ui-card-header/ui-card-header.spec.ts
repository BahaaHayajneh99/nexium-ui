import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardHeader } from './ui-card-header';

describe('NxCardHeader', () => {
  let component: NxCardHeader;
  let fixture: ComponentFixture<NxCardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCardHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCardHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
