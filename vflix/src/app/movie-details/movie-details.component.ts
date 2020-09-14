import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/classes';
import { MessageComponent } from '../shared/message/message.component';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, AfterViewInit {

  constructor(private movieService: MovieService, private appRoute: ActivatedRoute) { }

  @ViewChild(MessageComponent) messages : MessageComponent;
  @ViewChild(LoaderComponent) loader : LoaderComponent;

  public movie:Movie;
  public loaded:boolean;

  ngOnInit(): void { window.scrollTo(0, 0); }

  ngAfterViewInit(): void {
    try {
      this.loaded = false; this.loader.show=true;
      this.appRoute.params.subscribe(params => {
        const movieId = params['movieId'];
        if (movieId) {
          this.movieService.findMovie(movieId).subscribe((movieRes: Movie) => {
            this.movie = movieRes;
            this.loaded=true; this.loader.show=false;
          });
        }
        else { alert("Movie Id not found"); this.loaded=true; this.loader.show=false; }
        });
    } catch (error) { window.scrollTo(0, 0); this.messages.errorMessage = error; }
  }

}
