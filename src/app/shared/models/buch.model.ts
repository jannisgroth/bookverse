import { Titel } from './titel.model';
export type BuchArt = 'EPUB' | 'HARDCOVER' | 'PAPERBACK';

export interface Buch {
  isbn: string;
  rating: number | undefined;
  art: BuchArt | undefined;
  preis: string;
  rabatt: string | undefined;
  lieferbar: boolean | undefined;
  datum: Date | string | undefined;
  homepage: string | undefined;
  schlagwoerter: string[] | null | undefined;
  titel: Titel | undefined;
  _links: {
    self: {
      href: string | undefined;
    }
  }
  file: string | undefined;
}
