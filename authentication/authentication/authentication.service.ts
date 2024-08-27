import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { login } from '../../Model/login';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static readonly key = 'JWT_KEY';

  constructor(private http: HttpClient, private route: Router) {}

  get jwt(): string {
    return localStorage.getItem(AuthenticationService.key) ?? '';
  }

  private set jwt(value: string) {
    localStorage.setItem(AuthenticationService.key, value);
  }

  authentication() {
    if (localStorage.getItem('JWT_KEY')) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.removeItem(AuthenticationService.key);
    this.route.navigateByUrl('login');
  }
  login(username: string, password: string): Observable<string> {
    return this.http
      .post<login>(`${environment.serverUrl}/Auth/GetToken`, {
        username,
        password,
      })
      .pipe(
        tap((r) => (this.jwt = r.token)),
        map((r) => r.token)
      );
  }

  loadfunction() {
    const path: string[] = window.location.pathname.split('/');

    console.log(path[1]);
    const navlinks = document.querySelectorAll('li a').forEach((links) => {
      console.log(links.innerHTML);
      if (links.innerHTML == path[1]) {
        links.classList.add('active');
      } else {
        links.classList.remove('active');
      }
    });
    console.log(path[1]);
  }
}
