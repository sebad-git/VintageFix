
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

  private readonly localeUrl = './assets/data/locale.json';

  constructor(private http: HttpClient) {}
  
  public getTranslator(): Observable<any> {
    return this.http.get<any[]>(this.localeUrl).pipe(
      map((translatorFile) => {
        if(navigator.language.includes(TranslatorService.SPANISH)){
          return translatorFile[TranslatorService.SPANISH];
        }
        return translatorFile[TranslatorService.ENGLISH];
    }));
 }

}