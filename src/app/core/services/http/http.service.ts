import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private apiUrl = 'https://omipalisf2.herokuapp.com/api/login/usuario';

  constructor(private http: HttpClient) { }

  getUser(_JSON){
    return this.http.post(this.apiUrl, _JSON);
  }
}
