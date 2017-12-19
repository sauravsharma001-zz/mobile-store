import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-addmobile',
  templateUrl: './addmobile.component.html',
  styleUrls: ['./addmobile.component.css']
})
export class AddmobileComponent implements OnInit {

  mobileAdded: boolean = false;
  mobileUpdated: boolean = false;
  newMobile: any;
  errorMsg: any;
  editPage: boolean = false;
  osVersion: any;

  constructor(private mobile: MobileService,
              private elem: ElementRef,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(!this.router.url.includes('edit')) {
      this.newMobile = {};
      this.newMobile.camera = {};
      this.newMobile.camera.secondary = {};
      this.newMobile.camera.primary = {};
      this.newMobile.display = {};
      this.newMobile.memory = {};
      this.newMobile.battery = {};
      this.newMobile.price = {};
    }
    else  {
      let mobileId =  this.router.url.substring( this.router.url.indexOf('mobile')+7,  this.router.url.length-5);
      this.editPage = true;
      this.mobile.getMobileOne(mobileId)
          .subscribe(result => {
            this.newMobile = result;
            this.osVersion = this.newMobile.os.split(' ')[1];
            this.newMobile.os = this.newMobile.os.split(' ')[0];
            this.newMobile.camera.primary = result.camera.primary[0];
          }),
          error =>  {
            console.log('Error', error);
            this.errorMsg = error;
          };
    }
  }

  addMobile(event)  {
    event.preventDefault();
    let files = this.elem.nativeElement.querySelector("#mobileImage").files;
    let formData = new FormData();
    let file = files[0];
    let primaryCamera = {};
    primaryCamera = this.newMobile.camera.primary;
    this.newMobile.os = this.newMobile.os + " " + this.osVersion;
    this.newMobile.camera.primary = [];
    this.newMobile.camera.primary.push(primaryCamera);
    formData.append('mobileImage', file, this.newMobile.name + ".jpg");
    formData.append("mobile", JSON.stringify(this.newMobile));
    if(!this.editPage)  {
      this.mobile.addMobile(formData)
        .subscribe(result => {
            console.log("result", result);
            this.mobileAdded = true;
          },
          error => {
            console.log("error", error);
          });
    }
    else  {
      this.mobile.updateMobile(this.newMobile._id, formData)
        .subscribe(result => {
            console.log("Mobile Updated");
            this.mobileUpdated = true;
          },
          error => {
            console.log("error", error);
          });
    }
   }

}
