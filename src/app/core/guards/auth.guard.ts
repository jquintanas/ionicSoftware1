import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';


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
