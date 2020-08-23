import { AuthService } from './../auth/auth.service';
import { Subject, Observable } from 'rxjs';
import { currentUser } from 'src/app/model/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { TextAst } from '@angular/compiler';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private afs: AngularFirestore, private auth: AuthService,
    private afstorage: AngularFireStorage,) { }

  currentUser: currentUser;
  currentUserSubject = new Subject<currentUser>();

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadPercentageSubject = new Subject<any>();
  downloadPercentage;

  fetchUser() {
    const userID = localStorage.getItem('dcUserUID')

    this.auth.isLoggedIn().then(
      user => {
        if (user) {
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
                  user.vision,
                  user.photoURL
                )
                this.currentUserSubject.next(this.currentUser)
              }
            )
          }
        }
      }
    )
  }


  uploadPhoto(photo) {
    let photoURL;
    const userID = localStorage.getItem('dcUserUID')

    let id = this.afs.createId(); // generate id
    let file = photo.target.files[0];
    let filePath = `${photo.type}/${id}`  // seperate path for audio & video & other media types

    let fileRef = this.afstorage.ref(filePath);

    // upload files
    let task = this.afstorage.upload(filePath, file) // upload

    //observe percentage changes
    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL()
          this.downloadURL.subscribe(url => {
            if (url) {
              // set url
              photoURL = url
              // update user photoURL
              this.afs.collection('users').doc(userID).update({
                photoURL: url
              })
            }
          })
        })
      ).subscribe(task => {
        this.downloadPercentage = ((task.bytesTransferred / task.totalBytes) * 100);
        this.downloadPercentageSubject.next(this.downloadPercentage)
      })
  }
}
