import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.page.html',
  styleUrls: ['./profilesettings.page.scss'],
})
export class ProfilesettingsPage implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onLogout() {
    this.auth.logout();
  }

}
