import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFilterCollapseComponent } from './rating-filter-collapse.component';

describe('RatingFilterCollapseComponent', () => {
  let component: RatingFilterCollapseComponent;
  let fixture: ComponentFixture<RatingFilterCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingFilterCollapseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingFilterCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
