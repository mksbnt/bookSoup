import { Component, OnInit } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Author } from '../../models/author';
import { AuthorService } from '../../shared/author.service';

@Component({
  selector: 'app-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.css']
})
export class AuthorSearchComponent implements OnInit {
  authors$: Observable<Author[]>;
  private searchTerms = new Subject<string>();

  constructor(private authorService: AuthorService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.authors$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.authorService.searchAuthors(term)),
    );
  }
}
