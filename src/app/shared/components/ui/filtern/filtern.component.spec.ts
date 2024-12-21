import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilternComponent } from './filtern.component';

describe('FilternComponent', () => {
  let component: FilternComponent;
  let fixture: ComponentFixture<FilternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilternComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
