import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public auth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.userCollection = afs.collection('users');
  }

  private userCollection;
  _userIsAuthenticated = false;


  login_With_Email_Password(user: User) {
    this.auth.signInWithEmailAndPassword(user.email, user.password)
  }


  logout() {
    this.auth.signOut();
  }

  register_With_Email_Password(user: User) {
    console.log(typeof(user))
    this.userCollection.add(user).then(res => {
      this._userIsAuthenticated = true;
      // redirect to home
      this.router.navigateByUrl('/feed')
    })
    // this.auth.createUserWithEmailAndPassword(user.email, user.password).then(
    //   resp => {
    //     // add user details to database
        
    //   }
    // )
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated
  }
}
