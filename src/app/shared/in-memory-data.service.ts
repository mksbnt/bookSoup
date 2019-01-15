import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const authors = [
      {
        id: 11,
        firstName: 'Friedrich',
        middleName: 'Wilhelm',
        lastName: 'Nietzsche',
        dob: ('1844-10-15'),
        book: { title: 'The Birth of Tragedy', pages: 100, genre: 'philosophy' }
      }
    ];

    const books = [
      {
        id: 11,
        title: 'On the Genealogy of Morality',
        pages: 200,
        genre: 'philosophy'
      },
      {
        id: 12,
        title: 'The Case of Wagner',
        pages: 300,
        genre: 'philosophy'
      },
      {
        id: 13,
        title: 'Twilight of the Idols',
        pages: 400,
        genre: 'philosophy'
      },
      {
        id: 14,
        title: 'The Antichrist',
        pages: 300,
        genre: 'philosophy'
      }
    ];

    return { authors, books };
  };

  // createDB() {
  //   const books = [
  //     {
  //       id: 11,
  //       title: 'On the Genealogy of Morality',
  //       pages: 200,
  //       genre: 'philosophy'
  //     },
  //     {
  //       id: 12,
  //       title: 'The Case of Wagner',
  //       pages: 300,
  //       genre: 'philosophy'
  //     },
  //     {
  //       id: 13,
  //       title: 'Twilight of the Idols',
  //       pages: 400,
  //       genre: 'philosophy'
  //     },
  //     {
  //       id: 14,
  //       title: 'The Antichrist',
  //       pages: 300,
  //       genre: 'philosophy'
  //     }
  //   ];

  //   return { books };
  // };

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genAuthorId(authors: Author[]): number {
    return authors.length > 0 ? Math.max(...authors.map(author => author.id)) + 1 : 11;
  }

  genBookId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 11;
  }
}