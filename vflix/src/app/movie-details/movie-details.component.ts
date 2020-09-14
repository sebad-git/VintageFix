import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/classes';
import { MessageComponent } from '../shared/message/message.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  @ViewChild(MessageComponent) messages : MessageComponent;
  @ViewChild(LoaderComponent) loader : LoaderComponent;

  public movie:Movie;
  
  ngOnInit(): void { window.scrollTo(0, 0); }

  ngAfterViewInit(): void {
    try {
      this.loader.show=true;
      this.movie = JSON.parse(sessionStorage.getItem("movie"));
      this.loader.show=false;
    } catch (error) { window.scrollTo(0, 0); this.loader.show=false; this.messages.errorMessage = error; }
  }

  OnMovieselected(){
    this.router.navigate(["play-movie"]);
  }

}
