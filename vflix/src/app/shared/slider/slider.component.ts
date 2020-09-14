import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../model/classes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() movies : Movie[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  OnMovieselected(id:any){
    const selected:Movie = this.movies.filter( movie => movie.id==id)[0];
    sessionStorage.setItem("movie", JSON.stringify(selected));
    this.router.navigate(["movie-details"]);
  }

}
