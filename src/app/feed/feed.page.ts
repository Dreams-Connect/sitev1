import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  constructor() { }

  scrollYPosition = 0;

  ngOnInit() {
  }


  logScrollStart() {

  }

  logScrolling(event) {
    this.scrollYPosition = event.detail.scrollTop;
    console.log(this.scrollYPosition)
  }
  logScrollEnd() {

  }
}
