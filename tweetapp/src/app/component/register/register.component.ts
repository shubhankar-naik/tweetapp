import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';

import { User } from 'src/app/model/user.model';
import { RegisterServiceService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public registerForm!:FormGroup;
  constructor(private service:RegisterServiceService,private fb:FormBuilder) {
    this.registerForm = this.fb.group({
      username: '',
      password:'',
      confirmpassword:'',
      firstname:'',
      lastname:'',
      emailid:'',
      contactnumber:''
    });
   }
   errorMessage:String=''
   added!:String;
   value:any
   user!:User;
  ngOnInit(): void {
  }

  onSubmit(data:any){
    this.user  = {userName:data.username,password:data.password,firstName:data.firstname,lastName:data.lastname,emailId:data.emailid,contactNumber:data.contactnumber};
    
    this.value=this.service.register(this.user).subscribe(data=>{this.value=data},
      err=>{
        this.errorMessage+=err.error.message;
      });
    console.log("form submit executed")
    this.registerForm.reset();
    
  }

}
