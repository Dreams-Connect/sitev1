import { Community } from './../model/portalModel/portalModel';
import { PortalService } from './../services/portal/portal.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.page.html',
  styleUrls: ['./updateform.page.scss'],
})
export class UpdateformPage implements OnInit {
  constructor(
    private menu: MenuController,
    private acRoute: ActivatedRoute,
    private navCtrl: NavController,
    private portalService: PortalService
  ) { }

  updateType;

  newUpdate;

  ngOnInit() {


    this.acRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/tabs/home');
        return;
      }
      this.updateType = paramMap.get('id');
    })
  }


  // 
  onSubmit(form) {
    if (this.updateType == 'community') {
      this.portalService.newCommunity(form)
    }
  }
}
