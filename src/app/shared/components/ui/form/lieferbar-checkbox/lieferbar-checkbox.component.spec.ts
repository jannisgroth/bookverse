import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LieferbarCheckboxComponent } from './lieferbar-checkbox.component';

describe('LieferbarCheckboxComponent', () => {
  let component: LieferbarCheckboxComponent;
  let fixture: ComponentFixture<LieferbarCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LieferbarCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LieferbarCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
