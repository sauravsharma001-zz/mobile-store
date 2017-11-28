import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MobileService } from '../../services/mobile.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-mobile-instance',
  templateUrl: './mobile-instance.component.html',
  styleUrls: ['./mobile-instance.component.css']
})
export class MobileInstanceComponent implements OnInit {

  mobileId: string;
  mobileDetails: any;
  errorMsg: any;

  constructor(private mobile: MobileService,
              private cart: CartService,
              private elem: ElementRef,
              private route: ActivatedRoute,
              private router: Router ) {
    this.route.params.subscribe((params: Params) => {

    if (params.mobileId != null && params.mobileId !==  undefined) {
      this.mobileId = params.mobileId;
    }
    else  {
      this.router.navigate(['/mobile']);
    }
  });
  }

  ngOnInit() {
    this.mobile.getMobileOne(this.mobileId)
        .subscribe(result => {
          //console.log(result);
          this.mobileDetails = result;
        }),
        error =>  {
          console.log('Error', error);
          this.errorMsg = error;
        };
  }

  addToCart() {
    let cartDetails = { "product": []};
    var mobile = {
      productId: this.mobileDetails._id,
      name: this.mobileDetails.name,
      brand: this.mobileDetails.brand,
      image: this.mobileDetails.image,
      quantity: 1,
      price: this.mobileDetails.price.value
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
}
