import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { Observable, of } from 'rxjs';
import { MessageService } from '../shared/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GenreService {

  private genresUrl = 'api/genres';  // URL to web api

  private log(message: string) {
    this.messageService.add(`GenreService: ${message}`);
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getGenres(): Observable<Genre[]> {
    // TODO: send the message _after_ fetching genres
    return this.http.get<Genre[]>(this.genresUrl)
      .pipe(
        tap(_ => this.log('fetched genres')),
        catchError(this.handleError('getGenres', []))
      );
  }

  //  Handle Http operation that failed.
  //  Let the app continue.
  //  @param operation - name of the operation that failed
  //  @param result - optional value to return as the observable result

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

  /** POST: add a new genre to the server */
  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.genresUrl, genre, httpOptions).pipe(
      tap((genre: Genre) => this.log(`added genre w/ id=${genre.id}`)),
      catchError(this.handleError<Genre>('addGenre'))
    );
  }

  /** DELETE: delete the genre from the server */
  deleteGenre(genre: Genre | number): Observable<Genre> {
    const id = typeof genre === 'number' ? genre : genre.id;
    const url = `${this.genresUrl}/${id}`;

    return this.http.delete<Genre>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted genre id=${id}`)),
      catchError(this.handleError<Genre>('deleteGenre'))
    );
  }
}
