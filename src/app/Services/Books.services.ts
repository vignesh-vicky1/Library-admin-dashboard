import { EventEmitter, Injectable, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { issuebooktype } from './IssuedBooktype';
import { Dataservice } from './Data.services';

@Injectable({ providedIn: 'root' })
export class BookData {
  constructor(private Http: HttpClient) {}

  BookCount: number = 0;
  StudentCount: number = 0;
  IssuedBookDetails: issuebooktype[] = [];
  book: number = 0;



}
