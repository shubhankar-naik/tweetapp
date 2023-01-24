import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetReply } from 'src/app/model/tweet-reply.model';
import { Tweet } from 'src/app/model/tweet.model';
import { AllTweetsService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-posttweet',
  templateUrl: './posttweet.component.html',
  styleUrls: ['./posttweet.component.css']
})
export class PosttweetComponent implements OnInit {
  postForm:FormGroup
  constructor(private service:AllTweetsService,private router:Router,private fb:FormBuilder) { 
    this.postForm = this.fb.group({
      tweet:''})
  }
  
  value:any
  ngOnInit(): void {
  }

  onSubmit(data:any){
    console.log(data)
    this.service.addTweet(data).subscribe(data=>this.value=data)
    this.router.navigate(['user/'+localStorage.getItem("user")])
  }

}
