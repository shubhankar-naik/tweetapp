import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/model/tweet.model';
import { AllTweetsService } from 'src/app/service/tweets.service';

@Component({
  selector: 'app-all-tweets',
  templateUrl: './all-tweets.component.html',
  styleUrls: ['./all-tweets.component.css']
})
export class AllTweetsComponent implements OnInit {

  constructor(private service:AllTweetsService,private fb:FormBuilder,private router:Router) { }
  tweets!:Tweet[]
  value:any
  user:any=localStorage.getItem("user")
  ngOnInit(): void {

    this.service.searchAllTweets().subscribe((data)=>{
      this.tweets=data.reverse();


    });

  }

  like(tweetid:String){
    this.service.likeTweet(this.user,tweetid).subscribe(data=>{
      this.value=data;
      window.location.reload()
    })
  }

  reply(id:any){
    localStorage.setItem('tweetId',id);
    this.router.navigate(['reply']);
  }
}


