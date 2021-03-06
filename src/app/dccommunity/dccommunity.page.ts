import { Subscription } from 'rxjs';
import { Community } from './../model/portalModel/portalModel';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PortalService } from '../services/portal/portal.service';

@Component({
  selector: 'app-dccommunity',
  templateUrl: './dccommunity.page.html',
  styleUrls: ['./dccommunity.page.scss'],
})
export class DccommunityPage implements OnInit, OnDestroy {
  constructor(private menu: MenuController, private portalService: PortalService) { }


  communitList: Community[] = [];
  communitySub: Subscription;
  ngOnInit() {
 
    // get community list
    this.communitySub = this.portalService.fetchCommunity().subscribe(
      communities => {
        this.communitList = communities;
      })
  }


  // crud
  onUpdate(community) {

  }

  onDelete(community: Community) {
    this.portalService.delete(community.id, 'community')
  }
  ngOnDestroy() {
    this.communitySub.unsubscribe();
  }
}
