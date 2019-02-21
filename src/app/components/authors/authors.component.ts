import { Component, OnInit } from '@angular/core';

import { Author } from '../../models/author';
import { AuthorService } from '../../shared/author.service';

import { Book } from '../../models/book';
import { BookService } from '../../shared/book.service';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  books: Book[];
  authors: Author[];

  constructor(private bookService: BookService, private authorService: AuthorService) { }

  ngOnInit() {
    this.getBooks();
    this.getAuthors();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors);
  }

  selectedBooks: 
   [{
    id: number;
    author: string;
    title: string;
    pages: number;
    genre: {
      id: number;
      name: string;
    }
  }];

  add(
    firstName: string,
    middleName: string,
    lastName: string,
    dob: Date,
    books: [{
      id: number;
      author: string;
      title: string;
      pages: number;
      genre: {
        id: number;
        name: string;
      }
    }]
  ): void {
    firstName = firstName.trim();
    middleName = middleName.trim();
    lastName = lastName.trim();
    this.selectedBooks = books;
    dob = this.date.value;
    if (!firstName || !middleName || !lastName || !books || !dob ) { return; }
    this.authorService.addAuthor({ firstName, middleName, lastName, books, dob } as Author)
      .subscribe(author => {
        this.authors.push(author);
      });
  }

  delete(author: Author): void {
    this.authors = this.authors.filter(a => a !== author);
    this.authorService.deleteAuthor(author).subscribe();
  }

  firstName = new FormControl('', [Validators.required]);
  middleName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  authorBooks = new FormControl('', [Validators.required]);
  date = new FormControl(new Date());

  getErrorMessage() {
    return this.firstName.hasError('required') ? 'You must enter a value' :
      this.middleName.hasError('required') ? 'You must enter a value' :
        this.lastName.hasError('required') ? 'You must enter a value' :
          this.authorBooks.hasError('required') ? 'You must enter a value' :
           // this.dob.hasError('required') ? 'You must enter a value' :
              '';
  }

  // startDate = new Date(1990, 0, 1);

}
