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
    private animationCtrl: AnimationController,
  ) { }

  ngAfterViewInit() {
    // scroll animation with intersection observer
    this.scrollObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting === true) {
        // set page is scrolling to apply border to header
        this.isScrolling = true; // fix this -> it cause some sorta intersection bug on header
        // apply reveal animation to sections
        const revealSection = this.animationCtrl.create().addElement(entries[0].target)
          .fromTo('transform', 'translate(0,5%)', 'translate(0,0)')
          .fromTo('opacity', '0', '1')
          .duration(1000)
          .delay(50)
        revealSection.play();
      }
      else {
        // page is not scrolling
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
    }

  }


  ngOnDestroy() {
    this.scrollObserver.disconnect();
  }

  ionViewWillEnter() {

  }
}
