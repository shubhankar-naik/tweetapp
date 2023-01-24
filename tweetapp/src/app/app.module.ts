import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AllTweetsComponent } from './component/all-tweets/all-tweets.component';
import { ReplyComponent } from './component/reply/reply.component';
import { UserComponent } from './component/user/user.component';
import { PosttweetComponent } from './component/posttweet/posttweet.component';
import { UpdateComponent } from './component/update/update.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    UsersListComponent,
    NavbarComponent,
    AllTweetsComponent,
    ReplyComponent,
    UserComponent,
    PosttweetComponent,
    UpdateComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
