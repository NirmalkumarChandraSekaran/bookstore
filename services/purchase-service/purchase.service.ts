import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  jsondata = 'http://localhost:3332/vendors';

  getvendor(): Observable<any> {
    return this.http.get(this.jsondata);
  }

  addvendor(request: any): Observable<any> {
    return this.http.post(this.jsondata, request);
  }
}
