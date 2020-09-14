import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent } from './home/home.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PlayMovieComponent } from './play-movie/play-movie.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path:'', component: HomeComponent },
  {path:'movie-details',pathMatch: 'full', component: MovieDetailsComponent },
  {path:'play-movie',pathMatch:'full', component: PlayMovieComponent },
  { path:'vflix/admin',pathMatch: 'full', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
