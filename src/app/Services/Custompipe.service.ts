import {Pipe, PipeTransform} from "@angular/core";
@Pipe({name:'Pipe1'})
export class Pipes implements PipeTransform{
  constructor() {
  }

  transform(value: any, ...args: any[]): any {

    return value.substring(0,5).toUpperCase()+'...'
  }


}
