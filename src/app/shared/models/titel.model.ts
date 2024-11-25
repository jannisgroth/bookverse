import { Buch } from './buch.model';

export interface Titel {
  titel: string;
  untertitel: string | undefined;
  buch: Buch | undefined;
}
