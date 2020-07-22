import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dcpodcast',
  templateUrl: './dcpodcast.page.html',
  styleUrls: ['./dcpodcast.page.scss'],
})
export class DcpodcastPage implements OnInit {
  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'portalMenu')
    this.menu.open('portalMenu')
  }
}
