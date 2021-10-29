import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuard implements CanActivate {

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {

    let user = this.authService.currentUser;
    console.log(user);

    if (user && user.groups && user.groups.includes('CN=GR-ANGULAR-APP-ACCESS,CN=Users,DC=mitch,DC=local')) {
      return true;
    }
    this.router.navigate(['/no-access']);
    return false;
  }

  constructor(private router : Router, private authService : AuthService) { }
}
