import {Component, OnInit} from "@angular/core";
import {BookData} from "../Services/Books.services";

import {ActivatedRoute, Route} from "@angular/router";

import {HttpClient} from "@angular/common/http";
import{ Chart,registerables} from "chart.js"
import { Authentication } from "../Services/Auth.service";
Chart.register(...registerables)

@Component({
  selector:"Home-comp",
  templateUrl:"home.component.html",
  styleUrls:["home.component.css"],

})

 export  class Home implements OnInit{
  constructor(private bookservice:BookData ,private issuebook:BookData ,private auth:Authentication) {
  }
   Bookscount:number=0
  Studentcount:number=0
  TotalNumofIssuedBooks:number=0;



        ngOnInit()
        {
          this.Bookscount = this.bookservice.BookCount
          this.Studentcount = this.bookservice.StudentCount
          this.TotalNumofIssuedBooks = this.issuebook.IssuedBookDetails.length

        let  books= localStorage.getItem("Book")
          let students =localStorage.getItem("Student")
          let issuedBooks=localStorage.getItem("IssueBooks")
          this.piechart( books,students,issuedBooks)



        }

        piechart( bookscount:any,StudentCount:any,issuecounts:any) {
          const mychart = new Chart("Chart", {
            type: 'bar',
            data: {
              labels: ["BookCategories", 'Total No of Student', 'Total No of issued Books', 'Total No of returned Books'],
              datasets: [{
                label: 'Counts',
                data: [bookscount, StudentCount, issuecounts, 5],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',

                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',

                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });






        }
  protected readonly localStorage = localStorage;


}
