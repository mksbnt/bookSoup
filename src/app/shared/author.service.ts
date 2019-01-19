import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Author } from '../models/author';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthorService {

  private authorsUrl = 'api/authors';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET authors from the server */
  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl)
      .pipe(
        tap(_ => this.log('fetched authors')),
        catchError(this.handleError('getAuthors', []))
      );
  }

  /** GET author by id. Return `undefined` when id not found */
  getAuthorNo404<Data>(id: number): Observable<Author> {
    const url = `${this.authorsUrl}/?id=${id}`;
    return this.http.get<Author[]>(url)
      .pipe(
        map(authors => authors[0]), // returns a {0|1} element array
        tap(a => {
          const outcome = a ? `fetched` : `did not find`;
          this.log(`${outcome} author id=${id}`);
        }),
        catchError(this.handleError<Author>(`getAuthor id=${id}`))
      );
  }

  /** GET author by id. Will 404 if id not found */
  getAuthor(id: number): Observable<Author> {
    const url = `${this.authorsUrl}/${id}`;
    return this.http.get<Author>(url).pipe(
      tap(_ => this.log(`fetched author id=${id}`)),
      catchError(this.handleError<Author>(`getAuthor id=${id}`))
    );
  }

  /* GET authors whose name contains search term */
  searchAuthors(term: string): Observable<Author[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Author[]>(`${this.authorsUrl}/?lastName=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Author[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new author to the server */
  addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.authorsUrl, author, httpOptions).pipe(
      tap((author: Author) => this.log(`added author w/ id=${author.id}`)),
      catchError(this.handleError<Author>('addAuthor'))
    );
  }

  /** DELETE: delete the author from the server */
  deleteAuthor(author: Author | number): Observable<Author> {
    const id = typeof author === 'number' ? author : author.id;
    const url = `${this.authorsUrl}/${id}`;

    return this.http.delete<Author>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Author>('deleteAuthor'))
    );
  }

  /** PUT: update the author on the server */
  updateAuthor(author: Author): Observable<any> {
    return this.http.put(this.authorsUrl, author, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${author.id}`)),
      catchError(this.handleError<any>('updateAuthor'))
    );
  }

  //  * Handle Http operation that failed.
  //  * Let the app continue.
  //  * @param operation - name of the operation that failed
  //  * @param result - optional value to return as the observable result

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}