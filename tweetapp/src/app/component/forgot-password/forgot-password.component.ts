import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { ForgotPasswordService } from 'src/app/service/forgot-password.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm!:FormGroup;
  constructor(private service:ForgotPasswordService,private fb:FormBuilder,private router:Router) { 
    this.forgotForm = this.fb.group({
      username: '',
      newpassword:'',
      confirmpassword:''
    });
  }
  errorMessage:String=''
  value:any
  user!:User
  ngOnInit(): void {
  }

  onSubmit(formValue:any){
    if(formValue.newpassword!=formValue.confirmpassword){
      this.errorMessage="New password and Confirm password are not same";
      return;
    }
    this.user  = {userName:formValue.username,password:formValue.newpassword,firstName:'',lastName:'',emailId:'',contactNumber:''};
    this.value=this.service.forgot(this.user,formValue.username).subscribe(data=>{
      this.value=data;
      this.router.navigate(['login'])},
      err=>{
        this.errorMessage=err.error.message;
      }
      );
    
  }

}
