import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/classes';

@Component({
  selector: 'app-play-movie',
  templateUrl: './play-movie.component.html',
  styleUrls: ['./play-movie.component.css']
})

export class PlayMovieComponent implements OnInit {

  constructor() { }

  public movie:Movie;

  ngOnInit(): void {  
    window.scrollTo(0, 0); 
    this.movie = JSON.parse(sessionStorage.getItem("movie"));
  }
}
