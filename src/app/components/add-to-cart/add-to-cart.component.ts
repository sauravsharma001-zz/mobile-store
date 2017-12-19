import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderHistoryService } from '../../services/order.history.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  errorMsg: any;
  cartId: any;
  cartDetails: any;
  productList: any;
  notLoggedIn: any = false;

  constructor(private user: AuthenticationService,
              private cart: CartService,
              private order: OrderHistoryService,
              private elem: ElementRef,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
     this.route.queryParams.subscribe((params: Params) => {
          this.fetchCart();
     });
  }

  removeProduct(productIndex) {
    this.cartDetails.product.splice(productIndex, 1);
    this.updateCart();
  }

  fetchCart() {
      this.cart.cartGetAll()
          .subscribe(result => {
              this.cartDetails = result;
              this.cartId = result._id;
          }),
          error =>  {
            this.errorMsg = error;
      }
  }

  updateCart() {
    let amt = 0;
      for(let i =0; i <this.cartDetails.product.length; i++)  {
        amt += this.cartDetails.product[i].quantity * this.cartDetails.product[i].price;
      }
      this.cartDetails.totalPrice = amt;
    this.cart.updateCart(this.cartId, this.cartDetails)
      .subscribe(result => {
          console.log("Cart Updated");
        },
        error => {
          console.log("error", error);
        });
  }

  clearCart() {
    console.log('cartid', this.cartId);
    this.cartDetails = null;
    this.cart.deleteCart(this.cartId)
      .subscribe(result => {
          console.log("Cart Deleted");
        },
        error => {
          console.log("error", error);
        });
  }

  checkout()  {
    var params = true;
    if(sessionStorage.getItem('currentUser'))  {
      this.notLoggedIn = false;
      this.order.addOrderHistory(this.cartDetails)
      .subscribe(result => {
          console.log("Added to Order History");
          this.router.navigate(['/cart/checkout']);
        },
        error => {
          console.log("error", error);
          this.errorMsg = JSON.parse(error).message;
        });

    }
    else  {
      this.notLoggedIn = true;
    }
  }
}
