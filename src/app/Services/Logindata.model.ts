export class Logclass{

  constructor(

    private _Token:string|any,
    private expireDate:Date|any
  ) {}
  get token(){
    if(new Date() > this.expireDate){
      return null
    }
    return this._Token
  }



}
