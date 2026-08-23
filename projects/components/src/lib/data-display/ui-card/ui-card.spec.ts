import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCard } from './ui-card';

describe('NxCard', () => {
  let component: NxCard;
  let fixture: ComponentFixture<NxCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCard],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
