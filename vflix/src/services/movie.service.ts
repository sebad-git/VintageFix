import { Injectable } from '@angular/core';
import { Movie, Category } from '../model/classes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslatorService } from './translator.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private readonly moviesUrl =  'https://vintage-fix.firebaseio.com/1/movies.json';
  private readonly addMovieUrl =  'https://vintage-fix.firebaseio.com/1.json';
  private readonly categoryDatabaseEN = 'https://vintage-fix.firebaseio.com/0/categories/0/en.json';
  private readonly categoryDatabaseES = 'https://vintage-fix.firebaseio.com/0/categories/0/es.json';
  
  public getAllMovies(): Observable<Movie[]> { return this.http.get<Movie[]>(this.moviesUrl); }
 
  public findMovie(mid:number) : Observable<Movie> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.id==+mid)[0];
    }));
  }

  public findMoviesByCategory(catId:number) : Observable<Movie[]> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.category==+catId);
    }));
/*
const heroesURL = this.movieDatabase+"?category="+catId;
return this.http.get<Movie[]>(heroesURL);
*/
}
  
  public getAllCategories(): Observable<Category[]> {
    if (navigator.language.includes(TranslatorService.SPANISH)) {
      return this.http.get<Category[]>(this.categoryDatabaseES); 
    }else{
      return this.http.get<Category[]>(this.categoryDatabaseEN);
    }
 }
 
  addMovie(movie:Movie,index:number) {
    return this.http.put("https://vintage-fix.firebaseio.com/1/movies/"+index+".json",movie);
  }

}