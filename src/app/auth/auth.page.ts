import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  constructor(private authService: AuthService) { }
  // user details
  FNAME = ''
  LNAME = ''
  phone = ''
  email = ''
  password = ''
  cname = ''
  vision = ''

  newUser: User;

  forms = {
    'personalInformation': true,
    'loginInformation': false,
    'personaInformation': false,
    'communityInformation': false,
    'precompanyInformation': false,
  }
  pCategoryIsSelected = '';
  communitySelectedList = [];
  communityList = [
    {
      title: 'TECHNOLOGY'
    },
    {
      title: 'LAW'
    },
    {
      title: 'BUSINESS'
    },
    {
      title: 'MEDICINE'
    },
    {
      title: 'ART'
    },
    {
      title: 'ACADEMICS'
    },
    {
      title: 'ENTERTAINMENT'
    },
    {
      title: 'MEDIA'
    },
    {
      title: 'LEADERSHIP'
    }
  ]

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
    // set form values
    this.FNAME = form.value.FNAME === undefined ? this.FNAME : form.value.FNAME;
    this.LNAME = form.value.LNAME === undefined ? this.LNAME : form.value.LNAME;
    this.phone = form.value.phone === undefined ? this.phone : form.value.phone;
    this.email = form.value.email === undefined ? this.email : form.value.email;
    this.password = form.value.password === undefined ? this.password : form.value.password;
    this.cname = form.value.cname === undefined ? this.cname : form.value.cname;
    this.vision = form.value.vision === undefined ? this.vision : form.value.vision;

    let keys = Object.keys(this.forms)

    // hide all form
    Object.keys(this.forms).map(key => this.forms[fname] != key ? this.forms[key] = false : '')

    // determine user type to navigate what form is next
    if (this.pCategoryIsSelected === 'LEARN') {
      this.forms.communityInformation = true;
    }
    else if (this.pCategoryIsSelected === 'CONTENT PROVIDER') {
      this.forms.precompanyInformation = true;
    }
    else if (this.pCategoryIsSelected === 'EMPLOYER') {
      this.forms.precompanyInformation = true;
    }
    else {
      var nextFormKey = keys.indexOf(fname) + 1;
      // show next form
      this.forms[keys[nextFormKey]] = true;
    }

    // last form all user
    if (fname === 'precompanyInformation' || fname === 'communityInformation') {
      // register user
      this.registerUser()
    }
  }

  registerUser() {
    this.newUser = new User(
      this.FNAME,
      this.LNAME,
      this.phone,
      this.email,
      this.password,
      this.pCategoryIsSelected,
      this.communitySelectedList,
      this.cname,
      this.vision)

    this.authService.register_With_Email_Password(this.newUser)
  }
  // sace user category
  onCatSelect(category) {
    this.pCategoryIsSelected = category;
  }
  // add user selected community to list to check and uncheck selection
  onComSelect(selected: string) {
    if (!this.communitySelectedList.includes(selected)) {
      this.communitySelectedList.push(selected)
    } else {
      this.communitySelectedList = this.communitySelectedList.filter(el => el !== selected)
    }
  }
}
