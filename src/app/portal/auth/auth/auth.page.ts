import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private portalAuth: PortalService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.menu.enable(false, 'userMenu')
  }

  onSubmit(form) {
    console.log(form.email, form.password)
    this.portalAuth.login_With_Email_Password(form.email, form.password)
  }
}
