import {Component} from "@angular/core";
import {LoginData} from "../Services/Login.service";
import {Route, Router, Routes} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Authentication} from "../Services/Auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {color, sign} from "chart.js/helpers";
import {filter} from "rxjs";

@Component({
  selector:"Login-app",
  templateUrl:"login.component.html",
  styleUrls:["login.component.css"]
})
export class Loggin{


constructor(private Log:LoginData,private route:Router, private Auth:Authentication ,private Http:HttpClient) {
}
 LoginSpinner:boolean=true
  error:boolean=false
  SignupError:boolean=false

//SIGNUP FORM HANDLE----------------------------------------------------------------------------------//

   Signin = new FormGroup({
    Username:new FormControl("",[Validators.required]),
     Email:new FormControl("",[Validators.required,Validators.email]),
     Password:new FormControl("",[Validators.required])
  });

LogIN=new FormGroup({
  Email:new FormControl("",[Validators.required,Validators.email]),
  Password:new FormControl("",[Validators.required])
})





Login(){
 this.LoginSpinner=false
  this.error=false
let LoginData:any =this.LogIN.value
this.Auth.Login(LoginData.Email,LoginData.Password)

  .subscribe(res=>{
  this.Log.Data=true
this.Auth.AdminName= res.additionalUserInfo?.username
  this.route.navigate(['Home'])
    this.Auth.AdminName=LoginData.Email
  console.log(this.Auth)
 this.LoginSpinner=true

},(error)=>{
  console.log(error.value)
    this.LoginSpinner=true
    this.error=true
})







}

  SignUp(log:HTMLLabelElement){
 let signinData:any=this.Signin.value
  this.Auth.Signup(signinData.Email,signinData.Password).subscribe(res=>{
    console.log(res)

    this.Signin.reset()
    log.click()
    this.SignupError=false
    alert("User Created !!!")

  },(error)=>{
    console.log(error)
    this.SignupError=true
  })

  }





  //VALIDATION   FOR LOGIN FORM----------------------------------------------------------//

ErrorColor(){
  let color
   if(this.LogIN.touched && !this.LogIN.value.Email?.includes('@')){
     color="2px solid red"
  }
   return color
}
PassValid(){
  let color
  if(this.LogIN.get('Password')?.invalid && this.LogIN.touched ){

    color="2px solid red"
  }
  return color
}

// PASSWORD L:ENGTH ---------------------------------------------------//


}
//  LOGIN VALIDATION END HERE ------------------------------------------------------------//
