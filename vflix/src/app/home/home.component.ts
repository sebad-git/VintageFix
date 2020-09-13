import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { TranslatorService } from '../../services/translator.service';
import { Movie, Category } from '../../model/classes';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movieCollection: Movie[];
  public movies: Movie[];
  public categories: Category[];
  public lblSearch:string;
  public lblMovies:string;
  public filtered:boolean;

  constructor(private movieService: MovieService,private translatorService:TranslatorService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    try {
      this.movieService.getAllCategories().subscribe((cats: Category[]) => {
        this.categories = cats;
        this.movieService.getAllMovies().subscribe((data: Movie[]) => {
          this.movieCollection = data;
          this.movies = data;
          this.filtered=false;
        });
      });
      this.translatorService.getTranslator().subscribe((data) => {
        this.lblSearch = data["search"];
        this.lblMovies = data["movies"];
      }); 
    } catch (error) { alert(error); }
  }

  public onCategorySelected(event) {
    const index:number = +event.target.value;
    const category : Category = this.categories[index];
    if(index==0){ this.movies = this.movieCollection; this.filtered=false; }
    else{ this.movies = this.movieCollection.filter( movie => movie.category==+category.id); this.filtered=true; }
 }
 
  OnBestRanked(){

  }

}
