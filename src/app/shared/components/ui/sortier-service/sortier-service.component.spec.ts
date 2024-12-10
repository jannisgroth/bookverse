import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortierServiceComponent } from './sortier-service.component';

describe('SortierenComponent', () => {
  let component: SortierServiceComponent;
  let fixture: ComponentFixture<SortierServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortierServiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortierServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
