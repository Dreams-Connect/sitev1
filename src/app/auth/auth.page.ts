import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor() { }
  forms = {
    'personalInformation': false,
    'loginInformation': false,
    'personaInformation': true,
  }

  pCategoryIsSelected = '';
  
  categoryList = [
    {
      title: 'LEARN',
      description: `You're a student, graduate
      or someone looking to acquire
      a skill, learn something or stay
      up to date with trends in your
      field of interest.`
    },
    {
      title: 'CONTENT PROVIDER',
      description: ` You're an educator, content writer, or a professional
      in a certain field looking to share wisdom, enlighten
      others or share your work with world.`
    },
    {
      title: 'EMPLOYER',
      description: ` We guess your role is pretty straight
      forward. Just get to it and employ new folks.`
    }
  ]

  ngOnInit() {
  }

  onSubmit(form, fname) {
    let keys = Object.keys(this.forms)
    var nextFormKey = keys.indexOf(fname) + 1;
    // hide all form
    Object.keys(this.forms).map(key => this.forms[fname] != key ? this.forms[key] = false : '')
    // show next form
    this.forms[keys[nextFormKey]] = true


    // if last form?

  }

  onCatSelect(category) {
    this.pCategoryIsSelected = category
  }
}
