import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxButton } from './ui-button';

describe('NxButton', () => {
  let component: NxButton;
  let fixture: ComponentFixture<NxButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxButton],
    }).compileComponents();

    fixture = TestBed.createComponent(NxButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
