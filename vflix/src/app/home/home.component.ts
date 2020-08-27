import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { TranslatorService } from '../../shared/services/translator.service';
import { Movie, Category } from '../../shared/model/classes';

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

  constructor(private movieService: MovieService,private translatorService:TranslatorService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    try {
      this.movieService.getAllCategories().subscribe((cats: Category[]) => {
        this.categories = cats;
        this.movieService.getAllMovies().subscribe((data: Movie[]) => {
          this.movies = data;
        });
      });
      this.translatorService.getTranslator().subscribe((data) => {
        this.lblSearch = data["search"];
        this.lblMovies = data["movies"];
      });
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

}
