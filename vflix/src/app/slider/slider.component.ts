import { Component, OnInit } from '@angular/core';

import { Movie } from '../../model/classes';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public movies : Movie[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void { 
    this.movieService.getAllMovies().subscribe((moviesResponse: Movie[]) => {
      this.movies = moviesResponse.filter( movie => movie.ranking > 6);
    });
    
  }

}
