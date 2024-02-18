import {Component, ElementRef, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Dataservice} from "../Services/Data.services";
import {HttpClient} from "@angular/common/http";

import {filter, generate, map} from "rxjs";
import {BookData} from "../Services/Books.services";
import {BookAndStudent} from "../Services/BookStudentData.serivice";
import formatters from "chart.js/dist/core/core.ticks";
import { CentralRepo } from "../Services/MainRepo.service";





@Component({
  selector:"Books-comp",
  templateUrl:"books.component.html",
  styleUrls:["books.component.css"]
})
export class Books implements OnInit{

  BookDetails:any[]=[];
  updatebutton:boolean=false

  constructor(private Http:HttpClient,
              private Bookscount:BookData,
              private Bookservice:BookAndStudent,
              private Mobnav:CentralRepo) {
  }
  Id =1;
  Quantity:number=0;

  Loaderstatus:boolean=true;
  curentBook:any;
  editedData:Dataservice[]=[]


  AddBook:FormGroup=new FormGroup(
    {
      BookName:new FormControl("",[Validators.required,Validators.minLength(3)]),
      Quantity:new FormControl("",[Validators.required]),
      AuthorName:new FormControl("",[Validators.required]),
      Id:new FormControl(this.Id)
    }
  )



  Add(){
    let Data :Dataservice=this.AddBook.value

    if(!this.updatebutton){
      if(this.AddBook.valid){
        this.Loaderstatus=true


        this.Http.post("https://personandb-default-rtdb.firebaseio.com/Books.json",Data).subscribe(
          (value)=>{


            this.Id=1
            this.Get()
            alert('Books Added Suuccessfully !!!' )
            this.AddBook.reset()
          }

        )}else{
        alert("Add the Details")
      }
    }
    // ACtion for UPDATE---------------------------------------------------------------//
    else if(this.updatebutton){

       console.log(Data)
      this.Id=1
      this.Update(Data)

    }





    }

  Get(){
    this.Http.get<Dataservice[]>("https://personandb-default-rtdb.firebaseio.com/Books.json")
      .pipe(map((values)=> {
        let Data:Dataservice[] = [];
        for (let valuesKey in values) {

          Data.push(values[valuesKey])
        }

        // QUANTITY ADJUSMENT  AND ------------------------------------------------//

        if (!this.updatebutton) {


          if (Data.length < 1000) {
            for (let i = 0; i < Data.length; i++) {
              this.Quantity = 0;
              for (let j = 0; j < this.Bookscount.IssuedBookDetails.length; j++) {
                this.Quantity = 0;
                if (Data[i].BookName == this.Bookscount.IssuedBookDetails[j].BookName) {
                  this.Quantity = this.Quantity + this.Bookscount.IssuedBookDetails[j].Quantity

                  console.log(this.Quantity)
                  Data[i].Quantity = Data[i].Quantity - this.Quantity
                }

              }
              console.log(this.Quantity)


            }


          }
        }
          else if(this.updatebutton){
          console.log("Quality executed on Editphase")
        }


        // ID VALIDATE ------------------------------------------------------------------------//
        for (let i = 0; i < Data.length; i++) {


          Data[i].Id = this.Id
          this.Id = this.Id + 1
          this.Bookscount.BookCount = this.Id - 1


        }



        return Data;
      })).subscribe((Values1)=>{
      this.Loaderstatus=false
      this.updatebutton=false
         this.BookDetails= Values1
      this.Http.put("https://personandb-default-rtdb.firebaseio.com/Books.json",this.BookDetails)
        .subscribe((res)=>{console.log(res)})
      this.Bookservice.BookData=Values1
      localStorage.setItem("Book",String(Values1.length))

      // @ts-ignore
      localStorage.setItem("BookData",Values1)
      console.log(Values1+ "database")
    })

    console.log(this.Bookscount)


  }





  Delete(event:HTMLTableCellElement){
    let deletevalue:any[]=[]
   this.BookDetails.filter((value=>{
      if (value.Id!=event.innerText){

        deletevalue.push(value)
      }

   }))
    this.Http.put("https://personandb-default-rtdb.firebaseio.com/Books.json",deletevalue).subscribe(
      (values1=>{
        console.log("Book Deleted")
        if(deletevalue.length<this.Id){
          this.Bookscount.BookCount=0
        }
        this.Id=1;
        this.Get()
      })

    )



  }

Edit(event:any){
    this.updatebutton=true
    //Capture Value to edit ----------------------------------//
 this.curentBook=  this.BookDetails.find((value)=>{
  return value.Id==event
})
  console.log(this.curentBook)
  this.AddBook.setValue({
    BookName:this.curentBook.BookName,
    Quantity:this.curentBook.Quantity,
    AuthorName:this.curentBook.AuthorName,
    Id:this.curentBook.Id

  })





}
  Update(Data:any){

     this.BookDetails.filter((value)=>{
       if(value.Id==this.curentBook.Id){
        this. editedData.push(Data)
       }
       else if(value.Id!=this.curentBook.Id){
         this.editedData.push(value)
       }
     })
    console.log(this.editedData)
    //Send Req to Change---------------------------------------------------------------------------//
    this.Http.put("https://personandb-default-rtdb.firebaseio.com/Books.json",this.editedData)
      .subscribe(res=>{

        this.Get()
        alert("Updated")
        this.AddBook.reset()

        this.editedData=[]
      })


  }


ngOnInit() {

  this.Get();

this.Mobnav.MobNav=false

}



}
