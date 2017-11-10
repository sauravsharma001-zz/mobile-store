import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  mobileList: Array<any>;
  errorMsg: any;
  filterCond = {
    os:  {
      android: false,
      iOS: false
    },
    screen: {
      "under4": false,
      "fourtofive": false,
      "fivetosix": false,
      "abovesix": false
    },
    battery:  {
      "undertwo": false,
      "twotothree": false,
      "threetofour": false,
      "abovefour": false
    },
    brand:  {
      apple: false,
      essential: false,
      google: false,
      htc: false,
      lg: false,
      motorola: false,
      razer: false,
      samsung: false,
      sony: false
    },
    price:  {
      "undertwo": false,
      "twotofive": false,
      "fivetoseven": false,
      "seventoten": false,
      "aboveten": false
    }
  };

  constructor(private mobile: MobileService, private elem: ElementRef ) {

  }

  ngOnInit() {
    this.fetchMobile('');
  }

  fetchMobile(queryString) {
    this.mobile.getAllMobile(queryString)
        .subscribe(result => {
            this.mobileList = result;
        }),
        error =>  {
          this.errorMsg = error;
        }
  }

  upload(event)  {
    event.preventDefault();
    let files = this.elem.nativeElement.querySelector("#mobileImage").files;
    let formData = new FormData();
    let file = files[0];
    formData.append('mobileImage', file, "Samsung.jpg");
    formData.append("name", "Samsung");
    this.mobile.upload(formData)
        .subscribe(result => {
            console.log("result", result);
          },
          error => {
            console.log("error", error);
          });
  }

  filterResult()  {
    console.log(this.filterCond);
    let queryString = "";
    if(this.filterCond.os.android == true)
      queryString+= "os=Android&";
    if(this.filterCond.os.iOS == true)
      queryString+= "os=iOS&";

    if(this.filterCond.brand.apple == true)
      queryString+= "brand=Apple&";
    if(this.filterCond.brand.essential == true)
      queryString+= "brand=Essential&";
    if(this.filterCond.brand.google == true)
      queryString+= "brand=Google&";
    if(this.filterCond.brand.htc == true)
      queryString+= "brand=HTC&";
    if(this.filterCond.brand.lg == true)
      queryString+= "brand=LG&";
    if(this.filterCond.brand.motorola == true)
      queryString+= "brand=Motorola&";
    if(this.filterCond.brand.razer == true)
      queryString+= "brand=Razer&";
    if(this.filterCond.brand.samsung == true)
      queryString+= "brand=Samsung&";
    if(this.filterCond.brand.sony == true)
      queryString+= "brand=Sony&";

    if(this.filterCond.price.undertwo == true) {
      queryString += "price=0,250&";
    }
    if(this.filterCond.price.twotofive == true){
      queryString += "price=250,500&";
    }
    if(this.filterCond.price.fivetoseven == true) {
      queryString += "price=500,750&";
    }
    if(this.filterCond.price.seventoten == true) {
      queryString += "price=750,1000&";
    }
    if(this.filterCond.price.aboveten == true) {
      queryString += "price=1000,5000&";
    }

    if(this.filterCond.screen.under4 == true) {
      queryString += "screen=0,4&";
    }
    if(this.filterCond.screen.fourtofive == true) {
    queryString += "screen=4,5&";
    }
    if(this.filterCond.screen.fivetosix == true) {
      queryString += "screen=5,6&";
    }
    if(this.filterCond.screen.abovesix == true) {
      queryString += "screen=6,10&";
    }

    if(this.filterCond.battery.undertwo == true) {
      queryString += "battery=0,2000&";
    }
    if(this.filterCond.battery.twotothree == true) {
      queryString += "battery=2000,3000&";
    }
    if(this.filterCond.battery.threetofour == true) {
      queryString += "battery=3000,4000&";
    }
    if(this.filterCond.battery.abovefour == true) {
      queryString += "battery=4000,7000&";
    }

    this.fetchMobile(queryString);
  }
}
