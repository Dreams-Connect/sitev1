import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { adminUser, currentAdmin } from 'src/app/model/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class PortalService {
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    // check user login status
    localStorage.getItem('dcAdmin') != null ? this._adminIsAuthenticated = true : this._adminIsAuthenticated = false;
    this.authenticationSubJect.next(this._adminIsAuthenticated)
  }


  _adminIsAuthenticated = false;

  dcAdminUID;

  authenticationSubJect = new Subject();
  currentAdminSubject = new Subject<currentAdmin>();
  currentAdmin: currentAdmin;
  // spinner
  spinner = this.loadingController.create({ keyboardClose: true, message: 'One sec' })

  // login with email and password
  async login_With_Email_Password(email, password) {
    (await this.spinner).present();
    this.auth.signInWithEmailAndPassword(email, password).then(
      resp => {
        this._adminIsAuthenticated = true;
        // save to localStorage
        localStorage.setItem('dcAdmin', JSON.stringify(resp.user.providerData))
        // user login occured
        this.authenticationSubJect.next(this._adminIsAuthenticated)
        // get user UID
        this.dcAdminUID = resp.user.uid;
        localStorage.setItem('dcAdminUID', this.dcAdminUID);
        // redirect admin to portal
        this.router.navigateByUrl('/portal')
        // loading spinner 
        this.spinner.then(dismiss => {
          dismiss.dismiss()
        })
      }
    ).catch(async err => {
      (await this.spinner).dismiss();
      this.alertModal("We cannot find your login credentials", err);
    })
  }

  // logout
  logout() {
    this.auth.signOut();
    // save to localStorage
    localStorage.removeItem('dcAdmin')
    localStorage.removeItem('dcAdminUID')
    this._adminIsAuthenticated = false;
    this.authenticationSubJect.next(this._adminIsAuthenticated)
    this.currentAdminSubject.next(this.currentAdmin)
    this.router.navigateByUrl('/')
  }

  // register with email and password
  async register_With_Email_Password(adminUser: adminUser) {
    (await this.spinner).present();
    const newAdmin = JSON.parse(JSON.stringify(adminUser))

    this.auth.createUserWithEmailAndPassword(adminUser.email, adminUser.password).then(
      resp => {
        // get user UID
        this.dcAdminUID = resp.user.uid;
        localStorage.setItem('dcAdminUID', this.dcAdminUID)
        // add user details to database
        this.afs.collection('admin').doc(resp.user.uid).set(newAdmin).then(
          async res => {
            this._adminIsAuthenticated = true;
            this.authenticationSubJect.next(this._adminIsAuthenticated)
            // redirect to content management
            this.router.navigateByUrl('/portal')
            // save admin details to localStorage
            localStorage.setItem('dcAdmin', JSON.stringify(resp.user.providerData))
            // dismiss spinner
            this.spinner.then(dismiss => {
              dismiss.dismiss()
            })
          }).catch(err => {
            this.alertModal("Error", err)
            // dismiss spinner
            this.spinner.then(dismiss => {
              dismiss.dismiss()
            })
          })
      }
    )
  }

  getUserIsAuthenticated() {
    this.authenticationSubJect.next(this._adminIsAuthenticated)
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

  // fetch user details by UID
  fetchCurrentUser() {
    this.dcAdminUID = localStorage.getItem('dcUserUID')
    // UID cannot be null
    if (this.dcAdminUID != null) {
      this.afs.doc<adminUser>(`admin/${this.dcAdminUID}`).valueChanges().subscribe(admin => {
        // build the user
        this.currentAdmin = new currentAdmin(
          admin.firstname,
          admin.lastname,
          admin.phone,
          admin.email,
          admin.permissions
        )
        this.currentAdminSubject.next(this.currentAdmin);
      })
    }
  }

  getCurrentAdmin() {
    this.currentAdminSubject.next(this.currentAdmin);
  }
}
