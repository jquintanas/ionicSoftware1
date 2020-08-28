import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';

/**
 *
 * @desc guard to prevent the user from accessing login routes already logged into the system and if he tries to be redirected to home
 * @export
 * @class NologinGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})


export class NologinGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private navController: NavController) { }

  canActivate(): boolean {
    if (this.authService.isAuth) {
      this.navController.navigateRoot("/home");
      return false;
    }
    return true;
  }
}


