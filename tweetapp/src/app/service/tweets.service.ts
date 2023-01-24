import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tweet } from '../model/tweet.model';

@Injectable({
  providedIn: 'root'
})
export class AllTweetsService {

  constructor(private http: HttpClient) { }
  httpOptions= new HttpHeaders({'Authorization': "Bearer "+localStorage.getItem("token"),'Content-Type': 'application/json'})
  
  username:any=localStorage.getItem("user");

  searchAllTweets(){
    return this.http.get<any>("http://localhost:8001/api/v1.0/tweets/all",{headers:this.httpOptions})
  }

  searchUsernameTweets(username:String){
    return this.http.get<any>("http://localhost:8001/api/v1.0/tweets/"+username,{headers:this.httpOptions})
  }

  likeTweet(username:any,id:String){
    return this.http.put("http://localhost:8001/api/v1.0/tweets/"+username+"/like/"+id,null,{headers:this.httpOptions,responseType:"text"})
  }

  addTweet(tweet:Tweet){
    
    return this.http.post("http://localhost:8001/api/v1.0/tweets/"+this.username+"/add",JSON.stringify(tweet),{headers:this.httpOptions,responseType:"text" as "json"});
  }
}
