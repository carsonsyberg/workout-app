import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workout } from '../classes/workout';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public user: User;
  public isLoggedIn: boolean = true;
  constructor(private http: HttpClient) {
    this.user = new User();
  }

  login(userOrEmail: string, password: string): Observable<boolean> {
    return this.http.post<boolean>('https://localhost:7040/api/Account/Login', { NameOrEmail: userOrEmail, Password: password });
  }

  logout(): Observable<boolean> {
    return this.http.get<boolean>('https://localhost:7040/api/Account/Logout');
  }

  register(user: User): Observable<string> {
    return this.http.post<string>('https://localhost:7040/api/Operations/CreateUser', user);
  }
}
