import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { AuthenticationService} from '../../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@Injectable()
export class RegisterComponent implements OnInit {

  emailExists: boolean = false;
  passwordMatch: boolean = true;
  password: string = "Aaaaaa1" ;
  confirmPassword: string = "Aaaaaa1";
  errorMsg: string ;
  regsuccess: boolean = false;

  constructor(private _http: Http, private user:AuthenticationService) { }

  ngOnInit() {
  }

  emailcheck(e){
  console.log('email', e.target.value);
  this.user.emailcheck({email: e.target.value})
         .subscribe(res => {
          console.log('res returned', res);
          this.emailExists = res.emailexists;
         }),
         error=>{
           this.errorMsg=error;
           console.log("Email already exists!")
         }

  }

  passwordCheck() {
    this.passwordMatch = true;
    if(this.password != this.confirmPassword)
      this.passwordMatch = false;
  }

  register(e)  {
      e.preventDefault();
      console.log(e);
      const firstname = e.target.elements[0].value;
      const lastname = e.target.elements[1].value;
      const email = e.target.elements[2].value;
      const addr1 = e.target.elements[3].value;
      const addr2 = e.target.elements[4].value;
      const city = e.target.elements[5].value;
      const state = e.target.elements[6].value;
      const zip = e.target.elements[7].value;
      const phone = e.target.elements[8].value;
      const password = e.target.elements[9].value;
      const passwordConfirmation = e.target.elements[10].value;

      const user_json = {
        firstname : firstname,
        lastname : lastname,
        address : {
          line_1 : addr1,
          line_2 : addr2,
          city : city,
          state : state,
          zip : zip
        },
        email : email,
        phone : phone,
        password : password
      }
      console.log('user', user_json);

      this.user.register(user_json)
         .subscribe(res => console.log('res returned', res)),
         error=>{
         this.errorMsg=error;
         }
        this.regsuccess = true;

    }
}
