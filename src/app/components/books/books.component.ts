import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../shared/book.service';

import { FormControl, Validators } from '@angular/forms';

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

  selectedGanre: { id: number; name: string; };

  add(title: string, genre: { id: number; name: string; }, author: string, pages: number): void {
    title = title.trim();
    this.selectedGanre = genre;
    author = author.trim();
    pages = pages;
    if (!title || !genre || !author || !pages) { return; }
    this.bookService.addBook({ title, genre, author, pages } as Book)
      .subscribe(book => {
        this.books.push(book);
      });
  }

  delete(book: Book): void {
    this.books = this.books.filter(b => b !== book);
    this.bookService.deleteBook(book).subscribe();
  }

  bookTitle = new FormControl('', [Validators.required]);
  bookAuthor = new FormControl('', [Validators.required]);
  bookPages = new FormControl('', [Validators.required]);
  genreControl = new FormControl('', [Validators.required]);

  // the function does not work correctly
  // getErrorMessage() { 
  //   return this.bookTitle.hasError('required') ? 'Please enter a title' :
  //     this.bookAuthor.hasError('required') ? 'You must enter a value' :
  //       this.bookPages.hasError('required') ? 'You must enter a value' :
  //         this.genreControl.hasError('required') ? 'Please choose a genre' :
  //           '';
  // }

}
