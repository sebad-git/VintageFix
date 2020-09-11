import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/classes';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private movieService: MovieService, private appRoute: ActivatedRoute) { }

  public movie:Movie;
  public loaded:boolean;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    try {
      this.loaded = false;
      this.appRoute.params.subscribe(params => {
        const paramMovieId = params['movieId'];
        if (paramMovieId) {
          this.movieService.findMovie(paramMovieId).subscribe((data) => {
            this.movie = data;
            this.loaded=true;
          });
        }
        else { alert("Movie Id not found"); this.loaded=true; }
        });
    } catch (error) { alert(error); }
  }

}
