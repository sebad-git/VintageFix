import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent } from './home/home.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PlayMovieComponent } from './play-movie/play-movie.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'', component: HomeComponent },
  {path:'movie-details/:movieId', component: MovieDetailsComponent },
  {path:'play-movie/:movieId', component: PlayMovieComponent },
  { path:'vflix/admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
