import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortierenComponent } from './sortieren.component';

describe('SortierenComponent', () => {
  let component: SortierenComponent;
  let fixture: ComponentFixture<SortierenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortierenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortierenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
