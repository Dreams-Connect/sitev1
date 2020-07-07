import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  _userIsAuthenticated = false;

  login() {

  }


  logout() {

  }

  register(){
    
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated
  }
}
