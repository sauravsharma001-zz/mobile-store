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

  addMobile(formData: any) {
    console.log("formData", formData);
      return this._http.post(this.url + '/api/mobiles', formData )
        .map((res: Response ) => {
            return res;
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  updateMobile(mobileId, formData: any) {
    console.log("formData", formData);
      return this._http.post(this.url + '/api/mobiles/' + mobileId, formData )
        .map((res: Response ) => {
            return res;
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  deleteMobile(mobileId) {
      return this._http.delete(this.url + '/api/mobiles/' + mobileId)
        .map((res: Response ) => {
            return res;
        })
        .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  getMobileAll(queryString: any, page: any)  {
    return this._http.get(this.url + '/api/mobiles?offset=' + page + "&" + queryString)
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  getMobileOne(mobileId: any)  {
    return this._http.get(this.url + '/api/mobiles/' + mobileId)
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

  searchMobile(identifier: any, keyword: any)  {
    var queryParams = '';
    if(identifier === 'name')
      queryParams = 'name='+keyword;
    else
      queryParams = 'keyword='+keyword;
    return this._http.get(this.url + '/api/mobiles/search?' + queryParams)
      .map((res: Response ) => {
          return res.json();
      })
      .catch((error: any) => Observable.throw(error)); // ...errors if any
  }

}
