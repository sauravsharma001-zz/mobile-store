import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  register(e)  {
      e.preventDefault();
      console.log(e);
      const firstname = e.target.elements[0].value;
      const lastname = e.target.elements[1].value;
      const email = e.target.elements[2].value;
      const password = e.target.elements[3].value;
      const passwordConfirmation = e.target.elements[4].value;
      const phone = e.target.elements[5].value;
      const photo = e.target.elements[6].value;

      console.log("firstname", firstname);
      console.log("lastname", lastname);
      console.log("email", email);
      console.log("password", password);
      console.log("passwordConfirmation", passwordConfirmation);
      console.log("phone", phone);
      console.log("photo", photo);
      
      // this.user.register(firstname, lastname, username, email, password)
      //   .subscribe(res => console.log(res));

    }
}
