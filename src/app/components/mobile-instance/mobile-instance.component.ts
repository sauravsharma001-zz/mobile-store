import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-mobile-instance',
  templateUrl: './mobile-instance.component.html',
  styleUrls: ['./mobile-instance.component.css'],
  animations: [
    trigger('someCoolAnimation', [
      transition('* => fadeIn', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => fadeOut', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MobileInstanceComponent implements OnInit {

  mobileId: string;
  mobileDetails: any;
  errorMsg: any;

  constructor(private mobile: MobileService,
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
          console.log(result);
          this.mobileDetails = result;
        }),
        error =>  {
          console.log('Error', error);
          this.errorMsg = error;
        };
  }

  addToCart() {
    console.log('addToCart');
  }
}
