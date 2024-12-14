import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferbarFilterCollapseComponent } from './lieferbar-filter-collapse.component';

describe('LieferbarFilterCollapseComponent', () => {
  let component: LieferbarFilterCollapseComponent;
  let fixture: ComponentFixture<LieferbarFilterCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LieferbarFilterCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieferbarFilterCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
