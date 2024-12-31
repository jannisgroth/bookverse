import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbnInputComponent } from './isbn-input.component';

describe('IsbnInputComponent', () => {
  let component: IsbnInputComponent;
  let fixture: ComponentFixture<IsbnInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsbnInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IsbnInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
