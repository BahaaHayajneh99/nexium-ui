import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardContent } from './ui-card-content';

describe('UiCardContent', () => {
  let component: UiCardContent;
  let fixture: ComponentFixture<UiCardContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardContent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
