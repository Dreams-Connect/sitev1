import { LoadingController } from '@ionic/angular';
import { Community } from './../../model/portalModel/portalModel';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  constructor(
    private afs: AngularFirestore,
    private route: Router,
    private spinner: LoadingController,
    public toastController: ToastController
  ) {
    // On load

    // get community

    // get events

    // get courses

    // get podcast

    // books

  }

  // update community list
  newCommunity(community: Community) {
    this.loadingSpinner();
    const id = this.afs.createId(); // generate id
    // build new community
    const newCommunity = new Community(
      id,
      community.title,
      community.description,
      community.route,
      community.bgcolor,
      community.txtcolor
    )
    this.afs.collection<Community>('community').doc(id).set(JSON.parse(JSON.stringify(newCommunity)))
      .then(async resp => {
        (await this.presentToast(community.title)).present()
        this.route.navigateByUrl('portal/dccommunity')
        this.spinner.dismiss()
      })
      .catch(async err => {
        alert(err)
        this.spinner.dismiss()
      })
  }

  // delete item 
  delete(id, type) {
    this.afs.collection(type).doc(id).delete();
  }

  fetchCommunity() {
    return this.afs.collection<Community>('community').valueChanges()
  }

  async loadingSpinner() {
    const loading = await this.spinner.create({
      message: 'One sec ...'
    })
    return loading.present()
  }

  presentToast(item) {
    return this.toastController.create({
      message: item + ' added',
      position: 'top',
      duration: 2000
    })
  }
}
