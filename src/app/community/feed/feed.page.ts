import { CommunityService } from './../../services/community/community.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import videojs from 'video.js';
import { IonSlides, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FeedPost } from 'src/app/model/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit, OnDestroy {
  constructor(private elementRef: ElementRef, private acRoute: ActivatedRoute,
    private navCtrl: NavController,
    private communityService: CommunityService
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

  ngOnInit() {
    // get community name from route
    this.acRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.back;
        return;
      }
      this.communityName = paramMap.get('id')
      console.log(this.communityName)
    });


  }

  ionViewWillEnter() {
    // fetch community feed
    this.communityFeedSub = this.communityService.fetchCommunityFeed('TECHNOLOGY').subscribe(feeds => {
      this.filteredFeed = feeds;
      console.log(feeds)
      console.log(this.communityName)
    })
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



  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
