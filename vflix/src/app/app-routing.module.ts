import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent } from './home/home.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PlayMovieComponent } from './play-movie/play-movie.component';

const routes: Routes = [
  {path:'', component: HomeComponent },
  {path:'movie-details/:movieId', component: MovieDetailsComponent },
  {path:'play-movie/:movieId', component: PlayMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
