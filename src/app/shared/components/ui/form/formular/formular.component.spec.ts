import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularComponent } from './formular.component';

describe('FormularComponent', () => {
  let component: FormularComponent;
  let fixture: ComponentFixture<FormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
