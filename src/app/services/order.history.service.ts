import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class OrderHistoryService {

  private isUserLoggedIn;
  public name;
  private url = 'http://localhost:3000';
  result: any;
  public token: string;

  constructor(private _http: Http) { }

  getOrderAll()  {
    return this._http.get(this.url + '/api/orders')
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  getOrderOne(orderId: any)  {
    return this._http.get(this.url + '/api/orders/' + orderId)
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  addOrderHistory(orderHistory: any) {
      return this._http.post(this.url + '/api/orders', orderHistory )
        .map((res: Response ) => {
            return res;
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any
  }
}
