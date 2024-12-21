import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtFilterCollapseComponent } from './art-filter-collapse.component';

describe('ArtFilterCollapseComponent', () => {
  let component: ArtFilterCollapseComponent;
  let fixture: ComponentFixture<ArtFilterCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtFilterCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtFilterCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
