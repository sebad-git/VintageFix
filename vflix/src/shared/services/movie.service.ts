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

  private readonly movieDatabase = './assets/data/movies.json'; 
  private readonly categoryDatabase = './assets/data/categories.json';

  public getAllMovies(): Observable<Movie[]> { return this.http.get<Movie[]>(this.movieDatabase); }
 
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
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryDatabase).pipe(
      map((data ) => {
        if(navigator.language.includes(TranslatorService.SPANISH)){
          return data[TranslatorService.SPANISH];
        }
        return data[TranslatorService.ENGLISH];
    }));
 }
 
}