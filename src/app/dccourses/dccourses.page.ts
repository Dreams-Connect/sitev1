import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dccourses',
  templateUrl: './dccourses.page.html',
  styleUrls: ['./dccourses.page.scss'],
})
export class DccoursesPage implements OnInit {
  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'portalMenu')
    this.menu.open('portalMenu')
  }

}
