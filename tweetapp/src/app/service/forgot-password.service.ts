import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  forgot(user:User,username:String){
    return this.http.post<User>("http://localhost:8000/api/v1.0/tweets/"+username+"/forgot", JSON.stringify(user),this.httpOptions);

  }
}
