import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {from} from "rxjs";


interface AuthresponseData{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string,
  localId:string
}


@Injectable()
export class Authentication{
   AdminName:any

  constructor(private Http:HttpClient,private auth:AngularFireAuth) {
  }

  //SIGNUP SERVICE----------------------------------------------------------------------------------//

Signup(Email:string,Password:string){
    return from(this.auth.createUserWithEmailAndPassword(Email,Password))

}

//LOGIN SERVICE-------------------------------------------------------------------------------//
  Login(Email:string,Password:string){
   return from(  this.auth.signInWithEmailAndPassword(Email,Password))

  }




}
