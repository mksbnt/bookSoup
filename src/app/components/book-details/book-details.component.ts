import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from '../../shared/book.service';

import { FormControl, Validators } from '@angular/forms';

import { Genre } from '../../models/genre';
import { GenreService } from '../../shared/genre.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  genres: Genre[];
  @Input() book: Book;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres()
      .subscribe(genres => {this.genres = genres; console.log(genres)});
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => {this.book = book; console.log(this.book)});
  }

  save(book:any): void {
    console.log(book);
    this.bookService.updateBook(book)
      .subscribe(() => this.goBack());
  }

  delete(book:any): void {
    this.bookService.deleteBook(book)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  title = new FormControl('', [Validators.required]);
  author = new FormControl('', [Validators.required]);
  genre = new FormControl('', [Validators.required]);
  pages = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.title.hasError('required') ? 'You must enter a value' :
      this.author.hasError('required') ? 'You must enter a value' :
        this.genre.hasError('required') ? 'You must enter a value' :
          this.pages.hasError('required') ? 'You must enter a value' :
            '';
  }

  // selected = this.book.genre;
}


