import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  value:any
  user!:User
  token!:String
  errorMessage:String=''
  constructor(private fb:FormBuilder,private service:LoginService, private router:Router) { 
    this.loginForm = this.fb.group({
      username: '',
      password:''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formValue:any){
    this.user  = {userName:formValue.username,password:formValue.password,firstName:'',lastName:'',emailId:'',contactNumber:''};
    this.value=this.service.login(this.user).subscribe(data=>{
      this.value=data;
      localStorage.setItem('token', this.value.token);
      localStorage.setItem('user',formValue.username)
      this.router.navigate(['myprofile/'+localStorage.getItem("user")])},
      err=>{
        this.errorMessage=err.error.message;
      });
    
  }

}
