import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderHistoryService } from '../../services/order.history.service';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistory: Array<any>;
  errorMsg: any;

  constructor(private order: OrderHistoryService,
              private elem: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private mobile: MobileService) { }

  ngOnInit() {
    this.order.getOrderAll()
        .subscribe(result => {
          if(result.length > 0)
            this.orderHistory = result;
        }),
        error =>  {
          this.errorMsg = error;
    }
  }

}
