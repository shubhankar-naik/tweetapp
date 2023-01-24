import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private http: HttpClient) { 
    
  }
  httpOptions= new HttpHeaders({'Authorization': "Bearer "+localStorage.getItem("token")})
  
  searchAll()
  {
    
    return this.http.get<any>("http://localhost:8000/api/v1.0/tweets/users/all",{headers:this.httpOptions})
  }

  searchUser(username:String){
    return this.http.get<any>("http://localhost:8000/api/v1.0/tweets/user/search/"+username,{headers:this.httpOptions})
  }

}
