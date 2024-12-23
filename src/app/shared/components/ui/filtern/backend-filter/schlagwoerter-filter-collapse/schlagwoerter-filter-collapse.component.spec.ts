import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchlagwoerterFilterCollapseComponent } from './schlagwoerter-filter-collapse.component';

describe('SchlagwoerterFilterCollapseComponent', () => {
  let component: SchlagwoerterFilterCollapseComponent;
  let fixture: ComponentFixture<SchlagwoerterFilterCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchlagwoerterFilterCollapseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchlagwoerterFilterCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
