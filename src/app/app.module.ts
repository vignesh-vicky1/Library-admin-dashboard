import {NgModule, Pipe} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {User} from "./User/user.component";
import {Router, RouterModule} from "@angular/router";
import {Books} from "./Managebooks/books.component";
import {Home} from "./Home/home.component";
import {BookData} from "./Services/Books.services";
import {StudentComponent} from "./ManageStudent/student.component";
import {IssuebookComponent} from "./IssueBook/issuebook.component";
import {Loggin} from "./Logging/login.component";
import {LoginData} from "./Services/Login.service";
import {BookAndStudent} from "./Services/BookStudentData.serivice";

import {Authentication} from "./Services/Auth.service";
import {FirebaseApp} from "@angular/fire/app";
import firebase from "firebase/compat";

import {AngularFireModule} from "@angular/fire/compat";
import {ReturnBook} from "./ReturnBook/returnbook.component";
import {CentralRepo} from "./Services/MainRepo.service";
import {Pipes} from "./Services/Custompipe.service";
import { Records } from './Records/records.component';




@NgModule({
  declarations: [
    AppComponent,
    User,
    Books,
    StudentComponent,
    Home,
    IssuebookComponent,
    Loggin,
    Records,
    ReturnBook,
    Pipes
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   AngularFireModule.initializeApp({
     apiKey: "AIzaSyB0P6SIgR1EHhn5D1yZZHgzqqfPbF2WuyA",
     authDomain: "authentication-19a46.firebaseapp.com",
     databaseURL: "https://authentication-19a46-default-rtdb.firebaseio.com",
     projectId: "authentication-19a46",
     storageBucket: "authentication-19a46.appspot.com",
     messagingSenderId: "885459143254",
     appId: "1:885459143254:web:1f2002f0da550188ef49f7",
     measurementId: "G-SQRCE059GP"
   }),
    AngularFireModule,


  ],
  providers: [LoginData,BookAndStudent,BookData,Authentication,CentralRepo],
  bootstrap: [AppComponent]
})
export class AppModule { }
