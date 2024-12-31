import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortierToggleComponent } from './sortier-toggle.component';

describe('SortierToggleComponent', () => {
  let component: SortierToggleComponent;
  let fixture: ComponentFixture<SortierToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortierToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortierToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
