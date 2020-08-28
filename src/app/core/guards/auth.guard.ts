import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';


/**
 *
 * @desc guard to control access to routes that require a login in the system previously and if you do not have it redirects to the login system
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private navController: NavController
  ) { }

  canActivate(): boolean {
    if (this.authService.isAuth) {
      return true;
    }
    this.navController.navigateRoot("/login");
    return false;
  }
}
