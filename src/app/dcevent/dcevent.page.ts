import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dcevent',
  templateUrl: './dcevent.page.html',
  styleUrls: ['./dcevent.page.scss'],
})
export class DceventPage implements OnInit {
  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'portalMenu')
    this.menu.open('portalMenu')
  }

}
