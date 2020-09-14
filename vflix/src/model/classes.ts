
export class Movie  {
    
  public id:string;

    constructor(
      public name:string,
      public plot:string,
      public poster:string,
      public banner:string,
      public category:number,
      public ranking:number,
      public lenght:string,
      public videoUrl:string
      ) 
      { this.id = this.createUUID(); }

      public createUUID():string {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
}

export class Category {

  constructor(

    public id:number,
    public name:string
    
    ){}        
}

export class Database {
  
  public categories:Category[]; public movies:Movie[]; 
  
  constructor( ){}
}