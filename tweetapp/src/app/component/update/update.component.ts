import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/model/tweet.model';
import { UpdateService } from 'src/app/service/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public updateForm!:FormGroup;
  tweetBody:any
  constructor(private service:UpdateService,private fb:FormBuilder,private router:Router) {
    this.updateForm = this.fb.group({
      tweet:''
    });
    this.tweetBody=localStorage.getItem("tweetBody")
  }
  
  value:any
  ngOnInit(): void {
    
  }

  onSubmit(tweet:Tweet){
    
    this.service.update(tweet).subscribe(data=>this.value=data)
    this.router.navigate(['user/'+localStorage.getItem("user")])
  }
}
