import { SharedService } from './../services/shared.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import videojs from 'video.js';
import { Subscription } from 'rxjs';
import { Post, likesCounter, FeedPost } from '../model/post';
import { PostService } from '../services/community/post.service';
import { take } from 'rxjs/operators';

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

  userUID: any;

  // user feeds
  userFeedsSub: Subscription;
  feedList: any[] = [];
  filteredFeed: FeedPost[] = [];

  currentUserSub: Subscription;
  userCommunities: any[] = [];

  likesSub: Subscription;
  commentSub: Subscription;

  ngOnInit() {
    // get user uid
    this.userUID = localStorage.getItem('dcUserUID')
    // get community feed
    this.sharedService.fetchUser();
    // get user communities
    this.currentUserSub = this.sharedService.currentUserSubject.subscribe(user => {
      this.userCommunities = user.community
    })
    // get community feed
    this.userFeedsSub = this.postService.fetchUserFeeds()
      .pipe(take(1))
      .subscribe(
        communities => {
          communities.filter(community => {
            //  console.log(communities)
            this.feedList.push(community.posts)
            //  console.log(this.feedList)
          })

          // filter list
          this.feedList = this.feedList.filter(feed => {
            feed.filter(item => {
              // this.userCommunities.includes(item.community) === true ? this.filteredFeed.push(item) : '';
              if (this.userCommunities.includes(item.community)) {
                this.filteredFeed.push(item)
              }
            })

            // append likes and comments
            this.filteredFeed.map(feed => {
              if (this.postService.getPost(feed.id)[0] != undefined) {
                feed.likes = this.postService.getPost(feed.id)[0]
                //  console.log(feed.likes.likes)
              }
            })
          })

          // sort list by post time
          this.filteredFeed.sort((a, b) => {
            return b.createdAt - a.createdAt
          });
        }
      )

    // append likes
    this.likesSub = this.postService.onLikesChanges().subscribe(changes => {
      this.filteredFeed.map(feed => {
        if (this.postService.getPost(feed.id)[0] != undefined) {
          feed.likes = this.postService.getPost(feed.id)[0]
          // console.log(feed.likes.likes)
        }
      })
    });

    // append comment counter
    this.commentSub = this.postService.onCommentChanges().subscribe(changes => {
      this.filteredFeed.map(feed => {
        this.postService.getCommentCount(feed.id).subscribe(
          comment => {
            if (comment != undefined && comment.comments.length != undefined) {
              feed.comments = comment.comments.length
            }
          }
        )
      })
    });


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
    //console.log(this.scrollYPosition)
  }

  logScrollEnd() { }

  play() {
    this.player.play();
  }

  onLike(postid) {
    this.postService.onPostLike(postid)
  }

  ngOnDestroy(): void {
    this.likesSub.unsubscribe();
    this.commentSub.unsubscribe();
    this.scrollObserver.disconnect();
    this.userFeedsSub.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

}
