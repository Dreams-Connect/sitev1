import { Subject } from 'rxjs';
import { currentUser } from 'src/app/model/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private afs: AngularFirestore) { }

  currentUser: currentUser;
  currentUserSubject = new Subject<currentUser>();

  fetchUser() {
    const userID = localStorage.getItem('dcUserUID')
    if (userID != null || userID != undefined) {
      this.afs.collection<currentUser>('users').doc<currentUser>(userID).valueChanges().subscribe(
        user => {
          this.currentUser = new currentUser(
            user.firstname,
            user.lastname,
            user.phone,
            user.email,
            user.usertype,
            user.community,
            user.companyname,
            user.vision
          )
          this.currentUserSubject.next(this.currentUser)
        }
      )
    }
  }
}
