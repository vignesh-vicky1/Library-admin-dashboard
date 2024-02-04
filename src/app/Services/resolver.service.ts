import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Dataservice} from "./Data.services";
import {Observable} from "rxjs";
import {BookData} from "./Books.services";
import {Injectable} from "@angular/core";
@Injectable()
export class  Resolvers implements Resolve<Dataservice>{
constructor(private book:BookData,private Book:BookData) {
}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Dataservice>|Promise<Dataservice>|any {

    let Data=this.Book.BookCount

   return Data
  }
}


