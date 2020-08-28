import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpClient, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';


/**
 *
 * @desc Add authorization header and their respective tokens to all http requests and if you need to update the token, generate the refresh of it
 * @export
 * @class TokenInterceptorService
 * @implements {HttpInterceptor}
 */
@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urls: string = "https://omipalisf2.herokuapp.com/api/login/token";
    if (req.url.search(urls) === -1) {
      if (this.authService.token) {
        req = this.addToken(req, this.authService.token.token);
      }
      return next.handle(req).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      }));
    }
    return next.handle(req);
  }

  /**
   *
   * @desc add the token to the request
   * @private
   * @param {HttpRequest<any>} request
   * @param {string} token
   * @returns
   * @memberof TokenInterceptorService
   */
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   *
   * @desc refresh the token when it expires
   * @private
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns
   * @memberof TokenInterceptorService
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.authService.token.token = token.access_token;
          this.authService.token.refreshToken = token.newRefreshToken;
          this.refreshTokenSubject.next(token.access_token);
          return next.handle(this.addToken(request, token.access_token));
        }));
      // tslint:disable-next-line: unnecessary-else
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

}
