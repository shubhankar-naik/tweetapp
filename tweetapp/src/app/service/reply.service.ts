import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TweetReply } from '../model/tweet-reply.model';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  constructor(private http:HttpClient) { }
  httpOptions= new HttpHeaders({'Authorization': "Bearer "+localStorage.getItem("token"),'Content-Type': 'application/json'})
  username=localStorage.getItem("user")
  tweetid=localStorage.getItem("tweetId")
  reply(replyBody:TweetReply){
   
    return this.http.post<any>("http://localhost:8001/api/v1.0/tweets/"+this.username+"/reply/"+this.tweetid, JSON.stringify(replyBody),{headers:this.httpOptions,responseType:"text" as 'json'});
  }
}
