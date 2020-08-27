
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  public static readonly ENGLISH:string = "en";
  public static readonly SPANISH:string = "es";

  private config: any;

  constructor(private http: HttpClient) { }
  
  private readonly dataUrl = './assets/data/locale.json';

  /*
  getWord(): Observable<any> {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((data ) => {
        return data.filter( mdata => mdata.id==+mid)[0];
    }));
  }

  public loadConfig() {
    return this.http.get('./assets/data/locale.json')
      .toPromise()
      .then((config: any) => {
        this.config = config;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  getConfig(params: string) {
    return this.config[params];
  }
  */
 
}