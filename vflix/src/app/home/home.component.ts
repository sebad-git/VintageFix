import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MessageComponent } from '../shared/message/message.component';
import { LoaderComponent } from '../shared/loader/loader.component';

import { MovieService } from '../../services/movie.service';
import { TranslatorService } from '../../services/translator.service';
import { Movie, Category } from '../../model/classes';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MessageComponent) messages : MessageComponent;
  @ViewChild(LoaderComponent) loader : LoaderComponent;

  public movieCollection: Movie[];
  public movies: Movie[];
  public categories: Category[];
  public lblSearch:string;
  public lblMovies:string;
  public filtered:boolean;
  public loading:boolean;

  constructor(private movieService: MovieService,private translatorService:TranslatorService) { }

  ngOnInit(): void { window.scrollTo(0, 0); }

  public onCategorySelected(event) {
    this.loading=true; this.loader.show=this.loading;
    const index:number = +event.target.value;
    const category : Category = this.categories[index];
    if(index==0){ this.movies = this.movieCollection; this.filtered=false; this.loader.show=false; }
    else{ this.movies = this.movieCollection.filter( movie => movie.category==+category.id); this.filtered=true; }
    this.loading=false; this.loader.show=this.loading;
    if(!this.movies || this.movies.length==0){ this.messages.infoMessage="No movies Found"; }
    else{ this.messages.infoMessage=undefined; }
 }

 ngAfterViewInit() {
    try {
      this.loading=true; this.loader.show=this.loading;
      this.movieService.getAllCategories().subscribe((cats: Category[]) => {
        this.categories = cats;
        this.translatorService.getTranslator().subscribe((data) => {
          this.lblSearch = data["search"];
          this.lblMovies = data["movies"];
          this.movieService.getAllMovies().subscribe((data: Movie[]) => {
            this.movieCollection = data;
            this.movies = data;
            this.filtered=false;
            this.loading=false; this.loader.show=this.loading;
          });
        });
      });
    } catch (error) { window.scrollTo(0, 0); this.messages.errorMessage = error; }
}

  OnBestRanked(){

  }

}
