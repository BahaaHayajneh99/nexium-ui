import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardImage } from './ui-card-image';

describe('UiCardImage', () => {
  let component: UiCardImage;
  let fixture: ComponentFixture<UiCardImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardImage],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
