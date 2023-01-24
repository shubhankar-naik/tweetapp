import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet } from '../model/tweet.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http:HttpClient) { }
  httpOptions= new HttpHeaders({'Authorization': "Bearer "+localStorage.getItem("token"),'Content-Type': 'application/json'})
  username=localStorage.getItem("user")
  tweetid=localStorage.getItem("tweetId")
 
  update(updateBody:Tweet){
    
    return this.http.put<any>("http://localhost:8001/api/v1.0/tweets/"+this.username+"/update/"+this.tweetid, JSON.stringify(updateBody),{headers:this.httpOptions,responseType:"text" as 'json'});
  }
}
