import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from,Subject,tap} from "rxjs";
import { Logclass } from "./Logindata.model";
import { LoginData } from "./Login.service";
import { Router } from "@angular/router";


interface AuthresponseData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}


@Injectable({providedIn:'root'})
export class Authentication{
   AdminName:any
  tokendatas= new Subject



  constructor(private auth:AngularFireAuth ,private Log :LoginData,private route:Router) {
  }

  //SIGNUP SERVICE----------------------------------------------------------------------------------//

Signup(Email:string,Password:string){
    return from(this.auth.createUserWithEmailAndPassword(Email,Password)).pipe(tap(res=>{
      this.Tokencatcher(res)
    }))


}

//LOGIN SERVICE-------------------------------------------------------------------------------//
  Login(Email:string,Password:string){
   return from(  this.auth.signInWithEmailAndPassword(Email,Password)).pipe(tap(res=>{
      this.Tokencatcher(res)
     this.AdminName=res.user?.email
     localStorage.setItem('UserName',this.AdminName)
    }))



  }
  Tokencatcher(res:any){
    res.user?.getIdTokenResult().then((x: { expirationTime: string | number | Date; token: string; })=>{
      let expDate = new Date(x.expirationTime)

      let obj=new Logclass(

        x.token,
        expDate,
      )
      this.tokendatas.next(obj)
      localStorage.setItem('userTokken',JSON.stringify(obj))


    })
  }


  AutoLog(){
     let data:any =localStorage.getItem('userTokken')
    let LocalData =JSON.parse(data)
    if(!LocalData){
      return
    }
   let obj =new Logclass(
     LocalData._Token,
     new Date(LocalData.expireDate)
   )
    if(obj.token){
      this.tokendatas.next(obj)
      this.Log.Data= obj ?true :false

    }

    console.log(obj)

  }

  Logout(event:Event){
     event.preventDefault()
    localStorage.removeItem('userTokken')

    this.Log.Data=false
    this.route.navigate(['LogIn'])



  }



}
