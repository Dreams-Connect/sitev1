import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-feeditem',
  templateUrl: './feeditem.page.html',
  styleUrls: ['./feeditem.page.scss'],
})
export class FeeditemPage implements OnInit {
  constructor() { }

  player: videojs.Player; //init player
  ngOnInit() {
  }


  onplay() {
    this.player = videojs(document.querySelector('video'), { preload: "auto", controls: false, fill: true })
    this.player.play();
  }
}
