import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: any;
  isLoggedIn: boolean;
  loginErrorMessage: any;
  token: any;
  selectedTab: any;

  constructor( private user: AuthenticationService,
               private router: Router,
               private mobile: MobileService,
               private elem: ElementRef) { }

  ngOnInit() {
    this.selectedTab = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.name = currentUser && currentUser.name;
    if (this.name != null && this.name !== undefined)  {
      this.isLoggedIn = true;
    }  else  {
      this.isLoggedIn = false;
    }
  }

  redirectSearch(event)  {
      let keyword = this.elem.nativeElement.querySelector("#keyword").value;
      this.router.navigate(['/mobile'], { queryParams: { keyword: keyword } });
  }

  loginUser(e)  {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    this.user.login(email, password)
      .subscribe(result => {
          if (result === true)  {
            this.isLoggedIn = true;
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            this.token = currentUser && currentUser.token;
            this.name = currentUser && currentUser.name;
            this.router.navigate(['/']);
          } else {
            this.loginErrorMessage = 'Username or password is incorrect';
            this.isLoggedIn = false;
          }
        },
        error => {
          this.loginErrorMessage = error.json().message;
          this.isLoggedIn = false;
        });
  }

  logoutUser(e) {
    this.user.setUserLoggedIn(false, null);
    this.isLoggedIn = false;
    this.name = null;
    this.user.logout();
    this.router.navigate(['/']);
  }
}
