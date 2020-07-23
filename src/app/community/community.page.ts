import { SharedService } from './../services/shared.service';
import { Subscription } from 'rxjs';
import { CommunityService } from './../services/community/community.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Community } from '../model/portalModel/portalModel';

@Component({
  selector: 'app-community',
  templateUrl: './community.page.html',
  styleUrls: ['./community.page.scss'],
})
export class CommunityPage implements OnInit, OnDestroy {
  constructor(private communityService: CommunityService,
    private sharedService: SharedService) { }

  scrollYPosition = 0;

  comSub: Subscription;
  communityList: Community[] = [];

  currentUserSub: Subscription;

  joinedCommunity: any[];


  ngOnInit() {
    this.currentUserSub = this.sharedService.currentUserSubject.subscribe(
      user => {
        this.joinedCommunity = user.community;
        // filter community
        this.comSub = this.communityService.fetchCommunities()
          .subscribe(comm => {
            this.communityList = comm.filter(com => !this.joinedCommunity.includes(com.title.toUpperCase()));
          })
      },
    )
    this.sharedService.fetchUser();
  }

  logScrollStart() { }

  logScrolling(event) {
    this.scrollYPosition = event.detail.scrollTop;
  }

  logScrollEnd() { }


  ngOnDestroy(): void {
    this.comSub.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

  onAddCommunity(community) {
    this.communityService.addCommunity(community)
  }

}
