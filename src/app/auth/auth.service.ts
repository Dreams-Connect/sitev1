import { async } from '@angular/core/testing';
import { User, currentUser } from './../model/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.userCollection = afs.collection<User>('users');

    // check user login status
    localStorage.getItem('dcUser') != null ? this._userIsAuthenticated = true : this._userIsAuthenticated = false;
    this.authenticationSubJect.next(this._userIsAuthenticated)


  }

  private userCollection: AngularFirestoreCollection<User>;
  _userIsAuthenticated = false;
  currentUser: currentUser;
  userUID;
  authenticationSubJect = new Subject();
  currentUserSubject = new Subject<currentUser>();

  // spinner
  spinner = this.loadingController.create({ keyboardClose: true, message: 'One sec' })

  async login_With_Email_Password(email, password) {
    (await this.spinner).present();
    this.auth.signInWithEmailAndPassword(email, password).then(
      resp => {
        this._userIsAuthenticated = true;
        // save to localStorage
        localStorage.setItem('dcUser', JSON.stringify(resp.user.providerData))
        // user login occured
        this.authenticationSubJect.next(this._userIsAuthenticated)
        // get user UID
        this.userUID = resp.user.uid;
        localStorage.setItem('dcUserUID', this.userUID);

        // redirect user based on type LEARN | CONTENT PROVIDER | EMPLOYER
        this.fetch_route_User();
        // loading spinner 
        this.spinner.then(dismiss => {
          dismiss.dismiss()
        })
      }
    ).catch(async err => {
      (await this.spinner).dismiss();
      this.alertModal("We cannot find your login credentials", "Please provide a valid login credentials");
    })
  }

  // alert modal
  async alertModal(subHeader, message) {
    // user not found 
    const alert = this.alertController.create({
      cssClass: 'modal-css',
      subHeader: subHeader,
      message: message,
      buttons: ['Retry']
    });
    (await alert).present()
  }


  logout() {
    this.auth.signOut();
    // save to localStorage
    localStorage.removeItem('dcUser')
    localStorage.removeItem('dcUserUID')
    this._userIsAuthenticated = false;
    this.authenticationSubJect.next(this._userIsAuthenticated)
    this.currentUserSubject.next(this.currentUser)
  }

  async register_With_Email_Password(user: User) {
    (await this.spinner).present();
    const newUser = JSON.parse(JSON.stringify(user))

    this.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then(
      resp => {

        // get user UID
        this.userUID = resp.user.uid;
        localStorage.setItem('dcUserUID', this.userUID)
        // add user details to database
        this.userCollection.doc(resp.user.uid).set(newUser).then(async res => {
          this._userIsAuthenticated = true;
          this.authenticationSubJect.next(this._userIsAuthenticated)
          // redirect user based on type LEARN | CONTENT PROVIDER | EMPLOYER
          if (user.usertype === "LEARN") { // redesign this to be api driven
            this.router.navigateByUrl('/feed')
          }
          if (user.usertype === "CONTENT PROVIDER") {
            this.router.navigateByUrl('/cp')
          }
          if (user.usertype === "EMPLOYER") {
            this.router.navigateByUrl('/employer')
          }
          // save to localStorage
          localStorage.setItem('dcUser', JSON.stringify(resp.user.providerData))
          // dismiss spinner
          this.spinner.then(dismiss => {
            dismiss.dismiss()
          })
        })
      }
    ).catch(err => {
      this.alertModal("Error", err)
      // dismiss spinner
      this.spinner.then(dismiss => {
        dismiss.dismiss()
      })
    })
  }

  getUserIsAuthenticated() {
    this.authenticationSubJect.next(this._userIsAuthenticated)
  }

  // fetch user details by UID
  fetchCurrentUser() {
    this.userUID = localStorage.getItem('dcUserUID')
    // UID cannot be null
    if (this.userUID != null) {
      this.afs.doc<User>(`users/${this.userUID}`).valueChanges().subscribe(user => {
        // build the user
        this.currentUser = new currentUser(
          user.firstname,
          user.lastname,
          user.phone,
          user.email,
          user.usertype,
          user.community,
          user.companyname,
          user.vision)
        this.currentUserSubject.next(this.currentUser);
      })
    }
  }

  // login route
  fetch_route_User() {
    this.userUID = localStorage.getItem('dcUserUID')
    // UID cannot be null
    if (this.userUID != null) {
      this.afs.doc<User>(`users/${this.userUID}`).valueChanges().subscribe(user => {
        // build the user
        this.currentUser = new currentUser(
          user.firstname,
          user.lastname,
          user.phone,
          user.email,
          user.usertype,
          user.community,
          user.companyname,
          user.vision)
        this.currentUserSubject.next(this.currentUser);

        // routes
        if (this.currentUser.usertype === "LEARN") { // redesign this to be api driven
          this.router.navigateByUrl('/feed')
        }
        if (this.currentUser.usertype === "CONTENT PROVIDER") {
          this.router.navigateByUrl('/cp')
        }
        if (this.currentUser.usertype === "EMPLOYER") {
          this.router.navigateByUrl('/employer')
        }
      })
    }
  }

  getCurrentUser() {
    this.currentUserSubject.next(this.currentUser);
  }
}
