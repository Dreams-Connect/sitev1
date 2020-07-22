import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.page.html',
  styleUrls: ['./portal.page.scss'],
})
export class PortalPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'portalMenu')
    this.menu.open('portalMenu')
  }

}
