import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MobileService } from '../../services/mobile.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  isAdmin: boolean = false;
  state: string = 'small';
  page: number = 1; // the current pag
  perPage: number = 9; // how many items we want to show per page
  pagesToShow: number; // how many pages between next/prev
  loading: boolean;
  totalMobileReturned: any;
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

  constructor(private mobile: MobileService,
              private cart: CartService,
              private elem: ElementRef,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    if(sessionStorage.getItem('userProfile')) {
      const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));
      if(userProfile.profile === 'admin')
        this.isAdmin = true;
    }
    this.route.queryParams.subscribe((params: Params) => {
        if(params.keyword)
          this.searchMobile('keyword', params.keyword);
        else if(params.name)
          this.searchMobile('name', params.name);
        else
          this.fetchMobile('');
    });
  }

  searchMobile(identifier, keyword)  {
      this.mobile.searchMobile(identifier, keyword)
          .subscribe(result => {
            if(result.totalCount == 1)  {
              this.router.navigate(['/mobile/' + result.mobiles[0]._id]);
            }
            else  {
              this.mobileList = result.mobiles;
              this.totalMobileReturned = result.totalCount;
            }
      });
  }

  fetchMobile(queryString) {
      this.mobile.getMobileAll(queryString, this.page-1)
          .subscribe(result => {
              this.mobileList = result.mobiles;
              this.totalMobileReturned = result.totalCount;
          }),
          error =>  {
            this.errorMsg = error;

      }
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

  addToCart(index) {
    let cartDetails = { "product": []};
    var mobile = {
      productId: this.mobileList[index]._id,
      name: this.mobileList[index].name,
      brand: this.mobileList[index].brand,
      image: this.mobileList[index].image,
      quantity: 1,
      price: this.mobileList[index].price.value
    };
    cartDetails.product.push(mobile);
    console.log('cart', cartDetails);
    this.cart.addCart(cartDetails)
        .subscribe(result => {
          console.log(result);
          this.router.navigate(['/cart']);
        }),
        error =>  {
          console.log('Error', error);
          this.errorMsg = 'Unable to add mobile into cart. Please try again';
        };
  }

  // Method for PaginationComponent
  getMin(): number {
    return ((this.perPage * this.page) - this.perPage) + 1;
  }

  getMax(): number {
    let max = this.perPage * this.page;
    if (max > this.totalMobileReturned) {
      max = this.totalMobileReturned;
    }
    return max;
  }

  totalPages(): number {
    return Math.ceil(this.totalMobileReturned / this.perPage) || 0;
  }

  lastPage(): boolean {
    return this.perPage * this.page > this.totalMobileReturned;
  }

  getPages(): number[] {
    const c = Math.ceil(this.totalMobileReturned / this.perPage);
    const p = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(p);
    const times = pagesToShow - 1;
    for (let i = 0; i < times; i++) {
      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
        }
      }
      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < c) {
          pages.push(Math.max.apply(null, pages) + 1);
        }
      }
    }
    pages.sort((a, b) => a - b);
    return pages;
  }

  onPrev()  {
    if(this.page > 1)  {
      this.page = this.page-1;
      this.filterResult();
    }
  }

  onPage(pageNumber)  {
    this.page = pageNumber;
    this.filterResult();
  }

  onNext()  {
    if(this.page < Math.ceil(this.totalMobileReturned / this.perPage))  {
      console.log("onNext");
      this.page = this.page+1;
      this.filterResult();
    }

  }
}
