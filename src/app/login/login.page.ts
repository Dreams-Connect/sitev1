import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  formIsFocused = false;

  onSubmit(event) {
    this.authService.login_With_Email_Password(event.value.email,
      event.value.password)
  }

  // onFocus() {
  //   this.formIsFocused = true;
  // }

  // onMouseLeave() {
  //   this.formIsFocused = false;
  // }
}
