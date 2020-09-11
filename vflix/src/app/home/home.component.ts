import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { TranslatorService } from '../../services/translator.service';
import { Movie, Category } from '../../model/classes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[];
  public categories: Category[];
  public lblSearch:string;
  public lblMovies:string;

  constructor(private appRoute: ActivatedRoute, private movieService: MovieService,private translatorService:TranslatorService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    try {
      this.movieService.getAllCategories().subscribe((cats: Category[]) => {
        this.categories = cats;
        this.appRoute.params.subscribe(params => {
          const paramMovieId = params['bestRanked'];
          if(paramMovieId){
            this.movieService.findMoviesBestRanked().subscribe((data: Movie[]) => {
              this.movies = data;
            });
          }else{
            this.movieService.getAllMovies().subscribe((data: Movie[]) => {
              this.movies = data;
            });
          }
        });
      });
      this.translatorService.getTranslator().subscribe((data) => {
        this.lblSearch = data["search"];
        this.lblMovies = data["movies"];
      });  
    } catch (error) { alert(error); }
    
    
    try {
      
    } catch (error) { alert(error); }
  }

  public onCategorySelected(event) {
    const selection = event.target.value;
    if(+selection==0){
      this.movieService.getAllMovies().subscribe((data: Movie[]) => {
        this.movies = data;
      });
    }else{
      this.movieService.findMoviesByCategory(+selection).subscribe((data: Movie[]) => {
        this.movies = data;
      });
    }
 }

 
  OnBestRanked(){

  }

}
