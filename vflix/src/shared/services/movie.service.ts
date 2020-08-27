import { Injectable } from '@angular/core';
import { Movie, Category } from '../model/classes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private readonly movieDatabase = './assets/data/movies.json'; 
  private readonly categoryDatabase = './assets/data/categories.json';

  getAllMovies(): Observable<Movie[]> { return this.http.get<Movie[]>(this.movieDatabase); }
 
  findMovie(mid:number) : Observable<Movie> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.id==+mid)[0];
    }));
  }

  findMoviesByCategory(catId:number) : Observable<Movie[]> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.category==+catId);
    }));
  }

  getAllCategories(): Observable<Category[]> { return this.http.get<Category[]>(this.categoryDatabase); }
 
}