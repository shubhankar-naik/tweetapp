import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router :Router) { }
  user=localStorage.getItem("user");
  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
