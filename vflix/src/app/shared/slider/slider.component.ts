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

  private checkTimer:number = 500;
  private timer:number = 5.4 *1000; 
  
  public curMovie : Movie;
  private curIndex : number;

  constructor(private router: Router) {}
  
  ngOnInit(): void { 
      this.movies=[]; this.curIndex=0; 
      this.checkData();
  }

  private checkData(){
    const interval:any = setInterval( ()=> {
      if(this.movies && this.movies.length>0 ){ 
        clearInterval(interval); this.startSlideShow();
      } }, this.checkTimer);
  }

    private startSlideShow(){
      this.curMovie = this.movies[this.curIndex];
      const interval:any = setInterval( ()=> {
        this.curIndex++;
        if(this.curIndex>=this.movies.length){ this.curIndex=0; }
        this.curMovie = this.movies[this.curIndex];
      }, this.timer);
    }

  public OnMovieselected(id:any){
    const selected:Movie = this.movies.filter( movie => movie.id==id)[0];
    sessionStorage.setItem("movie", JSON.stringify(selected));
    this.router.navigate(["movie-details"]);
  }

}
