import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  jsondata = 'http://localhost:3331/customers';

  getCustomer(): Observable<any> {
    return this.http.get(this.jsondata);
  }

  addcustomer(request: any): Observable<any> {
    return this.http.post(this.jsondata, request);
  }
}
