import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { AuthorService } from '../../shared/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Author[];

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.getAuthors();
  }

  getAuthors(): void {
    this.authorService.getAuthors()
      .subscribe(authors => this.authors = authors);
  }

  add(lastName: string): void {
    lastName = lastName.trim();
    if (!lastName) { return; }
    this.authorService.addAuthor({ lastName } as Author)
      .subscribe(author => {
        this.authors.push(author);
      });
  }

  delete(author: Author): void {
    this.authors = this.authors.filter(a => a !== author);
    this.authorService.deleteAuthor(author).subscribe();
  }
}
