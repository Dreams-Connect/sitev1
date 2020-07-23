import { Community } from 'src/app/model/portalModel/portalModel';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'src/app/model/user';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  constructor(private afs: AngularFirestore) { }

  fetchCommunities() {
    return this.afs.collection<Community>('community').valueChanges();
  }

  fetchJoinCommunities() {
    return this.afs.collection<User>(localStorage.getItem('dcUserUID')).valueChanges()

  }
  addCommunity(newCommunity: string) {
    this.afs.collection('users').doc(localStorage.getItem('dcUserUID')).update({
      community: firebase.firestore.FieldValue.arrayUnion(newCommunity.toUpperCase())
    })
  }
}
