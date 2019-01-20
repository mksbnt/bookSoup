import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BookService } from '../../shared/book.service';

import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  @Input() book: Book;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  save(): void {
    this.bookService.updateBook(this.book)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.bookService.deleteBook(this.book)
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

}


