import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../shared/book.service';

import {FormControl, Validators} from '@angular/forms';

import { Genre } from '../../models/genre';
import { GenreService } from '../../shared/genre.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  genres: Genre[];
  books: Book[];

  constructor(private bookService: BookService,
    private genreService: GenreService) { }

  ngOnInit() {
    this.getBooks();
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres()
      .subscribe(genres => this.genres = genres);
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  selectedGanre: string;
  
  add(title: string, genre: string ): void {
    title = title.trim();
    this.selectedGanre = genre;
    if (!title || !genre) { return; }
    this.bookService.addBook({ title, genre } as Book)
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

  genreControl = new FormControl('', [Validators.required]);
}
