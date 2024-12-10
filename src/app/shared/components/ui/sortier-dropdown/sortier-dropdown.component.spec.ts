import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortierDropdownComponent } from './sortier-dropdown.component';
import { Buch } from '../../../models/buch.model';

describe('SortierDropdownComponent', () => {
  let component: SortierDropdownComponent;
  let fixture: ComponentFixture<SortierDropdownComponent>;
  const buecher: Buch[] = [
    {
      isbn: '978-3-827-31552-6',
      rating: 2,
      art: 'HARDCOVER',
      preis: '22.2',
      rabatt: '0.022',
      lieferbar: true,
      datum: '2022-02-02',
      homepage: 'https://acme.biz',
      schlagwoerter: ['TYPESCRIPT'],
      titel: {
        titel: 'Beta',
        untertitel: 'null',
        buch: undefined,
      },
      _links: {
        self: {
          href: undefined,
        },
      },
      file: undefined,
    },
    {
      isbn: '978-3-897-22583-1',
      rating: 4,
      art: 'EPUB',
      preis: '21.1',
      rabatt: '0.023',
      lieferbar: true,
      datum: '2022-02-01',
      homepage: 'https://acme.at',
      schlagwoerter: ['JAVASCRIPT'],
      titel: {
        titel: 'Alpha',
        untertitel: 'alpha',
        buch: undefined,
      },
      _links: {
        self: {
          href: undefined,
        },
      },
      file: undefined,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortierDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortierDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO : Tests konfigurieren
  // it('sollte Bücher nach Titel aufsteigend sortieren', () => {
  //   spyOn(component.buecher, 'update').and.callFake(callback => {
  //     const sortedBuecher = callback(buecher);
  //     expect(sortedBuecher[0].titel?.titel).toBe('Alpha');
  //     expect(sortedBuecher[1].titel?.titel).toBe('Beta');
  //   });

  //   component.sortierkriterium = 'titel';
  //   component.rangfolge = 'aufsteigend';
  //   component.buecherSortierung();
  // });

  // it('sollte die Sortierreihenfolge umkehren', () => {
  //   spyOn(component.buecher, 'update').and.callFake(callback => {
  //     const sortedBuecher = callback(buecher);
  //     expect(sortedBuecher[0].isbn).toBe('978-3-897-22583-1');
  //     expect(sortedBuecher[1].isbn).toBe('978-3-827-31552-6');
  //   });

  //   component.sortierkriterium = 'isbn';
  //   component.rangfolge = 'absteigend';
  //   component.buecherSortierung(null);
  // });
});
