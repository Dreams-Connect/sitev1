import { User, currentUser } from './../model/user';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(
    private menuCtrl: MenuController,
    private animationCtrl: AnimationController,
    private authServices: AuthService,
  ) { }

  private scrollObserver: IntersectionObserver;
  private scrollObserverWindow: IntersectionObserver;

  isScrolling = false;
  isAuthenticated;
  currentUser: currentUser;
  userType;
  // subscriptions
  private authenticationSub: Subscription;
  private currentUserSub: Subscription;

  ngOnInit() {
    this.authenticationSub = this.authServices.authenticationSubJect.subscribe(auth => {
      this.isAuthenticated = auth;
    })
    this.authServices.getUserIsAuthenticated();
    this.currentUserSub = this.authServices.currentUserSubject.subscribe(user => {
      this.currentUser = user;
      this.userType = this.currentUser.usertype
    })
    this.authServices.fetchCurrentUser();
    // this.authServices.getCurrentUser();
  }

  ngAfterViewInit() {
    this.scrollObserverWindow = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting === true) {
      }
      else {
        this.isScrolling = false;
      }
    }, {
      threshold: .009
    });


    // scroll animation with intersection observer
    this.scrollObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting === true) {
        // set page is scrolling to apply border to header
        this.isScrolling = true;
        // apply reveal animation to sections
        const revealSection = this.animationCtrl.create().addElement(entries[0].target)
          .fromTo('transform', 'translate(0,5%)', 'translate(0,0)')
          .fromTo('opacity', '0', '1')
          .duration(1000)
          .delay(50)
        revealSection.play();
      }
      else {
        this.isScrolling = false;
        // apply reveal animation to sections
        const revealSection = this.animationCtrl.create().addElement(entries[0].target)
          .fromTo('transform', 'translate(0,0)', 'translate(0,5%)')
          .fromTo('opacity', '1', '0')
          .duration(1200)
          .delay(500)
        revealSection.play();
      }
    }, {
      threshold: 0.1
    });
    //get all sections
    const sections = document.querySelectorAll('section');
    // loop over all section and ignore the first section
    for (let i = 1; i < sections.length; i++) {
      this.scrollObserver.observe(sections[i])
      this.scrollObserverWindow.observe(sections[i])
    }
  }





  closeMenu() {
    this.menuCtrl.close()
  }


  ionViewWillEnter() {


  }


  logout() {
    this.authServices.logout();
  }


  ngOnDestroy() {
    this.scrollObserver.disconnect();
    this.scrollObserverWindow.disconnect();
    this.authenticationSub.unsubscribe();
  }

}
