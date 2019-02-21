import { Component, OnInit } from '@angular/core';
import { Genre } from '../../models/genre';
import { GenreService } from '../../shared/genre.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})

export class GenresComponent implements OnInit {

  genres: Genre[];

  constructor(private genreService: GenreService) { }

  ngOnInit() {
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres()
      .subscribe(genres => this.genres = genres);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.genreService.addGenre({ name } as Genre)
      .subscribe(genre => {
        this.genres.push(genre);
      });
  }

  delete(genre: Genre): void {
    this.genres = this.genres.filter(h => h !== genre);
    this.genreService.deleteGenre(genre).subscribe();
  }


  genreName = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.genreName.hasError('required') ? 'Please, enter genre name' :
      '';
  }
}
