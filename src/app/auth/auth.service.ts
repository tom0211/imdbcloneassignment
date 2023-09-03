import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SESSION_LOGIN_CHECKER = 'userLoggedIn';
  private readonly SESSION_USER_ID = 'userId';

  login(userid: string) {
    sessionStorage.setItem(this.SESSION_LOGIN_CHECKER, 'true');
    sessionStorage.setItem(this.SESSION_USER_ID, userid)
  }

  logout() {
    sessionStorage.removeItem(this.SESSION_LOGIN_CHECKER);
    sessionStorage.removeItem(this.SESSION_USER_ID);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.SESSION_LOGIN_CHECKER) === 'true';
  }
}
