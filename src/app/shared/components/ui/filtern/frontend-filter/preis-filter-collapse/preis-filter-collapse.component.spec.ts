import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreisFilterCollapseComponent } from './preis-filter-collapse.component';

describe('PreisFilterCollapseComponent', () => {
  let component: PreisFilterCollapseComponent;
  let fixture: ComponentFixture<PreisFilterCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreisFilterCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreisFilterCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
