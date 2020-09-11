
export class Language {
  
  static readonly ENGLISH:string = "en";
  static readonly SPANISH:string = "es";

    constructor(){}

     getLanguage():string {
         const language = navigator.language;
         if(language.includes(Language.SPANISH)){ return Language.SPANISH; }
       return Language.ENGLISH;
     }
 
     static isSpanish():boolean { return navigator.language.includes(Language.SPANISH); }
  
}