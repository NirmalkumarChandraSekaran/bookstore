import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookstoreserviceService {
  constructor(private http: HttpClient) {}

  private jsondata = 'http://localhost:3333/books';
  getbooks(): Observable<any> {
    return this.http.get<any>(this.jsondata);
  }

  getbookbyid(value: number): Observable<any> {
    return this.getbooks().pipe(
      map((books) => books.find((book: any) => book.id === value))
    );
  }
  addnewbook(value: any): Observable<any> {
    return this.http.post(this.jsondata, value);
  }
  updatedate(value: number, updatedata: any): Observable<any> {
    return this.http.put(`${this.jsondata}/${value}`, updatedata);
  }
  deletebook(value: number): Observable<any> {
    return this.http.delete(`${this.jsondata}/${value}`);
  }
}
