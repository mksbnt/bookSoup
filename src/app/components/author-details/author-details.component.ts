import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Author } from '../../models/author';
import { AuthorService } from '../../shared/author.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  @Input() author: Author;
  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAuthor();
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
}
