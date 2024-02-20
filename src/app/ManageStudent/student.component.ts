import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {StudentInterface} from "../Services/Student.interface";
import {BookData} from "../Services/Books.services";
import {BookAndStudent} from "../Services/BookStudentData.serivice";

@Component({
  selector:"student-comp",
  templateUrl:"student.component.html",
  styleUrls:["student.component.css"]
})
export class StudentComponent implements OnInit{
  studentData:StudentInterface[]=[]
  Id:number=1;
  Loaderstatus:boolean=true;
  UpdateStudent:boolean=false;
  EditStudent:StudentInterface[]=[]
  localEditdata:any
  constructor(private Http:HttpClient, private Student:BookData,private StudentService:BookAndStudent) {
  }
  StudentDetailsForm:FormGroup=new FormGroup({
    Name:new FormControl,
    Year:new FormControl,
    JoinDate:new FormControl
  })


  AddStudent() {
    let studentDetails = this.StudentDetailsForm.value
    if (!this.UpdateStudent) {
      this.Loaderstatus = true

      this.Http.post("https://personandb-default-rtdb.firebaseio.com/Students.json", studentDetails)
        .subscribe((value => {
          alert("Student added !!!")
          this.get()
          this.StudentDetailsForm.reset()
        }))

    } else if (this.UpdateStudent) {
        this.Update(studentDetails)
         this.StudentDetailsForm.reset()
       this.UpdateStudent=false

    }

  }
  get() {
    this.Http.get<StudentInterface[]>("https://personandb-default-rtdb.firebaseio.com/Students.json")
      .pipe((map(value => {
        let studentrarray: StudentInterface[] = []
        for (let studenrarrayKey in value) {
          studentrarray.push(value[studenrarrayKey])
          this.Id=1;
        }

         for (let i=0; i<studentrarray.length;i++){
           studentrarray[i].Id=this.Id
           this.Id=this.Id + 1

         }



        return studentrarray

      }))).subscribe((value1 => {
        this.Loaderstatus=false
      this.studentData = value1

      this.Http.put('https://personandb-default-rtdb.firebaseio.com/Students.json',value1)
        .subscribe((res)=>{console.log(res)})
      this.StudentService.StudentData=value1
      this.Student.StudentCount=this.studentData.length;
      localStorage.setItem("Student",String(value1.length))

      console.log(this.studentData)
    }))


  }

Delete(event:any){
let deletevalue:any[]=[]
  this.studentData.filter((value)=>{
   if(event!=value.Id){
     deletevalue.push(value)

   }

  })
  this.Http.put("https://personandb-default-rtdb.firebaseio.com/Students.json",deletevalue)
    .subscribe((value=>{
      console.log(value)
      this.get()
    }))



}



Edit(event:any){
    this.UpdateStudent=true
   this.localEditdata= this.studentData.find((value)=>{
     return event ==value.Id
   })
  console.log(this.localEditdata)
  this.StudentDetailsForm.setValue({
    Name:this.localEditdata.Name,
    Year :this.localEditdata.Year,
    JoinDate:this.localEditdata.JoinDate,

  })


}


Update(data:StudentInterface){
    this.studentData.filter((value)=>{
       if(value.Id==this.localEditdata.Id){
             this.EditStudent.push(data)
       }else if(value.Id!=this.localEditdata.Id){
             this.EditStudent.push(value)
       }
    })

  this.Http.put("https://personandb-default-rtdb.firebaseio.com/Students.json",this.EditStudent)
    .subscribe((value)=>{
      this.get()
      this.EditStudent=[]

    })

}

ngOnInit() {

this.get()
}


}
