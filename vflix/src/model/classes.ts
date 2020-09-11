
export class Movie  {

    constructor(
      
      public id:number,
      public name:string,
      public plot:string,
      public poster:string,
      public category:number,
      public ranking:number,
      public lenght:string,
      public videoUrl:string
      ){}

}

export class Category {

  constructor(
    
    public id:number,
    public name:string
    
    ){}    
}

