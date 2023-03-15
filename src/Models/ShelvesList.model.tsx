import { book } from "./book.model";

export interface ShelvesList {
  read: book[];
  wantToRead: book[];
  currentlyReading: book[];
  none: book[];
  results: book[];
}
