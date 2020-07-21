import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';

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


  ngOnInit() {
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
  }

  logScrollEnd() { }

  play() {
    this.player.play();
  }
}
