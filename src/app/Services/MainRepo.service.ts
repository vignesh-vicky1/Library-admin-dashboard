import {ReturnData} from "./Data.services";
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
@Injectable({providedIn:"root"})
export class CentralRepo{
  constructor(private Http:HttpClient) {
  }

  ReturnedData:ReturnData[]=[]
  MobNav:boolean=false


//GET METHOD OF RETURNBOOK COMPONENT-------------------------------------------------------------------------//
  ReturnBookGet(){
   return this.Http.get<any>("https://personandb-default-rtdb.firebaseio.com/ReturnData.json")
      .pipe(map((value=>{
        let ReturnDAta:ReturnData[]=[]
        for(let a in value){
          ReturnDAta.push(value[a])
        }
        return ReturnDAta
      })))
  }

  //--------------------------------------------------------------------------------------------------------------------------

}
