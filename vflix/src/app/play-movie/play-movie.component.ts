import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { Movie } from '../../shared/model/classes';

@Component({
  selector: 'app-play-movie',
  templateUrl: './play-movie.component.html',
  styleUrls: ['./play-movie.component.css']
})
export class PlayMovieComponent implements OnInit {


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
          this.movieService.findMovie(+paramMovieId).subscribe((data) => {
            this.movie = data;
            this.loaded=true;
          });
        }
        else { alert("param movie not found"); this.loaded=true; }
        });
    } catch (error) { alert(error); }
  }

}
