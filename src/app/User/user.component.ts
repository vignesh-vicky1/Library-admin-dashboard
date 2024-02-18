import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from "@angular/core";
import {LoginData} from "../Services/Login.service";
import {translateExpression, translateStatement} from "@angular/compiler-cli/src/ngtsc/translator";
import {Authentication} from "../Services/Auth.service";
import { CentralRepo } from "../Services/MainRepo.service";

@Component({
  selector:"User-comp",
  templateUrl:"user.component.html",
  styleUrls:["user.component.css"]
})
export  class User implements AfterViewInit{
  @ViewChild('div') divelement!:ElementRef
constructor(public Log:LoginData ,public Auth:Authentication,
            private render:Renderer2,
            public MobNav:CentralRepo) {
}



Work(){
    this.divelement.nativeElement
}

ngAfterViewInit() {
  this.Log.Sidebar=this.divelement.nativeElement
  console.log(this.divelement.nativeElement)


}
Logout(event:Event){
   if( confirm('Are you want to Logout')){
     this.Auth.Logout(event)
   }
    else{
     console.log('work')
   }


}

  ngOnInit() {


}
}
