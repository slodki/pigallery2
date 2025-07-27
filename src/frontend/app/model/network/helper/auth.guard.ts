import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {NavigationService} from '../../navigation.service';

@Injectable({providedIn: 'root'})
export class AuthGuard  {
  constructor(
      private authenticationService: AuthenticationService,
      private navigationService: NavigationService
  ) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
    if (this.authenticationService.isAuthenticated() === true) {
      return true;
    }

    this.navigationService.toLogin().catch(console.error);
    return false;
  }
}
