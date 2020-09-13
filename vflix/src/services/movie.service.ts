import { Injectable } from '@angular/core';
import { Movie, Category } from '../model/classes';
import { Firebase } from '../model/firebase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslatorService } from './translator.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {}
  
  private readonly databaseUrl = "https://vintage-fix.firebaseio.com";
  
  public getAllMovies(): Observable<Movie[]> { 
    const url = Firebase.create(this.databaseUrl).append("vflix").
    append("movies").addAuth().setOrderBy("name").build();
    return this.http.get<Movie[]>(url);
  }

    public getAllCategories(): Observable<Category[]> {
      const firebase:Firebase = Firebase.create(this.databaseUrl);
      if (navigator.language.includes(TranslatorService.SPANISH)) {
        const url = firebase.append("vflix").append("categories").append("es").addAuth().build();
        return this.http.get<Category[]>(url);
      }else{
        const url = firebase.append("vflix").append("categories").append("en").addAuth().build();
        return this.http.get<Category[]>(url);
      }
   }

  public getMovieCount(): Observable<number> {
    const url = Firebase.create(this.databaseUrl).append("vflix").
    append("movies").addAuth().setShallow().build();
    return this.http.get<Object>(url).pipe(
      map((data: Object) => { return JSON.stringify(data).split(",").length }));
  }
  
  public findMovie(movieId:string) : Observable<Movie> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.id==movieId)[0];
    }));
  }

  public findMoviesByCategory(catId:number) : Observable<Movie[]> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.category==+catId);
    }));
  }

  public findMoviesBestRanked() : Observable<Movie[]> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.ranking >= 5);
    }));
  }
 
  addMovie(index:number,movie:Movie) {
    const url = Firebase.create(this.databaseUrl).append("vflix").
    append("movies").appendNum(index).addAuth().build();
    return this.http.put(url,movie);
  }
  
}