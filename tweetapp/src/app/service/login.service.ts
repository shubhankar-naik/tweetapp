import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  login(user:User) {
    console.log("login service called");
    return this.http.post<User>("http://localhost:8000/api/v1.0/tweets/login", JSON.stringify(user),this.httpOptions);

  }
}
