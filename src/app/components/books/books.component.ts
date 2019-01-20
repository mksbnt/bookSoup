import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../shared/book.service';

import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }
    this.bookService.addBook({ title } as Book)
      .subscribe(book => {
        this.books.push(book);
      });
  }

  delete(book: Book): void {
    this.books = this.books.filter(b => b !== book);
    this.bookService.deleteBook(book).subscribe();
  }

  bookTitle = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.bookTitle.hasError('required') ? 'You must enter a value' :
      '';
  }
}
