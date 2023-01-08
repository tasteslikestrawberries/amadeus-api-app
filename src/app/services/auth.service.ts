import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
    //this.setToken(environment.ACCESS_TOKEN);
    //this.checkTokenValidity()
  }

  checkTokenValidity() {
    if (this.getTokenExpirationDate() < new Date().getTime()) {
      this.setToken('');
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setTokenExpirationDate(date: string) {
    localStorage.setItem('tokenExpirationDate', date);
  }

  getTokenExpirationDate() {
    return +localStorage.getItem('tokenExpirationDate')!;
  }
}
