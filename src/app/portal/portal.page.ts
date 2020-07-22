import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PortalService } from './services/portal.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.page.html',
  styleUrls: ['./portal.page.scss'],
})
export class PortalPage implements OnInit {
  constructor(
    private menu: MenuController,
    private portal: PortalService,) { }

  // admin authenticated
  isAdminAuthenticated;
  private adminSub: Subscription;

  ngOnInit() {
    // get admin authentication
    this.adminSub = this.portal.authenticationSubJect.subscribe(adminAuth => {
      this.isAdminAuthenticated = adminAuth;
    })

    this.portal.getUserIsAuthenticated();
  }

  ngOnDestroy() {
    this.adminSub.unsubscribe();
  }

  onAdminLogout() {
    this.portal.logout();
  }
}
