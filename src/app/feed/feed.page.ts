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
  scrollObserver: IntersectionObserver
  ngOnInit() {
    /// auto play video on interception
    this.scrollObserver = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        console.log(entries[0])
      }
      else {
        console.log(entries[0])
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


  logScrollStart() {

  }

  logScrolling(event) {
    this.scrollYPosition = event.detail.scrollTop;
  }

  logScrollEnd() { }
}
