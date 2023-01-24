import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { Tweet } from 'src/app/model/tweet.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service:UserService,private fb:FormBuilder,private router:Router,private route:ActivatedRoute) { }
  tweets!:Tweet[]
  value:any
  user:any=this.route.snapshot.paramMap.get('user');
  loggeduser=localStorage.getItem("user")
  ngOnInit(): void {
    
    this.service.usernametweets(this.user).subscribe((data)=>{
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

  delete(id:any){
    this.service.delete(id).subscribe(data=>{
      this.value=data;
      console.log(this.value);
      window.location.reload()});
  }

  update(id:any,tweetBody:any){
    localStorage.setItem('tweetId',id);
    localStorage.setItem("tweetBody",tweetBody);
    this.router.navigate(['update']);
  }

  newtweet(){
    this.router.navigate(['post']);
  }
}
