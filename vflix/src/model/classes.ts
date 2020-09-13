
export class Movie  {
    
  public appId:string;

    constructor(
      public name:string,
      public plot:string,
      public poster:string,
      public category:number,
      public ranking:number,
      public lenght:string,
      public videoUrl:string,
      public id:number
      ) 
      { this.appId = "vflix-sdm"; }
}

export class Category {

  constructor(
    
    public id:number,
    public name:string
    
    ){}    
}