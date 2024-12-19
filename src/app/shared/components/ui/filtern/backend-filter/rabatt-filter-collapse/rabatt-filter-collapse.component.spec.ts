import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabattFilterCollapseComponent } from './rabatt-filter-collapse.component';

describe('RabattFilterCollapseComponent', () => {
  let component: RabattFilterCollapseComponent;
  let fixture: ComponentFixture<RabattFilterCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RabattFilterCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RabattFilterCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
