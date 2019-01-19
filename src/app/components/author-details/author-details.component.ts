import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Author } from '../../models/author';
import { AuthorService } from '../../shared/author.service';

import { Book } from '../../models/book';
import { BookService } from '../../shared/book.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  books: Book[];
  book: Book;

  @Input() author: Author;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authorService: AuthorService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getAuthor();
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks() //.pipe(filter(b => this.book.author === this.author.lastName))
      .subscribe(books => this.books = books);
  }

  goBack(): void {
    this.location.back();
  }

  getAuthor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.authorService.getAuthor(id)
      .subscribe(author => this.author = author);
  }

  save(): void {
    this.authorService.updateAuthor(this.author)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.authorService.deleteAuthor(this.author)
      .subscribe(() => this.goBack());
  }
}
