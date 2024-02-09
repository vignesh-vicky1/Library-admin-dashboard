import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {LoginData} from "./Services/Login.service";
import {Authentication} from "./Services/Auth.service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import backgroundColor = _default.defaults.backgroundColor;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Library Management';


constructor(public Log:LoginData ,public Auth:Authentication ,private render:Renderer2) {

}

Work(){
this.render.addClass(this.Log.Sidebar,'sidebar')
}



ngOnInit() {

  this.Auth.AutoLog()

  console.log('appcomp')

}


  protected readonly localStorage = localStorage;
}
