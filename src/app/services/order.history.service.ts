import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class OrderHistoryService {

  private isUserLoggedIn;
  public name;
  private url = 'http://localhost:3000';
  result: any;
  public token: string;

  constructor(private _http: Http, private auth: AuthenticationService) { }

  getOrderAll()  {
    let header=new Headers({'Authorization': 'Bearer '+ this.auth.getToken()});
    return this._http.get(this.url + '/api/orders', {headers: header})
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  getOrderOne(orderId: any)  {
    let header=new Headers({'Authorization': 'Bearer '+ this.auth.getToken()});
    return this._http.get(this.url + '/api/orders/' + orderId, {headers: header})
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  addOrderHistory(orderHistory: any) {
      let header=new Headers({'Authorization': 'Bearer '+ this.auth.getToken()});
      return this._http.post(this.url + '/api/orders', orderHistory , {headers: header})
        .map((res: Response ) => {
            return res;
        })
        .catch((error: any) => Observable.throw(error._body)); // ...errors if any
  }
}
