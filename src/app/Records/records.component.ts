import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { map } from "rxjs";
import { Dataservice } from "../Services/Data.services";

@Component({selector:'Records-app',
templateUrl:'cords.component.html',
styleUrls:['records.component.css']})
export class Records{
  constructor(private Http:HttpClient) {

  }
  FinalData:Dataservice[]=[]
  error:boolean=false

search(event:HTMLInputElement){
    console.log(event.value)
  this.Http.get<any>("https://personandb-default-rtdb.firebaseio.com/Books.json")
    .pipe(map((res)=>{
      let Data:Dataservice[]=[]
      for(let a in res){
         Data.push(res[a])

      }
      return Data
    })).subscribe((res1)=>{

    console.log(res1)
    //FILTER the VAlue which is equal to user input//
    this.FinalData=res1.filter((res2)=>{
     return res2.BookName.toLowerCase() == event.value
    })
    if(this.FinalData.length>=1){
        this.error=false
    }else{
      this.error=true
    }
    console.log(this.error)
    console.log(this.FinalData)
  })


}



}
