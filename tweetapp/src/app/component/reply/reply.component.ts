import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplyService } from 'src/app/service/reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  public replyForm!:FormGroup;
  constructor(private service:ReplyService,private fb:FormBuilder,private router:Router) {
    this.replyForm = this.fb.group({
      reply:''
    });
   }
   value:any
  ngOnInit(): void {
  }

  onSubmit(reply:any){
    this.service.reply(reply).subscribe(data=>this.value=data)
    this.router.navigate(['alltweets'])
  }
}
