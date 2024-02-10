import {Component, OnInit} from "@angular/core";
import {LoginData} from "../Services/Login.service";
import {Route, Router, Routes} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Authentication} from "../Services/Auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {color, sign} from "chart.js/helpers";
import {filter,map,tap,Subject} from "rxjs";
import { Logclass } from "../Services/Logindata.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
@Component({
  selector:"Login-app",
  templateUrl:"login.component.html",
  styleUrls:["login.component.css"]
})
export class Loggin implements OnInit{


constructor(private Log:LoginData,
            private route:Router,
            private Auth:Authentication ,
            private Http:HttpClient,
            private auth:AngularFireAuth) {
}


 LoginSpinner:boolean=true
  error:boolean=false
  SignupError:boolean=false
  localvariable:boolean=false
  formlevel:boolean=false



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
    this.Auth.tokendatas.subscribe((value)=>{
      this.Log.Data= value ? true : false
    })


  this.route.navigate(['Home'])

  console.log(res)


 this.LoginSpinner=true

},(error)=>{
  console.log(error.message)

    this.LoginSpinner=true
    this.error=true
})







}

  SignUp(log:HTMLLabelElement) {

    if (this.Signin.valid && this.Signin.touched) {
      let signinData: any = this.Signin.value
      this.formlevel=false
      this.Auth.Signup(signinData.Email, signinData.Password).subscribe(res => {
        console.log(res)


        this.Signin.reset()
        log.click()
        this.SignupError = false
        alert("User Created !!!")

      }, (error) => {
        console.log(error)
        this.SignupError = true
      })
    } else if (!this.Signin.value.Username) {
      this.formlevel=true
      console.log('notvalid - nme')
    } else if (!this.Signin.value.Email?.includes('@'))  {

      console.log('notvalid - Email')
    } else if (!this.Signin.value.Password) {
      console.log('notvalid - pass')
    }else{
      console.log('notvalid')
      this.formlevel=false
    }

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

// PASSWORD LENGTH ---------------------------------------------------//

  SignUpPass(event:any){
  let color
  if(!this.Signin.get(event)?.value && this.Signin.touched){
    color="2px solid red"
  }else if(this.Signin.get(event)?.value && this.Signin.touched){
    color="2px solid green"
  }
  return color
  }


  ngOnInit(): void {


  }


}
//  LOGIN VALIDATION END HERE ------------------------------------------------------------//
