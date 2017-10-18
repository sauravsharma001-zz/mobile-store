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
            console.log("token", token);
            if (token) {
              this.token = token;
              this.name = name;
              sessionStorage.setItem('currentUser', JSON.stringify({ name: name, token: token }));
              return true;
            } else {
              return false;
            }
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any

    }

    register(firstname, lastname, email, password)  {
      return this._http.post(this.url + '/api/users/register', {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
            } )
        .map(result => this.result = result.json());
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
  }
}
