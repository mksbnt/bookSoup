import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import { Author } from '../models/author';
import { Book } from '../models/book';
import { Genre } from '../models/genre';


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
        books: [
          {
            id: 11,
            author: 'Nietzshe',
            title: 'On the Genealogy of Morality',
            pages: 200,
            genre: {
              id: 11,
              name: 'Philosophy'
            }
          }
        ]
      }
    ];

    const books = [
      {
        id: 11,
        author: 'Nietzshe',
        title: 'On the Genealogy of Morality',
        pages: 200,
        genre: {
          id: 11,
          name: 'Philosophy'
        }
      },
      {
        id: 12,
        author: 'Nietzshe',
        title: 'The Case of Wagner',
        pages: 300,
        genre: {
          id: 11,
          name: 'Philosophy'
        }
      },
      {
        id: 13,
        author: 'Nietzshe',
        title: 'Twilight of the Idols',
        pages: 400,
        genre: {
          id: 11,
          name: 'Philosophy'
        }
      },
      {
        id: 14,
        author: 'Nietzshe',
        title: 'The Antichrist',
        pages: 300,
        genre: {
          id: 11,
          name: 'Philosophy'
        }
      }
    ];

    const genres = [
      {
        id: 11,
        name: 'Philosophy'
      },
      {
        id: 12,
        name: 'Poetry'
      },
      {
        id: 13,
        name: 'Drama'
      }
    ];

    return { authors, books, genres };
  };
  // Overrides the genId method to ensure that a Author | Book | Genre always has an id.
  // If the authors | books | genres array is empty,
  // the method below returns the initial number (11).
  // if the  authors | books | genres array is not empty, the method below returns the highest
  // author | book | genre id + 1.
  genId<T extends Author | Book | Genre>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}