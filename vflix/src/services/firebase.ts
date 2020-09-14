
export class Firebase {

    private readonly authToken = 'GwUx8yJsYBAnzaqNr0CeskcTxwWa6Hx1RVunzd99';
  
    private constructor(private firebaseUrl:string) {}

    public static create(firebaseUrl:string): Firebase { return new Firebase(firebaseUrl); }
  
    public addNode(value):Firebase { 
      this.firebaseUrl = `${this.firebaseUrl}/${value}`; 
      return this;
    }

    public addAuth():Firebase { 
      this.firebaseUrl = `${this.firebaseUrl}.json?auth=${this.authToken}`; 
      return this;
    }

    public setBetween(field:string,value:number):Firebase { 
      this.firebaseUrl = `${this.firebaseUrl}&orderBy="${field}"&startAt=${value}&endAt=${value}`; 
      return this;
    }

    public setOrderBy(value:string):Firebase { 
      this.firebaseUrl = `${this.firebaseUrl}&orderBy="${value}"`; 
      return this;
    }

    public setWhere(column:string,value:string):Firebase { 
      this.firebaseUrl = `${this.firebaseUrl}&orderBy="${column}"&equalTo=${value}`; 
      return this;
    }

    public setShallow():Firebase { 
      this.firebaseUrl = `${this.firebaseUrl}&shallow=true`; 
      return this;
    }
    
    public build():string { return this.firebaseUrl; }
  
  }
  