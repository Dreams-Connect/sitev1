import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dcbooks',
  templateUrl: './dcbooks.page.html',
  styleUrls: ['./dcbooks.page.scss'],
})
export class DcbooksPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'portalMenu')
    this.menu.open('portalMenu')
  }
}
