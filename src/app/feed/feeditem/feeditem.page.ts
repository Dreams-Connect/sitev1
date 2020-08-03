import { Post } from './../../model/post';
import { CommunityService } from './../../services/community/community.service';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feeditem',
  templateUrl: './feeditem.page.html',
  styleUrls: ['./feeditem.page.scss'],
})
export class FeeditemPage implements OnInit {
  constructor(
    private acRoute: ActivatedRoute,
    private communityService: CommunityService) { }

  player: videojs.Player; //init player

  communityName;
  postID;

  post: Post;

  ngOnInit() { }

  ionViewWillEnter() {
    // get community name and post id from activated route
    this.acRoute.paramMap.subscribe(maps => {
      if (!maps.has('id')) {
        return;
      }
      this.communityName = maps.get('id:id');
      this.postID = maps.get('id')

      // get post 
      this.communityService.fetchPost(this.communityName).subscribe(
        community => {
          console.log(community)
          this.post = { ...community.posts.filter(post => post.id == this.postID)[0] }
          console.log(this.post)
        }
      )

    })



  }

  onplay() {
    this.player = videojs(document.querySelector('video'), { preload: "auto", controls: false, fill: true })
    this.player.play();
  }
}
