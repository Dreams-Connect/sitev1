import { SharedService } from './../services/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import { Subscription } from 'rxjs';
import { Post, likesCounter } from '../model/post';
import { PostService } from '../services/community/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit, OnDestroy {
  constructor(private postService: PostService,
    private sharedService: SharedService
  ) { }

  scrollYPosition = 0;
  scrollObserver: IntersectionObserver;
  player: videojs.Player; //init player

  // slide options
  slideOpts = {
    speed: 400
  };

  // user feeds
  userFeedsSub: Subscription;
  feedList: any[] = [];
  filteredFeed: Post[] = [];

  currentUserSub: Subscription;
  userCommunities: any[] = [];

  likesCounterSub: Subscription;
  likes: likesCounter[] = [];

  ngOnInit() {
    // fetch likes
    this.likesCounterSub = this.postService.fetchPostLikes().subscribe(likes => {
      this.likes = likes;
      console.log(this.likes)
    })
    // get community feed
    this.sharedService.fetchUser();
    // get user communities
    this.currentUserSub = this.sharedService.currentUserSubject.subscribe(user => {
      this.userCommunities = user.community
    })

    // get community feed
    this.userFeedsSub = this.postService.fetchUserFeeds().subscribe(
      communities => {
        communities.filter(community => {
          this.feedList.push(community)
        })

        // filter list
        this.feedList = this.feedList.filter(feed => {
          feed.posts.filter(item => {
            this.userCommunities.includes(item.community) === true ? this.filteredFeed.push(item) : ''
          })
        })
      }
    )


    /// auto play video on interception
    this.scrollObserver = new IntersectionObserver(entries => {
      this.player = videojs(entries[0].target, { preload: "auto", controls: false, fill: true })
      if (entries[0].isIntersecting) {
        this.player.play();
      }
      else {
        this.player.pause();
      }
    }, {
      threshold: 1
    });

    // get players
    const players = document.querySelectorAll('video');
    for (let i = 0; i < players.length; i++) {
      this.scrollObserver.observe(players[i])
    }
  }


  logScrollStart() { }

  logScrolling(event) {
    this.scrollYPosition = event.detail.scrollTop;
    console.log(this.scrollYPosition)
  }

  logScrollEnd() { }

  play() {
    this.player.play();
  }


  onLike(postid) {
    this.postService.onPostLike(postid)
  }

  fetch

  ngOnDestroy(): void {
    this.likesCounterSub.unsubscribe();
  }

}
