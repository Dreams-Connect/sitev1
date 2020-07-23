import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  constructor() { }

  scrollYPosition = 0;
  scrollObserver: IntersectionObserver;
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

  ngOnInit() {
    /// auto play video on interception
    this.scrollObserver = new IntersectionObserver(entries => {
      this.player = videojs(entries[0].target, {
        sources: [{
          type: 'video/mp4'
        }],
        preload: "auto", controls: false, fill: true,
      })
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
  }

  logScrollEnd() { }

  play() {
    this.player.play();
  }



 async segmentChanged(ev) {
    await this.selectedSlide.slideTo(this.segment)
  }

 async slidesChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex =>{
      this.segment = selectedIndex
    })
  }


}
