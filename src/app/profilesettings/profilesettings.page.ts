import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { currentUser } from '../model/user';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.page.html',
  styleUrls: ['./profilesettings.page.scss'],
})
export class ProfilesettingsPage implements OnInit, OnDestroy {

  constructor(private auth: AuthService,
    private sharedService: SharedService,
    private ngZone: NgZone
  ) { }

  uploadPercentage;
  percentageSubscription: Subscription;

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
    this.sharedService.fetchUser();
    this.userSub = this.sharedService.currentUserSubject.subscribe(user => {
      this.user = user;
    });

    this.percentageSubscription = this.sharedService.downloadPercentageSubject.subscribe(percent => {
      this.uploadPercentage = percent;
      this.uploadPercentage = this.uploadPercentage / 100;
    })
  }

  ionViewWillEnter() { }

  onLogout() {
    this.auth.logout();
  }

  onPhotoChange(event) {
    this.sharedService.uploadPhoto(event)
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.percentageSubscription.unsubscribe();
  }
}
