import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuchAnlegenComponent } from './buchAnlegen.component';

describe('AnlegenComponent', () => {
  let component: BuchAnlegenComponent;
  let fixture: ComponentFixture<BuchAnlegenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuchAnlegenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuchAnlegenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
