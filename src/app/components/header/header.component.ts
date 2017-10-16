import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = true;
  error = true;
  loginErrorMessage = "Invalid username or password";
  constructor() { }

  ngOnInit() {
  }

  loginUser(e)  {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    console.log("email", email);
    console.log("password", password);
    this.isLoggedIn = true;
  }

  logoutUser(e) {
    console.log("log out");
    this.isLoggedIn = false;
    // this.user.setUserLoggedIn(false, null);
    // this.isLoggedIn = false;
    // this.username = null;
    // this.user.logout();
    // this.router.navigate(['/']);
  }
}
