import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Injectable, OnDestroy } from '@angular/core';
import { Post } from 'src/app/model/post';
import { Observable, Subject } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(
    private afs: AngularFirestore,
    private afstorage: AngularFireStorage,
    private toastController: ToastController,
    private router: Router,
  ) { }

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  downloadPercentageSubject = new Subject<any>();
  downloadPercentage;

  createPost(form, community, mediaList) {


    let mediaFiles: any[] = [];

    // loop through mediaList
    if (mediaList.length > 0) {
      for (let i = 0; i < mediaList.length; i++) {
        let id = this.afs.createId(); // generate id
        let file = mediaList[i].file;
        let filePath = `${mediaList[i].type}/${id}`  // seperate path for audio & video

        // console.log(filePath)
        // console.log(file)

        let fileRef = this.afstorage.ref(filePath);

        // upload files
        let task = this.afstorage.upload(filePath, file) // upload

        //observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL()
            this.downloadURL.subscribe(url => {
              // get download url
              // retrieve file id
              if (url) {
                // add media download url to post mediaList
                mediaFiles.push({
                  'url': url,
                  'type': mediaList[i].type
                })
                console.log(mediaFiles)
                if (mediaFiles.length === mediaList.length) {
                  let userUID = localStorage.getItem('dcUserUID');
                  let id = this.afs.createId(); // generate id
                  const newPost = {
                    id: id,
                    userUID: userUID,
                    post: form.post,
                    community: community,
                    mediaList: mediaFiles,
                    createdAt: Date.now()
                  }

                  // add post to collection
                  this.afs.collection<Post>('post').doc(community).update({
                    posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
                  })
                    .then(resp => {
                      this.router.navigateByUrl('dc/community/feed/' + community);
                      this.postToast()
                    })
                    .catch(err => {
                      this.afs.collection<Post>('post').doc(community).set({
                        posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
                      }).then(resp => {
                        this.router.navigateByUrl('dc/community/feed/' + community);
                        this.postToast()
                      })
                    })
                }
              }
            })
          })
        ).subscribe(task => {
          this.downloadPercentage = ((task.bytesTransferred / task.totalBytes) * 100);
          this.downloadPercentageSubject.next(this.downloadPercentage)
        })
      }


    }

    // if mediaList upload complete?
    // build post
    if (mediaFiles.length === mediaList.length) {
      let userUID = localStorage.getItem('dcUserUID');
      let id = this.afs.createId(); // generate id
      const newPost = {
        id: id,
        userUID: userUID,
        post: form.post,
        community: community,
        mediaList: mediaFiles,
        createdAt: Date.now()
      }

      // add post to collection
      this.afs.collection<Post>('post').doc(community).update({
        posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
      })
        .then(resp => {
          this.router.navigateByUrl('dc/community/feed/' + community);
          this.postToast()
        })
        .catch(err => {
          this.afs.collection<Post>('post').doc(community).set({
            posts: firebase.firestore.FieldValue.arrayUnion(newPost) // merge in context community
          }).then(resp => {
            this.router.navigateByUrl('dc/community/feed/' + community);
            this.postToast()
          })
        })
    }
  }

  async postToast() {
    const toast = await this.toastController.create({
      duration: 3000,
      message: 'Post added to timeline',
      position: 'top',
    });
    toast.present();
  }





} 
