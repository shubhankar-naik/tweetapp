import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweetapp';
  authapi="http://localhost:8000api/v1.0/tweets"
  tweetapi="http://localhost:8001/api/v1.0/tweets"
}
