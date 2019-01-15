import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BooksComponent } from './components/books/books.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'author_detail/:id',
    component: AuthorDetailsComponent
  },
  {
    path: 'authors',
    component: AuthorsComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'book_detail/:id',
    component: BookDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
