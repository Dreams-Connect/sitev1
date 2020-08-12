import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { currentUser } from '../model/user';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.page.html',
  styleUrls: ['./profilesettings.page.scss'],
})
export class ProfilesettingsPage implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
    private sharedService: SharedService
  ) { }

  userSub: Subscription;
  user: currentUser = {
    community: [],
    companyname: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    photoURL: "",
    usertype: "",
    vision: "",
  };

  ngOnInit() {
    this.userSub = this.sharedService.currentUserSubject.subscribe(user => {
      this.user = user
      console.log(this.user)
    })
  }

  ionViewWillEnter() { }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
