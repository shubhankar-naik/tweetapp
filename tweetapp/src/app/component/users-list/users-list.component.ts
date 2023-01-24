import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersListService } from 'src/app/service/users-list.service';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  userlistForm!:FormGroup
  message!:String
  constructor(private service:UsersListService,private fb:FormBuilder,private router:Router) {
    this.userlistForm = this.fb.group({
      username: ''});
   }
  users:any
  ngOnInit(): void {
    this.message=''
    this.service.searchAll().subscribe(data=>{
      this.users=data;
    });

  }

  onSubmit(formValue:any){
    this.message=''
    if(formValue.username==''){
       this.ngOnInit();
    }
    else{
    console.log(formValue)
    this.service.searchUser(formValue.username).subscribe(data=>{
      this.users=data;
      if(this.users.length<1){
        this.message="No Users found"
      }
      console.log(this.users);
     
      
    });
  }
  }

}
