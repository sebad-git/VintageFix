import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { Movie, Category } from '../../shared/model/classes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: Movie[];
  public categories: Category[];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    try {
      this.movieService.getAllCategories().subscribe((cats: Category[]) => {
        this.categories = new Array<Category>();
        this.categories.push( new Category(0,"All..."));
        cats.forEach(category => { this.categories.push(category); });
        this.movieService.getAllMovies().subscribe((data: Movie[]) => {
          this.movies = data;
        });
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
