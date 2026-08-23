import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxCardImage } from './ui-card-image';

describe('NxCardImage', () => {
  let component: NxCardImage;
  let fixture: ComponentFixture<NxCardImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NxCardImage],
    }).compileComponents();

    fixture = TestBed.createComponent(NxCardImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
