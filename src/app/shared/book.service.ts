import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { BOOKS } from '../models/mock-books';
import { Observable, of } from 'rxjs';
import { MessageService } from '../shared/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // booksCollection: AngularFirestoreCollection<Book>;
  // books: Observable<Book[]>;

  private booksUrl = 'api/books';  // URL to web api

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`BookService: ${message}`);
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    // db: AngularFirestore
    ) { 
      // this.books = db.collection('books').valueChanges();
    }


  // getBooks(): Observable<Book[]> {
  //   this.messageService.add('BookService: fetched books');
  //   return of(BOOKS);
  // }

  /** GET books from the server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(_ => this.log('fetched books')),
        catchError(this.handleError('getBooks', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getBook(id: number): Observable<Book> {
  //   // TODO: send the message _after_ fetching the book
  //   this.messageService.add(`BookService: fetched book id=${id}`);
  //   return of(BOOKS.find(book => book.id === id));
  // }

  /** GET book by id. Will 404 if id not found */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  /** PUT: update the book on the server */
  updateBook(book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions).pipe(
      tap(_ => this.log(`updated book id=${book.id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  /** POST: add a new book to the server */
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, book, httpOptions).pipe(
      tap((book: Book) => this.log(`added book w/ id=${book.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  /** DELETE: delete the book from the server */
  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted book id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
    );
  }


  /* GET books whose title contains search term */
  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Book[]>(`${this.booksUrl}/?title=${term}`).pipe(
      tap(_ => this.log(`found books matching "${term}"`)),
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }
}
