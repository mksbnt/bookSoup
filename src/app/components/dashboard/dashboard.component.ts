import { Component, OnInit } from '@angular/core';

import { Author } from '../../models/author';
import { AuthorService } from '../../shared/author.service';

import { Book } from '../../models/book';
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  authors: Author[];
  books: Book[];

  constructor(private authorService: AuthorService, private bookService: BookService) { }

  ngOnInit() {
    this.getAuthors();
    this.getBooks();
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors.slice(0, 5));
  }

  getBooks(): void {
    this.bookService.getBooks()
    .subscribe(books => this.books = books.slice(0, 5));
  }
}
