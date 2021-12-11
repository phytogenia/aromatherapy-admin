import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Oil} from "../../models/oil.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }

  getData() : Observable<Object> {
    return this.httpClient
      .get('http://localhost:3000/oils')
  }

  addOil(oil: Oil) : Observable<any> {
    console.log('erzerz')
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(oil);
    console.log(body);
    return this.httpClient.post('http://localhost:3000/oils', body, {'headers': headers});
  }
}