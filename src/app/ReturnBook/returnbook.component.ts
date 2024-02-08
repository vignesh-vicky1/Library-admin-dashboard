import {booleanAttribute, Component, EventEmitter, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {BookData} from "../Services/Books.services";
import {issuebooktype} from "../Services/IssuedBooktype";
import {filter, map} from "rxjs";
import {ReturnData} from "../Services/Data.services";
import {and} from "@angular/fire/firestore";
import {CentralRepo} from "../Services/MainRepo.service";

@Component({
  selector:"return-App",
  templateUrl:"returnbook.component.html",
  styleUrls:['returnbook.component.css']
})






export class ReturnBook implements OnInit{
  constructor(private Http:HttpClient, private IssueData:BookData,private Centralrep:CentralRepo) {
  }

  ReturnForm=new FormGroup({
    StudentName:new FormControl("",[Validators.required]),
    BookName:new FormControl("",[Validators.required]),
    Quantity:new FormControl(<any>[Validators.required]),
    Date:new FormControl(<any>[Validators.required])
  })
// ErrOr MSgs--------------------------------------------------------//

  QuantityError:boolean=false
  Loaderstatus:boolean=false
  ReturnBookData:ReturnData[]=[]



  AddEntry(){

    // Validation for Form Throught TS------------------------------------------------------------------//
    let formData=this.ReturnForm.value
   let Data =this.IssueData.IssuedBookDetails
    let issuedQuantity:number=0

    for(let i=0;i<Data.length;i++){
       if (Data[i].BookName==formData.BookName && Data[i].StudentName==formData.StudentName){
         console.log("It's same")
         console.log(Data)

         issuedQuantity=issuedQuantity + Data[i].Quantity
          if(formData.Quantity==issuedQuantity ){
            console.log("quan same")
            this.QuantityError=false

            this.Http.post<ReturnData[]>("https://personandb-default-rtdb.firebaseio.com/ReturnData.json",formData).subscribe(
              responce=>{
                console.log(responce)
                this.GetReturnData();
              }
            )



          }
         else if(formData.Quantity>issuedQuantity || formData.Quantity<issuedQuantity){
           console.log("Check the quantity")
            this.QuantityError=true
         }
       }else{
            console.log("not")


       }

    }
    //VAlidation end here-------------------------------------------------------------------//
    //HTTP REQ To Update the RETURN BOOK -----------------------------------------------------//


  }



  GetReturnData(){
  this.Loaderstatus=true
    this.Centralrep.ReturnBookGet().subscribe(finalRes=>{
        this.Loaderstatus=false
        console.log(finalRes)
      this.ReturnBookData=finalRes
    })

  }
  DeleteData(){
    this.Http.delete("https://personandb-default-rtdb.firebaseio.com/ReturnData.json")
      .subscribe((res)=>{
        console.log(res)
        this.GetReturnData()
      })
  }

ngOnInit() {
    this.GetReturnData()



}

}
