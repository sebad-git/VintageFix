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
  public infoMessage:string;

  public loggiedIn: boolean;
  public user:string; public password:string;

  public title:string; 
  public plot:string;
  public category:number;
  public poster:string;
  public time:string;
  public video:string;
  public ranking:number;
  
  ngOnInit(): void {
    window.scrollTo(0, 0);
    if(sessionStorage.getItem("user")){ this.loggiedIn=true; }
    try {
      this.movieService.getAllCategories().subscribe((cats: Category[]) => {
        this.categories = cats;
      });
    } catch (error) { alert(error); }
  }

  onLogin(){
    try {
      if(sessionStorage.getItem("user")){ this.loggiedIn=true; return; }
      this.errorMessage=undefined; this.infoMessage=undefined;
      if(!this.user){ this.showError("User Invalid"); return; }
      if(!this.password){ this.showError("Password Invalid"); return; }
      if(this.user=="admin" && this.password=="vflix" ){ 
        this.errorMessage=undefined;
        this.loggiedIn=true;
        sessionStorage.setItem("user", this.user);
      }else{
        this.showError("User or Password incorrect."); return;
      }
    } catch (error) { alert(error); }
  }

  onCategorySelected(event){ 
    try { this.category = +event.target.value; }
    catch (error) { alert(error); }
  }

  OnAddMovie(){
    try {
      this.errorMessage=undefined; this.infoMessage=undefined;
      
      if(!this.title){ this.showError("Title is empty."); return; }
      if(!this.plot){ this.showError("Plot is empty."); return; }
      if(!this.category || this.category<=0 ){ this.showError("Select a Category."); return; }
     
      if(!this.poster){ this.showError("Poster is empty."); return; } 
      if(!this.poster.includes(".jpg") && !this.poster.includes(".png") ){ 
        this.showError("The Poster url must be an image."); return;
      }
      
      if(!this.time){ this.showError("Time is empty."); return; }

      if(!this.video){ this.showError("Video url source is empty."); return; }
      if(!this.video.includes(".mp4")){ this.showError("The Video url must contain mp4."); return; }

      const newMovie:Movie = new Movie( this.title, this.plot,
        this.poster,this.category,this.ranking,this.time,this.video);

      this.movieService.getMovieCount().subscribe((index: number) => {
        this.movieService.addMovie(index,newMovie).subscribe(x => {
          this.showInfo("Movie Created");
          this.title=undefined; 
          this.plot=undefined;
          this.category=undefined;
          this.poster=undefined;
          this.time=undefined;
          this.video=undefined;
          this.ranking=undefined;
        });
      });
    }  catch (error) { this.showError(error); }
  }

  private showError(messsage:string){ this.errorMessage=messsage; window.scrollTo(0, 0); }
  private showInfo(messsage:string){ this.infoMessage=messsage; window.scrollTo(0, 0); }

}
