import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Books } from './Managebooks/books.component';
import { Home } from './Home/home.component';
import { StudentComponent } from './ManageStudent/student.component';
import { IssuebookComponent } from './IssueBook/issuebook.component';
import { ReturnBook } from './ReturnBook/returnbook.component';
import { AppComponent } from './app.component';
import { Records } from './Records/records.component';
import { Loggin } from './Logging/login.component';

const routes=[
  {path:"Books",component:Books},
  {path:'Home', component: Home},
  {path: 'Students',component: StudentComponent},
  {path: "IssueBooks",component: IssuebookComponent},
  {path: "ReturnBook",component: ReturnBook},
  {path:'LogIn',component: Loggin},
  {path:'Records',component: Records}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
