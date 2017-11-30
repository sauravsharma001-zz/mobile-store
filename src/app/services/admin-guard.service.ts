import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (sessionStorage.getItem('userProfile')) {
      const userProfile = JSON.parse(sessionStorage.getItem('userProfile'));
      if(userProfile.profile === 'admin')
        return true;
      else
        return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
