import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  httpOptions= new HttpHeaders({'Authorization': "Bearer "+localStorage.getItem("token"),'Content-Type': 'application/json'})
  
  tweetid=localStorage.getItem("tweetId")

  update(){}
  delete(id:any){
    return this.http.delete("http://localhost:8001/api/v1.0/tweets/"+localStorage.getItem("user")+"/delete/"+id,{headers:this.httpOptions,responseType:'text' as 'json'});
  }
  usernametweets(username:String){
    return this.http.get<any>("http://localhost:8001/api/v1.0/tweets/"+username,{headers:this.httpOptions});
  }

  likeTweet(username:any,id:String){
    return this.http.put("http://localhost:8001/api/v1.0/tweets/"+username+"/like/"+id,null,{headers:this.httpOptions,responseType:"text"})
  }

}
