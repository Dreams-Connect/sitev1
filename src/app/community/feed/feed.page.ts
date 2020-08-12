import { CommunityService } from './../../services/community/community.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import videojs from 'video.js';
import { IonSlides, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedPost } from 'src/app/model/post';
import { PostService } from 'src/app/services/community/post.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActionSheetController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef, private acRoute: ActivatedRoute,
    private navCtrl: NavController,
    private communityService: CommunityService,
    private postService: PostService,
    private sharedService: SharedService,
    private actionSheetController: ActionSheetController,
    private router: Router
  ) { }

  communityName;

  scrollYPosition = 0;
  scrollObserver: IntersectionObserver;

  @ViewChildren('player') videoPlayers: QueryList<any>;
  player: videojs.Player; //init player

  // slide options
  slideOpts = {
    speed: 400
  };

  sliderOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
  }

  selectedSlide: any;

  segment = 0;

  filteredFeed: FeedPost[] = []
  communityFeedSub: Subscription;

  userUID;
  likesSub: Subscription;
  commentSub: Subscription;
  currentUserSub: Subscription;

  userPhoto;

  userCommunities: any[];
  actionSheetCommunities: any[] = [
    {
      text: 'Close',
      icon: 'close',
      role: 'cancel',
    }
  ];

  ngOnInit() {

    this.sharedService.fetchUser();
    // get user 
    this.currentUserSub = this.sharedService.currentUserSubject.pipe(take(1)).subscribe(user => {
      this.userPhoto = user.photoURL;
      this.userCommunities = user.community;
      console.log(this.userCommunities)
      // create community action sheet
      this.userCommunities.map(com => {
        // build button
        let button = {
          text: com,
          handler: () => {
            this.router.navigateByUrl(`dc/community/feed/${com}`)
          }
        }
        this.actionSheetCommunities.push(button)
      })
    })

    this.userUID = localStorage.getItem('dcUserUID')
    // get community name from route
    this.acRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.back;
        return;
      }
      this.communityName = paramMap.get('id')
      // console.log(this.communityName)
    });

    // fetch community feed
    this.communityFeedSub = this.communityService.fetchCommunityFeed(this.communityName).subscribe(
      post => {
        if (post != undefined) {
          this.filteredFeed = post.posts;

          // sort list by post time
          this.filteredFeed.sort((a, b) => {
            return b.createdAt - a.createdAt
          });

          // append likes 
          this.filteredFeed.map(feed => {
            if (this.postService.getPost(feed.id)[0] != undefined) {
              feed.likes = this.postService.getPost(feed.id)[0]
              //  console.log(feed.likes.likes)
            }
          })
        }
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
    })

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
  }

  // drop quick community navigate
  async presentUserCommunites() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Your Communities',
      animated: true,

      buttons: this.actionSheetCommunities
    });
    await actionSheet.present();
  }

  logScrollStart() { }

  logScrolling(event) {
    this.scrollYPosition = event.detail.scrollTop;
  }

  logScrollEnd() { }

  onPlay(player) {
    // const play: videojs.Player = player; //init player

    // this.player = videojs(player, {
    //   sources: [{
    //     type: 'video/mp4'
    //   }],
    //   preload: "auto", controls: false, fill: true,
    // })
    this.player.play();
  }

  async segmentChanged(ev) {
    await this.selectedSlide.slideTo(this.segment)
  }

  async slidesChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex => {
      this.segment = selectedIndex
    })
  }

  showMedia() {
    /// auto play video on interception
    this.scrollObserver = new IntersectionObserver(entries => {
      const player: videojs.Player = entries[0].target; //init player

      this.player = videojs(player, {
        sources: [{
          type: 'video/mp4'
        }],
        preload: "auto", controls: false, fill: true,
      })

      if (entries[0].isIntersecting) {
        this.player.play();
        player.play()
      }
      else {
        this.player.pause();
      }
    }, {
      threshold: 1
    });

    // get players
    const players = document.querySelectorAll('video');

    // for (let i = 0; i < players.length; i++) {
    //   this.scrollObserver.observe(players[i])
    // }

    this.videoPlayers.forEach(player => {
      this.scrollObserver.observe(player.nativeElement)
    })

  }

  play() {
    this.player.play();
  }

  onLike(postid) {
    this.postService.onPostLike(postid)
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
    this.communityFeedSub.unsubscribe();
    this.likesSub.unsubscribe();
    this.commentSub.unsubscribe();
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
