import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothekComponent } from './bibliothek.component';

describe('BibliothekComponent', () => {
  let component: BibliothekComponent;
  let fixture: ComponentFixture<BibliothekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliothekComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BibliothekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
