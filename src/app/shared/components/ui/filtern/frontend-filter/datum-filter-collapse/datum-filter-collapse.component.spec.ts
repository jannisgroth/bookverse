import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatumFilterCollapseComponent } from './datum-filter-collapse.component';

describe('DatumFilterCollapseComponent', () => {
  let component: DatumFilterCollapseComponent;
  let fixture: ComponentFixture<DatumFilterCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatumFilterCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatumFilterCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
