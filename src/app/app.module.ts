import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { MobileComponent } from './components/mobile/mobile.component';
import { AddmobileComponent } from './components/addmobile/addmobile.component';
import { MobileInstanceComponent } from './components/mobile-instance/mobile-instance.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { MobileService } from './services/mobile.service';
import { CartService } from './services/cart.service';
import { OrderHistoryService } from './services/order.history.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AboutComponent,
    MobileComponent,
    AddmobileComponent,
    MobileInstanceComponent,
    OrderHistoryComponent,
    AddToCartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'user/orders',
        component: OrderHistoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'user/orders/:orderId',
        component: OrderHistoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'cart',
        component: AddToCartComponent
      },
      {
        path: 'cart/checkout',
        component: CheckoutComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'mobile',
        component: MobileComponent
      },
      {
        path: 'mobile/add',
        component: AddmobileComponent,
        canActivate: [AdminGuardService]
      },
      {
        path: 'mobile/:mobileId',
        component: MobileInstanceComponent
      },
      {
        path: 'mobile/:mobileId/edit',
        component: AddmobileComponent,
        canActivate: [AdminGuardService]
      }
    ])
  ],
  providers: [  AuthenticationService, AuthGuardService, AdminGuardService, MobileService, CartService, OrderHistoryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
