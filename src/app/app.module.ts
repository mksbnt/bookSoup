import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/in-memory-data.service';

// import { environment } from '../environments/environment';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

import { BookService } from '../app/shared/book.service';
import { AuthorService } from '../app/shared/author.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorSearchComponent } from './components/author-search/author-search.component';
import { MessagesComponent } from './components/messages/messages.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material';

import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookSearchComponent } from './components/book-search/book-search.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthorsComponent,
    AuthorDetailsComponent,
    MessagesComponent,
    AuthorSearchComponent,
    BooksComponent,
    BookDetailsComponent,
    BookSearchComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment.firebase, 'bookSoup'),
    // AngularFirestoreModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    BookService,
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
