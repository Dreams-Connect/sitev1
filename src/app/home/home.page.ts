import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private scrollObserver: IntersectionObserver;
  isScrolling = false;
  constructor(
    animationCtrl: AnimationController,
  ) { }

  ngAfterViewInit() {
    //scroll animation with intersection observer
    this.scrollObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting === true) {
        // page is scrolling
        this.isScrolling = true;
        // apply border bottom to header

        // apply reveal animation to sections
      }
      else {
        // page is not scrolling
        this.isScrolling = false;
      }
    }, {
      threshold: .3
    });
    //get all sections
    const sections = document.querySelectorAll('section');
    // loop over all section and ignore the first section
    for (let i = 1; i < sections.length; i++) {
      this.scrollObserver.observe(sections[i])
    }
  }


}
