import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {BookAndStudent} from "../Services/BookStudentData.serivice";
import {Dataservice, ReturnData} from "../Services/Data.services";
import {StudentInterface} from "../Services/Student.interface";
import {filter, map} from "rxjs";
import {issuebooktype} from "../Services/IssuedBooktype";
import {BookData} from "../Services/Books.services";
import {CentralRepo} from "../Services/MainRepo.service";


@Component({
  selector:"IsueeBokk-comp",
  templateUrl:"issuecomponent.html",
  styleUrls:["isuuebook.component.css"]
})
export class IssuebookComponent implements OnInit{
  constructor(private Http:HttpClient, private Bookservice:BookAndStudent,private Books:BookData,private Centralrep:CentralRepo) {
  }

//SOURCE DATA FOR ALL VALIDATIONS------------------------------------------------------------//
 bookdata:Dataservice[]=this.Bookservice.BookData
 StudentData:StudentInterface[]=this.Bookservice.StudentData
   IssueBook:any|FormGroup
  IssueDetails:issuebooktype[]=[]
  Loaderstatus:boolean=true;
  TotalQuantity:number=0



  // INSTANCE OF FORM MODULE AND CONTROLS-----------------------------------------------------//

   //VALIDATION FOR STUDENT NAME-------------------------------------------------------------- //
  validation1(control:FormControl<any>):{[s:string]:boolean}|null{

    for(let i=0;i<this.StudentData.length;i++){
      if (this.StudentData[i].Name==control.value){
        return {value1:true}

      }

      }


    return null
  }

  //VALIDATION FOR BOOKNAME-------------------------------------------------------------------------//
  BookNAmeValidator(control:FormControl<any>):{[S:string]:boolean}|null{

    for (let i=0;i<this.bookdata.length;i++){
      if(this.bookdata[i].BookName==control.value){
        return {value2:true}
      }
    }
    return null

  }
// DATE VALIDATION FOR FORM ------------------------------------------------------------------------------//





  //FORM SUBMIT METHODS------------------------------------------------------------------------------//
  AddEntry(){
    this.Loaderstatus=true
    let books:string|null=localStorage.getItem("BookData")
    let Data =this.IssueBook.value
    if (this.IssueBook.touched) {
       this.bookdata.filter(value => {
         if(value.BookName==this.IssueBook.value.BookName){

              if(value.Quantity>=this.IssueBook.value.Quantity){
                  console.log('yes')
                console.log(this.IssueBook)


                //HTTP POST REQ FOR SAVE DATA TO DB----------------------------------------------------------//
                this.Http.post("https://personandb-default-rtdb.firebaseio.com/IssuedBooks.json",Data).subscribe(
                  value=>{
                    this.Get()
                    alert("Successfully Book Issued")
                  }
                )






              }else if(value.Quantity<this.IssueBook.value.Quantity){
                alert("Plz enter the available Quantity")
              }
         }else{

         }
       })


    }else{
      alert("Plz Enter Data ")
    }





  }



  //GET REQUEST TO GET THE DATA AND SHOW IN THE DASH BOARD-----------------------------------------------//

  Get(){
    this.Http.get<issuebooktype[]>("https://personandb-default-rtdb.firebaseio.com/IssuedBooks.json")
      .pipe(map((value=>{
           let ReceivedData:any[]=[]
        for (let receivedDataKey in value) {
              ReceivedData.push(value[receivedDataKey])
        }

        return ReceivedData
      }))).subscribe(value1=>{
        this.Loaderstatus=false
        this.IssueDetails=value1
      this.CompareReturnAndIssue(value1)
      this.Books.IssuedBookDetails=value1

      for (let i=0;i<value1.length;i++){
          this.TotalQuantity= this.TotalQuantity+value1[i].Quantity
        console.log(this.TotalQuantity)
      }




      localStorage.setItem("IssueBooks",String(this.TotalQuantity))



    })
  }

// COMPARE DATA BETWEEN ISSUED AND RETURNED BOOK COMPONENT ----------------------------------------------------//

  CompareReturnAndIssue(value:issuebooktype[]){
    let index :number
   let comparedData:issuebooktype[]=value
    this.Centralrep.ReturnBookGet().subscribe((value)=>{
    for (let i=0;i<value.length;i++) {
      for (let j = 0; j < this.IssueDetails.length; j++) {
        if (value[i].StudentName == this.IssueDetails[j].StudentName && value[i].BookName == this.IssueDetails[j].BookName) {
          index = j

          comparedData.splice(j,1)
        }
      }



    } if(comparedData.length>=0) {
        this.Http.put("https://personandb-default-rtdb.firebaseio.com/IssuedBooks.json", comparedData)
          .subscribe((value) => {
            console.log(value)

          })
        console.log(comparedData)
      }
    })


    console.log(comparedData)

  }




  ngOnInit() {

    this.IssueBook=new FormGroup<any>({

      StudentID:new FormControl(),
      StudentName:new FormControl("",[Validators.required,this.validation1.bind(this)]),
      BookID:new FormControl(),
      BookName:new FormControl("",[Validators.required,this.BookNAmeValidator.bind(this)]),
      Date:new FormControl("",[Validators.required]),
      Quantity:new FormControl("",[Validators.required])


    })

    this.Get()


  }


}
