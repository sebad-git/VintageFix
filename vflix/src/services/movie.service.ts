import { Injectable } from '@angular/core';
import { Movie, Category } from '../model/classes';
import { Firebase } from './firebase';
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
    const url = Firebase.create(this.databaseUrl).addNode("vflix").
    addNode("movies").addAuth().setOrderBy("name").build();
    return this.http.get<Movie[]>(url);
  }

    public getAllCategories(): Observable<Category[]> {
      const firebase:Firebase = Firebase.create(this.databaseUrl);
      if (navigator.language.includes(TranslatorService.SPANISH)) {
        const url = firebase.addNode("vflix").addNode("categories").addNode("es").addAuth().build();
        return this.http.get<Category[]>(url);
      }else{
        const url = firebase.addNode("vflix").addNode("categories").addNode("en").addAuth().build();
        return this.http.get<Category[]>(url);
      }
   }

  public getMovieCount(): Observable<number> {
    const url = Firebase.create(this.databaseUrl).addNode("vflix").
    addNode("movies").addAuth().setShallow().build();
    return this.http.get<Object>(url).pipe(
      map((data: Object) => { return JSON.stringify(data).split(",").length }));
  }
  
  public findMovie(movieId) : Observable<Movie> {
    try {
      const url = Firebase.create(this.databaseUrl).addNode("vflix").
      addNode("movies").addAuth().setWhere("id",movieId).build();
      return this.http.get<Object>(url).pipe(
        map((jsonData: Observable<Movie>) => {
          return jsonData[Object.keys(jsonData)[0]] as Movie;
      }));
    } catch (error) { console.log(error); return undefined; }
  }

  public findMoviesByCategory(catId:number) : Observable<Movie[]> {
    const url = Firebase.create(this.databaseUrl).addNode("vflix").
    addNode("movies").addAuth().setBetween("category",catId).build();
    const movies:Movie[] = [];
    return this.http.get<Object>(url).pipe(
      map((data: Object) => {
        const moviesJson:string[] = JSON.stringify(data).split(","); 
        moviesJson.forEach(movieJson => { movies.push(JSON.parse(movieJson)); });
        return movies;
      }));
  }

  public findMoviesBestRanked() : Observable<Movie[]> {
    return this.getAllMovies().pipe(
      map((data: Movie[]) => {
        return data.filter( mdata => mdata.ranking >= 5);
    }));
  }
 
  addMovie(index:number,movie:Movie) {
    const url = Firebase.create(this.databaseUrl).addNode("vflix").
    addNode("movies").addAuth().build();
    return this.http.put(url,movie);
  }
  
}