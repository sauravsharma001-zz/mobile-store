import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  private isUserLoggedIn;
  public name;
  private url = 'http://localhost:3000';
  result: any;
  public token: string;

  public getToken(): string {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log('token', currentUser.token);
    return currentUser.token;
  }

  constructor(private _http: Http) {
    this.isUserLoggedIn = false;
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email, password) {
      return this._http.post(this.url + '/api/users/login', {email: email, password: password} )
        .map((res: Response ) => {
            const token = res.json() && res.json().token;
            const name = res.json() && res.json().name;
            const profile = res.json() && res.json().userrole;
            console.log("token", token);
            if (token) {
              this.token = token;
              this.name = name;
              sessionStorage.setItem('currentUser', JSON.stringify({ name: name, token: token }));
              sessionStorage.setItem('userProfile', JSON.stringify({name: name, profile: profile}));
              return true;
            } else {
              return false;
            }
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any

    }

  register(user_json)  {
    return this._http.post(this.url + '/api/users/register', user_json)
      .map(result => this.result = result.json())
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  emailcheck(email)  {
    return this._http.post(this.url + '/api/users/emailcheck', email)
      .map(result => this.result = result.json())
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  setUserLoggedIn(flag, name) {
    this.isUserLoggedIn = flag;
    this.name = name;
  }

  getUserLoggedIn() {
    return this.name;
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('userProfile');
  }
}
