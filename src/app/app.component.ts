import { PortalService } from './portal/services/portal.service';
import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { currentUser } from './model/user';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  platformIsReady = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authServices: AuthService,
    private portal: PortalService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platformIsReady = true
    });
  }


  // user authenticated
  isAuthenticated;
  currentUser: currentUser;
  userType;

  // subscriptions
  private authenticationSub: Subscription;
  private currentUserSub: Subscription

  ngOnInit() {
    this.authenticationSub = this.authServices.authenticationSubJect.subscribe(auth => {
      this.isAuthenticated = auth;
    })
    this.authServices.getUserIsAuthenticated();
    this.currentUserSub = this.authServices.currentUserSubject.subscribe(user => {
      this.currentUser = user;
      this.userType = this.currentUser.usertype
    })
    this.authServices.fetchCurrentUser();
    // this.authServices.getCurrentUser();
  }

  logout() {
    this.authServices.logout();
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe()
    this.authenticationSub.unsubscribe();
  }

}
