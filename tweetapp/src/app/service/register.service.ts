import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  register(user:User) {
    console.log("service called");
    return this.http.post<User>("http://localhost:8000/api/v1.0/tweets/register", JSON.stringify(user),this.httpOptions);
  }
}
