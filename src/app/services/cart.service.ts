import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class CartService {

  private isUserLoggedIn;
  public name;
  private url = 'http://localhost:3000';
  result: any;
  public token: string;

  constructor(private _http: Http) { }

  addCart(formData: any) {
      console.log("formData", formData);
        return this._http.post(this.url + '/api/cart', formData )
          .map((res: Response ) => {
              return res;
          })
          .catch((error: any) => Observable.throw(error)); // ...errors if any
    }

    updateCart(cartId, cartDetails: any) {
        return this._http.put(this.url + '/api/cart/' + cartId, cartDetails )
          .map((res: Response ) => {
              return res;
          })
          .catch((error: any) => Observable.throw(error)); // ...errors if any
    }

     cartGetAll()  {
      return this._http.get(this.url + '/api/cart')
          .map((res: Response ) => {
              return res.json();
          })
          .catch((error: any) => Observable.throw(error)); // ...errors if any
     }

    deleteCart(cartId: any) {
      return this._http.delete(this.url + '/api/cart/' + cartId)
        .map((res: Response ) => {
          console.log('delete', res);
            return res.json();
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any
    }
}
