import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTweetsComponent } from './component/all-tweets/all-tweets.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { PosttweetComponent } from './component/posttweet/posttweet.component';
import { RegisterComponent } from './component/register/register.component';
import { ReplyComponent } from './component/reply/reply.component';
import { UpdateComponent } from './component/update/update.component';
import { UserComponent } from './component/user/user.component';
import { UsersListComponent } from './component/users-list/users-list.component';
import { UpdateService } from './service/update.service';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'users/all', component: UsersListComponent },
  { path: 'alltweets', component: AllTweetsComponent },
  { path: 'reply', component: ReplyComponent },
  { path: 'user/:user', component: UserComponent },
  { path: 'myprofile/:user', component: UserComponent },
  { path: 'post', component: PosttweetComponent },
  { path: 'update', component: UpdateComponent },
  { path: '**',   redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
