import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MobileService {

  private isUserLoggedIn;
  public name;
  private url = 'http://localhost:3000';
  result: any;
  public token: string;

  constructor(private _http: Http) { }

  upload(formData: any) {
    console.log("formData", formData);
      return this._http.post(this.url + '/api/test', formData )
        .map((res: Response ) => {
            //console.log("response", res);
            return res;
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  getAllMobile(queryString: any, page: any)  {
    return this._http.get(this.url + '/api/mobiles?offset=' + page + "&" + queryString)
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

}
