import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCardHeader } from './ui-card-header';

describe('UiCardHeader', () => {
  let component: UiCardHeader;
  let fixture: ComponentFixture<UiCardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCardHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCardHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
