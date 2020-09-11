import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie, Category } from '../../model/classes';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  public categories: Category[];

  public errorMessage:string;

  public title:string; 
  public plot:string;
  public category:number;
  public poster:string;
  public time:string;
  public video:string;
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
    try {
      this.movieService.getAllCategories().subscribe((cats: Category[]) => {
        this.categories = cats;
      });
    } catch (error) { alert(error); }
  }

  onCategorySelected(event){ this.category = +event.target.value; }

  OnAddMovie(){
    if(!this.title || !this.plot){
      this.errorMessage="No data"; window.scrollTo(0, 0); return;
    }
    this.movieService.getAllMovies().subscribe((movies: Movie[]) => {
      const newMovie:Movie = new Movie(
        1,
        "Test Movie",
        "Test Plot",
        "Test Poster",
        2,
        2,
        "1 min",
        "http:...."
      );
      this.movieService.addMovie(newMovie,movies.length).subscribe(x => {
        alert("MOVIE POSTED");
      });
      
    });

  }
}
